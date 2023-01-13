import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {  
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "lib/firebase";

export function useAddPost() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);
  }

  return { addPost, isLoading };
}







