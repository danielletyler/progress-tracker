import React, { useState, useEffect } from "react"
import { Box, Flex, Text, WrapItem } from "@chakra-ui/react"
import { Task } from "~models"
import { getAllTasks } from "../../controllers/project"

const DeadlineProgress: React.FC<{
    userId: string
    project: string
    deadline: string
    // level: string
}> = ({ userId, project, deadline }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [completed, setCompleted] = useState(0)

    useEffect(() => {
        getAllTasks(userId as string, project, deadline).then(res => {
            if (!res.data) return
            return setTasks(res.data)
        })
    }, [deadline])

    useEffect(() => {
        const array = []
        tasks.forEach(item => {
            if (item.isCompleted == true) array.push(item.title)
        })
        return setCompleted(array.length)
    }, [tasks])

    return (
        <Box>
            <Flex>
                <Text>{completed}</Text>
                <Text>/</Text>
                <Text>{tasks.length}</Text>
            </Flex>
        </Box>
    )
}

export default DeadlineProgress
