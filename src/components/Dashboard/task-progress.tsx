import React, { useState, useEffect } from "react"
import { Box, Checkbox } from "@chakra-ui/react"
import { Task } from "~models"
import { getTask, updateTask } from "../../controllers/project"

const TaskProgress: React.FC<{
    userId: string
    project: string
    deadline: string
    task: string
}> = ({ userId, project, deadline, task }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [taskData, setTaskData] = useState<Task>()

    useEffect(() => {
        getTask(userId, project, deadline, task).then(res => {
            if (!res.data) return
            return setTaskData(res.data), setIsLoading(false)
        })
    }, [task])

    if (isLoading) return <Box></Box>
    else
        return (
            <Box>
                <Checkbox
                    mt={1}
                    colorScheme="green"
                    defaultIsChecked={taskData!.isCompleted}
                    onChange={e => {
                        updateTask(userId, project, deadline, taskData!.title, {
                            isCompleted: !taskData!.isCompleted,
                        })
                    }}
                ></Checkbox>
            </Box>
        )
}

export default TaskProgress
