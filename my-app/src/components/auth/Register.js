import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import {  DASHBOARD, LOGIN} from "lib/router";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "components/hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate, usernameValidate} from "components/utils/form-validate";

export default function Register() {
  const { register : signup, isLoading } = useRegister();
  const {register, handleSubmit,formState: { errors }} = useForm();
  
  async function handleRegister(data) {
      
      signup({ 
           username: data.username,
           email: data.email,
           password: data.password, 
           redirectTo: DASHBOARD,
          });

          
  }

  
  return (
      <Center w="100%" h="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
          <Heading mb="4" size="lg" textAlign="center">
            Register
          </Heading>
  
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={errors.username} py="2">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="username"
                {...register('username', usernameValidate)}
              />
              <FormErrorMessage>
                {errors.username}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} py="2">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="ID@email.com"
                {...register('email', emailValidate)}
              />
              <FormErrorMessage>
                {errors.email}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} py="2">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password123"
                {...register('password', passwordValidate)}
              />
              <FormErrorMessage>
               {errors.password}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt="4"
              type="submit"
              colorScheme="teal"
              size="md"
              w="full"
              //isLoading={true}
              loadingText="Signing up"
            >
              Register
            </Button>
          </form>
  
          <Text fontSize="xlg" align="center" mt="6">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to={LOGIN}
              color="teal.800"
              fontWeight="medium"
              textDecor="underline"
              _hover={{ background: "teal.100" }}
            >
              Log In
            </Link>{" "}
            instead!
          </Text>
        </Box>
      </Center>
    );
  }