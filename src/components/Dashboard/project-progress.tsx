import React, { useState, useEffect } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { Deadline } from "~models"
import { getAllDeadlines } from "../../controllers/project"

const ProjectProgress: React.FC<{
    userId: string
    project: string
}> = ({ userId, project }) => {
    const [deadlines, setDeadlines] = useState<Deadline[]>([])
    const [completed, setCompleted] = useState(0)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        getAllDeadlines(userId as string, project).then(res => {
            if (!res.data) return
            return setDeadlines(res.data)
        })
    }, [project])

    useEffect(() => {
        const array = []
        deadlines.forEach(item => {
            if (item.isCompleted == true) array.push(item.title)
        })
        return setCompleted(array.length), setisLoading(false)
    }, [deadlines])

    const sectionSize = 100 / deadlines.length
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
                        <Text color="#FFFFFF">{deadlines.length}</Text>
                    </Flex>
                </Flex>
            </Box>
        )
}

export default ProjectProgress
