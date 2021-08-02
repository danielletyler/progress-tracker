import React from "react"

import { Box } from "@chakra-ui/react"
import ResponsiveBlock from "~components/shared/responsive-block"
import SignupForm from "../components/Auth/signup-form"

export default function SignupScreen() {
    return (
        <Box
            bgGradient="linear(to-b, #5E72EB, #5E72EB, #FF9190, #FDC094)"
            h="100vh"
        >
            <ResponsiveBlock>
                <SignupForm />
            </ResponsiveBlock>
        </Box>
    )
}
