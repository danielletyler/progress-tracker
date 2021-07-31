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
        // Keyboard.dismiss()
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
        <Box
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 20,
            }}
        >
            <Box>
                <Text
                    category="h3"
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                        color: "black",
                        fontWeight: "bold",
                    }}
                >
                    LS-imPACt
                </Text>
                <Input
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    status={
                        email.length === 0 || validateEmail(email)
                            ? "basic"
                            : "danger"
                    }
                    autoCapitalize="none"
                />
                <Text>{response}</Text>
                <Input
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoCapitalize="none"
                    accessoryRight={showPasswordButton}
                    secureTextEntry={!showPassword}
                    status={
                        password.length > 0 && password.length < 6
                            ? "danger"
                            : "basic"
                    }
                />
                <Text>{response}</Text>
                <Button onClick={loginPress} disabled={loading}>
                    {loading ? <Text>Loading</Text> : <Text>Log In</Text>}
                </Button>

                <Box>
                    <Text>Don't have an account?</Text>
                    <Box
                        as="button"
                        marginLeft={6}
                        color="black"
                        onClick={signupPress}
                    >
                        Sign up.
                    </Box>
                </Box>
                <Box>
                    <Text
                        color="black"
                        onPress={() => navigate("ForgotPassword")}
                    >
                        Forgot password?
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
