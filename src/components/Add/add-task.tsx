import React, { useContext, useState } from "react"
import { Box, Input, Button, useToast, Flex } from "@chakra-ui/react"
import { UserContext } from "~config/user-context"
import { addTask } from "../../controllers/project"

const AddTask: React.FC<{
    project: string
    deadline: string
}> = ({ project, deadline }) => {
    const { userId } = useContext(UserContext)
    const toast = useToast()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")

    async function handleAddButton() {
        if (!userId) return
        const result = await addTask(
            userId as string,
            project,
            deadline,
            title,
            desc,
            date
        )
        if (result.status === "success") {
            toast({
                title: "Success.",
                description: "Project added successfully.",
                status: "success",
            })
            setTitle("")
            setDesc("")
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
        <Box>
            <Flex direction="column" gridRowGap={10}>
                <Box>
                    <Input
                        placeholder="Task Title"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </Box>
                <Box>
                    <Input
                        placeholder="Description"
                        type="text"
                        onChange={e => setDesc(e.target.value)}
                        value={desc}
                    />
                </Box>
                <Box>
                    <Input
                        placeholder="Task Due Date"
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

export default AddTask
