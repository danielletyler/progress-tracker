import React, { useContext } from "react"
import { Box } from "@chakra-ui/react"
import { UserContext } from "~config/user-context"
import Auth from "~pages/auth"
import Dash from "../components/Dashboard/dash"

const IndexPage = () => {
    const { userId } = useContext(UserContext)

    if (!userId) return <Auth />
    return (
        <Box bg="#1F2933" h="100vh">
            <Dash />
        </Box>
    )
}

export default IndexPage
