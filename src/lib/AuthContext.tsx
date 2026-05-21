import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface UserProfile {
  userName?: string;
  gender?: 'ikhwan' | 'akhwat' | null;
  maxUnlockedLevel: number;
  points: number;
  levelScores: Record<number, number>;
  levelWrongLetters: Record<number, number[]>;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    setLoading(true);
    const docRef = doc(db, 'users', user.uid);
    const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          userName: data.userName,
          gender: data.gender,
          maxUnlockedLevel: data.maxUnlockedLevel || 1,
          points: data.points || 0,
          levelScores: data.levelScores || {},
          levelWrongLetters: data.levelWrongLetters || {},
        });
      } else {
        // Init profile with defaults if document doesn't exist
        setProfile({
          maxUnlockedLevel: 1,
          points: 0,
          levelScores: {},
          levelWrongLetters: {},
        });
      }
      setLoading(false);
    }, (error) => {
      setLoading(false);
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
        console.error(e);
      }
      throw e;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          maxUnlockedLevel: 1,
          points: 0,
          ...data
        });
      } else {
        await setDoc(docRef, {
          userId: currentUser.uid,
          updatedAt: serverTimestamp(),
          ...data
        }, { merge: true });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, logOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
