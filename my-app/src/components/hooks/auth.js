import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "lib/firebase";
import { DASHBOARD, LOGIN } from 'lib/router';
import { useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, } from "firebase/firestore";
import Dashboard from "components/dashboard";
import isUsernameExists from "components/utils/isUsernameExists";

export function useAuth() {
    const {authUser, isLoading, error} = useAuthState(auth);
    return { user: authUser, isLoading, error};
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function login({ email, password, redirectTo = DASHBOARD }) {
      setLoading(true);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Logging in failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      
        return false
      } finally {
        setLoading(false);
        return true;
      }
    }
  
    return { login, isLoading };
  }
  export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = DASHBOARD,
    }) {
      setLoading(true);
  
      const usernameExists = await isUsernameExists(username);
  
      if (usernameExists) {
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            avatar: "",
            date: Date.now(),
          });
  
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
  
          navigate(redirectTo);
        } catch (error) {
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
      }
    }
  
    return { register, isLoading };
  }
  //     try {
  //       // Create a new user with the given email and password
  //       const { user } = await auth.createUserWithEmailAndPassword(email, password);
  
  //       // Update the user's display name
  //       await user.updateProfile({ displayName: username });
  
  //       toast({
  //         title: "You are registered and logged in",
  //         status: "success",
  //         isClosable: true,
  //         position: "top",
  //         duration: 5000,
  //       });
  //       navigate(redirectTo);
  //     } catch (error) {
  //       toast({
  //         title: "Registration failed",
  //         description: error.message,
  //         status: "error",
  //         isClosable: true,
  //         position: "top",
  //         duration: 5000,
  //       });
  
  //       return false;
  //     } finally {
  //       setLoading(false);
  //       return true;
  //     }
  //   }
  //   return { register, isLoading };
  // }
  export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();

    async function logout() {
        if(await signOut()) {
            toast({
                title: "Successfully logged out",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            navigate(LOGIN);
        }
        }
    return {logout, isLoading};
  }
