import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "../infra/supabase";

interface AuthContext {
  user: User | null;
  token: string | null;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const authContext = createContext<AuthContext>({
  user: null,
  token: null,
  signOut: async () => {},
  signInWithGithub: async () => {},
  signInWithGoogle: async () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthContext["user"]>(null);
  const [token, setToken] = useState<AuthContext["token"]>(null);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("Can not sign out");
    }
  };
  const signInWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    } catch (error) {
      throw new Error('Error login')
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      throw new Error('Error login')
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setToken(session?.access_token || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider
      value={{ user, token, signOut, signInWithGithub, signInWithGoogle }}
    >
      {children && children}
    </authContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
