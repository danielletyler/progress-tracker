import React, { useState } from "react"
import {
    Box,
    Text,
    FormControl,
    Input,
    useToast,
    Icon,
    IconProps,
    Flex,
} from "@chakra-ui/react"
import { signup } from "../../controllers/auth"
import { navigate } from "gatsby"
const SignupForm = () => {
    const toast = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirm] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState({
        type: "",
        response: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function signupPress() {
        function validateEmail(email: string) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(String(email).toLowerCase())
        }

        // Keyboard.dismiss()

        try {
            if (!validateEmail(email))
                setError({
                    type: "email",
                    response: "Please enter a valid email address.",
                })
            else if (password.length < 6)
                setError({
                    type: "password",
                    response: "Password must be at least 6 characters long.",
                })
            else if (password != confirmPass)
                setError({
                    type: "confirmpassword",
                    response: "Passwords must match.",
                })
            else {
                setIsLoading(true)
                const result = await signup(email, password, {
                    id: "",
                    first_name: firstName,
                    last_name: lastName,
                })
                if (result.status === "success") {
                    toast({
                        title: "Success.",
                        description: "Sign up succesful.",
                        status: "success",
                    })
                    setIsLoading(false)
                    navigate("/")
                } else {
                    toast({
                        title: "Error",
                        description: "Sign up unsuccesful.",
                        status: "error",
                    })
                    setIsLoading(false)
                    setError({
                        type: "email",
                        response: result.message,
                    })
                }
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const showPasswordButton = (props: IconProps) => (
        <Box as="button">
            onPress={() => setShowPassword(!showPassword)}
            <Icon {...props} name={showPassword ? "eye" : "eye-off"} />
        </Box>
    )

    return isLoading ? (
        <Box size="giant">Loading</Box>
    ) : (
        <Box p={20} align="center">
            <Box
                border="1px solid white"
                borderRadius="xl"
                p={10}
                w="70%"
                textColor="white"
            >
                <Text align="center" color="white" fontSize="30px">
                    Sign Up
                </Text>
                <Flex direction="column" gridRowGap={5}>
                    <Text></Text>
                    <FormControl>
                        <Input
                            placeholder="First Name*"
                            type="text"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            status={
                                error.type === "firstname" ? "danger" : "basic"
                            }
                        />
                    </FormControl>
                    <Text></Text>
                    <FormControl>
                        <Input
                            placeholder="Last Name*"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            status={
                                error.type === "lastname" ? "danger" : "basic"
                            }
                        />
                    </FormControl>

                    <Text>
                        {error.type === "firstname" || error.type === "lastname"
                            ? error.response
                            : ""}
                    </Text>
                    <FormControl>
                        <Input
                            placeholder="Email Address*"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoCapitalize="none"
                            status={error.type === "email" ? "danger" : "basic"}
                        />
                    </FormControl>
                    <Text>{error.type === "email" ? error.response : ""}</Text>
                    <FormControl>
                        <Input
                            placeholder="Password*"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoCapitalize="none"
                            status={
                                error.type === "password" ||
                                error.type === "confirmpassword"
                                    ? "danger"
                                    : "basic"
                            }
                            accessoryRight={showPasswordButton}
                            secureTextEntry={!showPassword}
                        />
                    </FormControl>
                    <Text>
                        {error.type === "password" ? error.response : ""}
                    </Text>
                    <FormControl>
                        <Input
                            placeholder="Confirm Password*"
                            value={confirmPass}
                            onChange={e => setConfirm(e.target.value)}
                            autoCapitalize="none"
                            status={
                                error.type === "confirmpassword"
                                    ? "danger"
                                    : "basic"
                            }
                            secureTextEntry={!showPassword}
                        />
                    </FormControl>
                </Flex>
                <Text>
                    {error.type === "confirmpassword" ? error.response : ""}
                </Text>
                <Box
                    border="1px solid white"
                    borderRadius="xl"
                    my={10}
                    p={2}
                    as="button"
                    onClick={signupPress}
                >
                    Sign Up
                </Box>
            </Box>
        </Box>
    )
}

export default SignupForm
