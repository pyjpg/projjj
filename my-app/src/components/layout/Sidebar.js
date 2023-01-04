import { Avatar, Box, Button, Code, Stack } from "@chakra-ui/react";
import { useAuth } from "components/hooks/auth";
import { PROTECTED, USERS } from "lib/router";
import { Link } from "react-router-dom";

function ActiveUser() {
    const {user, isLoading} = useAuth();
    
    if (isLoading) return "Loading...";
    
    return (

        <Link to={`${PROTECTED}/profile/${user.id}`}>
          <Stack align="center" spacing="5" my="8">
            <Avatar name={user.username} size="xl" _hover={{ cursor: "pointer", opacity: "0.8" }} />
            <Code>@{user.username}</Code>
            <Button colorScheme="teal" w="full" as={Link}>
              Edit Profile
            </Button>
          </Stack>
        </Link>
      );
      }

export default function Sidebar() {
    return (
    <Box
        px="6"
        height="100vh"
        w="100%"
        maxW="300px"
        borderLeft="1px solid"
        borderLeftColor="teal.100"
        position="sticky"
        top="16"
        display={{ base: "none", md: "block" }}
       
        
    >
        { /*Active user */}
        <ActiveUser />
        <Box align="center">
            <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
            <Button
                variant="outline"
                colorScheme="teal"
                as={Link}
                to={USERS}
                mt="4"
                size="sm"
            >
                ALL USERS
            </Button>
        </Box>
    </Box>
    );
}