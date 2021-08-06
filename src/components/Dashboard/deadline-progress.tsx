import React, { useState, useEffect } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { Task } from "~models"
import { getAllTasks, updateDeadline } from "../../controllers/project"

const DeadlineProgress: React.FC<{
    userId: string
    project: string
    deadline: string
}> = ({ userId, project, deadline }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [completed, setCompleted] = useState(0)
    const [isLoading, setisLoading] = useState(true)
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

    useEffect(() => {
        const array = []
        tasks.forEach(item => {
            if (item.isCompleted == true)
                array.push(item.title), setisLoading(false)
        })
        if (array.length == tasks.length)
            updateDeadline(userId, project, deadline, { isCompleted: true }),
                setisLoading(false)
        if (array.length != tasks.length)
            updateDeadline(userId, project, deadline, { isCompleted: false }),
                setisLoading(false)
        if (tasks.length == 0)
            updateDeadline(userId, project, deadline, { isCompleted: true }),
                setisLoading(false)
    }, [tasks])

    const sectionSize = 100 / tasks.length
    const widthSize = sectionSize * completed
    const widthString = widthSize.toString()
    const finalString = widthString + "%"

    if (isLoading) return <Box></Box>
    else
        return (
            <Box py={5}>
                <Flex gridColumnGap={2}>
                    <Box
                        bg="#616E7C"
                        w="100%"
                        h="20px"
                        p="1px"
                        align="left"
                        borderRadius="xl"
                    >
                        <Box
                            bgGradient="linear(to-l, #5E72EB, #5E72EB, #FF9190, #FDC094)"
                            w={finalString}
                            h="100%"
                            borderRadius="xl"
                        />
                    </Box>
                    <Flex>
                        <Text color="#FFFFFF">{completed}</Text>
                        <Text color="#FFFFFF">/</Text>
                        <Text color="#FFFFFF">{tasks.length}</Text>
                    </Flex>
                </Flex>
            </Box>
        )
}

export default DeadlineProgress
