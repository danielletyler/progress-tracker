import React, { useContext, useState } from "react"
import { Box, Input, Button, useToast, Flex } from "@chakra-ui/react"
import { UserContext } from "~config/user-context"
import { addProject } from "../../controllers/project"

const AddProject = () => {
    const { userId } = useContext(UserContext)
    const toast = useToast()
    const [title, setTitle] = useState("")
    const [overview, setOverview] = useState("")
    const [date, setDate] = useState("")

    async function handleAddButton() {
        if (!userId) return
        const result = await addProject(userId as string, title, date, overview)
        if (result.status === "success") {
            toast({
                title: "Success.",
                description: "Project added successfully.",
                status: "success",
            })
            setTitle("")
            setOverview("")
            setDate("")
        } else {
            toast({
                title: "Error",
                description: result.message,
                status: "error",
            })
        }
    }

    return (
        <Box my={10}>
            <Flex direction="column" gridRowGap={10}>
                <Box>
                    <Input
                        placeholder="Project Title"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </Box>
                <Box>
                    <Input
                        placeholder="Overview"
                        type="text"
                        onChange={e => setOverview(e.target.value)}
                        value={overview}
                    />
                </Box>
                <Box>
                    <Input
                        placeholder="Project Due Date"
                        type="text"
                        onChange={e => setDate(e.target.value)}
                        value={date}
                    />
                </Box>
            </Flex>
            <Box align="center">
                <Button mt={10} onClick={handleAddButton}>
                    Add
                </Button>
            </Box>
        </Box>
    )
}

export default AddProject
