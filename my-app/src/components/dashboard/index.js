import { Box, HStack, Heading, Button,Textarea } from "@chakra-ui/react"
import { useAddPost } from "components/hooks/posts";
import { useForm } from "react-hook-form";
import reactTextareaAutosize from "react-textarea-autosize"
import { useAuth } from "components/hooks/auth";
import PostList from "components/posts/PostLists";

function NewPost() {
  const {register, handleSubmit, reset} = useForm();
  const {addPost, isLoading: addingPost} = useAddPost();
  const {user, isLoading: authLoading} = useAuth()

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text
    })
    console.log(data);
    reset();
  }

  return (
  <Box maxW="600px" mx="auto" py="10">
  <form onSubmit={handleSubmit(handleAddPost)}>
    <HStack justify="space-between">
      <Heading size="lg">New Post</Heading>
      <Button colorScheme="teal" type="submit"  isLoading={authLoading || addingPost } loadingText="Loading">Post</Button>
      
    </HStack>
    <Textarea 
      as={reactTextareaAutosize} 
      resize='none'
      mt="5" 
      placeholder="Create a new post..." 
      minRows={3}
      {...register("text", {required:true})}
      />
  </form>
</Box>
  )
}

export default function Dashboard() {


  return (
    <>
      <NewPost />
      <PostList  posts={[1,2,3,4]}/>
    </>
  )
}
