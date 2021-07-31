import React, { useContext, useState } from "react"
import { Box, Input, Button, useToast } from "@chakra-ui/react"
import { UserContext } from "~config/user-context"
import { addTask } from "../../controllers/project"
import AddDeadline from "./add-deadline"

const AddTask: React.FC<{
    project: string
    deadline: string
}> = ({ project, deadline }) => {
    const { userId } = useContext(UserContext)
    const toast = useToast()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [level, setLevel] = useState("3")

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
            setLevel("2")
        } else {
            toast({
                title: "Error",
                description: result.message,
                status: "error",
            })
        }
    }

    if (level == "3")
        return (
            <Box>
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
                <Button onClick={handleAddButton}>Add</Button>
            </Box>
        )
    else if (level == "2")
        return (
            <Box>
                <AddDeadline project={project} />
            </Box>
        )
    else return <Box>Error with add-task component</Box>
}

export default AddTask
