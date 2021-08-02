import React, { useState } from "react"
import { navigate } from "gatsby"
import {
    Button,
    Text,
    Input,
    Box,
    Icon,
    IconProps,
    useToast,
    Flex,
} from "@chakra-ui/react"

import { login } from "../../controllers/auth"
import { validateEmail } from "../shared/utils"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const response = ""

    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    async function signupPress() {
        navigate("/signup")
    }

    const toast = useToast()

    async function loginPress() {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
            toast({
                status: "error",
                title: "Timeout",
                description:
                    "This seems to be taking too long.  Check your internet connection and try again.",
            })
        }, 7500)
        const result = await login(email, password)
        if (result.status === "success") {
            toast({ status: "success", title: "Success" })
        } else {
            toast({
                status: "error",
                title: "Error",
                description: result.message,
            })
        }
        clearTimeout(timeout)
        setLoading(false)
    }

    const showPasswordButton = (props: IconProps) => (
        <Box as="button">
            onPress={() => setShowPassword(!showPassword)}
            <Icon {...props} name={showPassword ? "eye" : "eye-off"} />
        </Box>
    )

    return (
        <Box align="center" p={20}>
            <Box
                borderRadius="xl"
                border="1px solid white"
                p={10}
                w="max-content"
            >
                <Text fontSize="25px" color="white">
                    Welcome Back! Let's get you
                </Text>
                <Text fontSize="30px" color="white" fontWeight={700}>
                    ON TRACK
                </Text>
                <Flex direction="column" gridRowGap={10} mt={10}>
                    <Box>
                        <Input
                            placeholder="Email Address"
                            value={email}
                            color="white"
                            onChange={e => setEmail(e.target.value)}
                            status={
                                email.length === 0 || validateEmail(email)
                                    ? "basic"
                                    : "danger"
                            }
                            autoCapitalize="none"
                        />
                        <Text>{response}</Text>
                    </Box>
                    <Box>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoCapitalize="none"
                            accessoryRight={showPasswordButton}
                            secureTextEntry={!showPassword}
                            color="white"
                            status={
                                password.length > 0 && password.length < 6
                                    ? "danger"
                                    : "basic"
                            }
                        />
                        <Text>{response}</Text>
                    </Box>
                    <Box
                        as="button"
                        border="1px solid white"
                        p={2}
                        borderRadius="xl"
                        width="max-content"
                        onClick={loginPress}
                        disabled={loading}
                    >
                        {loading ? (
                            <Text>Loading</Text>
                        ) : (
                            <Text color="white">Log In</Text>
                        )}
                    </Box>
                </Flex>
                <Box mt={10}>
                    <Text color="white">Don't have an account?</Text>
                    <Box
                        as="button"
                        marginLeft={6}
                        color="white"
                        onClick={signupPress}
                        _hover={{ borderBottom: "1px solid white" }}
                    >
                        Sign up
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
