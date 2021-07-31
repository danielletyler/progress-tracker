import React, { useContext } from "react"
import { Box } from "@chakra-ui/react"
import { UserContext } from "~config/user-context"
import Auth from "~pages/auth"
import Dash from "../components/Dashboard/dash"

const IndexPage = () => {
    const { userId } = useContext(UserContext)

    if (!userId) return <Auth />
    // return <ResponsiveBlock>Hello!</ResponsiveBlock>
    return (
        <Box>
            <Dash />
        </Box>
    )
}

export default IndexPage
