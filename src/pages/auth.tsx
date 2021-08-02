import React from "react"

import { Box } from "@chakra-ui/react"
import ResponsiveBlock from "~components/shared/responsive-block"
import LoginForm from "../components/Auth/login-form"

export default function LoginScreen() {
    return (
        <Box
            bgGradient="linear(to-b, #5E72EB, #5E72EB, #FF9190, #FDC094)"
            h="100vh"
        >
            <ResponsiveBlock>
                <LoginForm />
            </ResponsiveBlock>
        </Box>
    )
}
