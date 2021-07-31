import React, { useState, useEffect } from "react"
import { Text, Input, Button, Box } from "@chakra-ui/react"

import { sendRecoveryEmail } from "../../controllers/auth"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [email])

    async function recover() {
        const result = await sendRecoveryEmail(email)

        if (result.status === "success") {
            // TODO: Replace with toast
            console.log("Recovery email sent.")
        } else {
            console.log(`Error: ${result.message}`)
        }
    }

    return (
        <Box>
            <Box>
                <Text>Password Reset</Text>
                <Text>
                    Enter a recovery email below and reset instructions will be
                    sent to you.
                </Text>
                <Input
                    placeholder="Email Address"
                    value={email}
                    onChangeText={(email: string) => setEmail(email)}
                    autoCapitalize="none"
                    status={error ? "danger" : "basic"}
                />
                <Box>
                    <Text
                        style={
                            error
                                ? { color: "red", display: "flex" }
                                : { display: "none" }
                        }
                    >
                        Please enter a valid email.
                    </Text>
                </Box>
            </Box>
            <Box>
                <Button disabled={!email} onPress={() => recover()}>
                    Send Recovery Email
                </Button>
            </Box>
        </Box>
    )
}
