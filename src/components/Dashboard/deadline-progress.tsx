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

    const sectionSize = 100 / tasks.length
    const widthSize = sectionSize * completed
    const widthString = widthSize.toString()
    const finalString = widthString + "%"

    return (
        <Box py={10}>
            <Flex gridColumnGap={2}>
                <Box
                    bg="grey"
                    w="100%"
                    h="20px"
                    px={1}
                    pb={1}
                    pt={1}
                    align="left"
                    borderRadius="xl"
                >
                    <Box bg="blue" w={finalString} h="100%" borderRadius="xl" />
                </Box>
                <Flex>
                    <Text>{completed}</Text>
                    <Text>/</Text>
                    <Text>{tasks.length}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default DeadlineProgress
