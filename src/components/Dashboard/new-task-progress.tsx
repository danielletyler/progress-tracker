import React, { useState, useEffect } from "react"
import {
    Box,
    Button,
    Modal,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    Text,
    Flex,
    Icon,
    useDisclosure,
} from "@chakra-ui/react"
import { Task } from "~models"
import {
    deleteDeadline,
    updateTask,
    getAllTasks,
    deleteTask,
} from "../../controllers/project"
import TaskProgress from "./task-progress"
import { FaMinusCircle } from "react-icons/fa"
import AddTask from "../Add/add-task"

const NewTaskProgress: React.FC<{
    userId: string
    project: string
    deadline: string
}> = ({ userId, project, deadline }) => {
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [taskData, setTaskData] = useState<Task[]>()
    const [state, setState] = useState({
        level: "1",
        update: false,
    })
    const onClose = useDisclosure

    useEffect(() => {
        getAllTasks(userId as string, project, deadline).then(res => {
            if (!res.data) return
            return setTaskData(res.data), setIsLoading(false)
        })
    }, [state])

    if (isLoading) return <Box></Box>
    else
        return (
            <Box>
                {taskData?.map(item => (
                    <Box
                        align="left"
                        h="max-content"
                        borderRadius="xl"
                        mb={5}
                        // ml={-10}
                        alignItems="baseline"
                    >
                        <Flex gridColumnGap={5} alignItems="center">
                            <Icon
                                fontSize="20px"
                                as={FaMinusCircle}
                                color={"#2c3b4a"}
                                onClick={() => {
                                    deleteTask(
                                        userId,
                                        project,
                                        deadline,
                                        item.title
                                    ),
                                        setState({
                                            ...state,
                                            update: !state.update,
                                        })
                                }}
                                _hover={{ color: "red" }}
                                transition="0.5s"
                            ></Icon>

                            <TaskProgress
                                userId={userId}
                                project={project}
                                deadline={deadline}
                                task={item.title}
                            />
                            <Text color="white" fontWeight={700}>
                                {item.title}
                            </Text>
                        </Flex>
                    </Box>
                ))}
                <Box align="left">
                    <Box
                        as="button"
                        fontSize="30px"
                        bg="transparent"
                        color="white"
                        borderRadius="full"
                        onClick={() => setModal(true)}
                    >
                        +
                    </Box>
                </Box>
                <Modal isOpen={modal} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p={5}>
                        <Button
                            w="max-content"
                            onClick={() => {
                                setModal(false)
                                setState({
                                    ...state,
                                    update: !state.update,
                                })
                            }}
                        >
                            X
                        </Button>
                        <ModalHeader alignSelf="center" fontSize="20px">
                            New Task
                        </ModalHeader>
                        <AddTask project={project} deadline={deadline} />
                    </ModalContent>
                </Modal>
            </Box>
        )
}

export default NewTaskProgress
