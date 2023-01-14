import { Avatar as ChakraAvatar } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { PROTECTED} from "lib/router";

export default function Avatar({ user }) {
    if (!user) return "Loading..."
    return (
        <ChakraAvatar
        as={Link}
        to={`${PROTECTED}/profile/${user?.id}`}
        name={user?.username}
        size="xl"
        src={user?.avatar}
        _hover={{ cursor: "pointer", opacity: "0.8" }}
        />
    )
}