import React, { useContext, useState, useEffect } from "react"
import {
    Box,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Flex,
    Checkbox,
} from "@chakra-ui/react"
import {
    getAllTasks,
    getAllDeadlines,
    getAllProjects,
    deleteProject,
    deleteDeadline,
    deleteTask,
    updateTask,
} from "../../controllers/project"
import { UserContext } from "~config/user-context"
import { Deadline, Project, Task } from "~models"
import AddProject from "../Projects/add-project"
import AddDeadline from "../Projects/add-deadline"
import AddTask from "../Projects/add-task"
import DeadlineProgress from "./deadline-progress"

const Dash = () => {
    const { userId } = useContext(UserContext)
    const [projData, setProjData] = useState<Project[]>([])
    const [deadlineData, setDeadlineData] = useState<Deadline[]>([])
    const [taskData, setTaskData] = useState<Task[]>([])
    const [state, setState] = useState({
        level: "1",
        update: false,
    })
    const [project, setProject] = useState("")
    const [deadline, setDeadline] = useState("")
    const [modal, setModal] = useState(false)

    const { onClose } = useDisclosure()

    useEffect(() => {
        getAllProjects(userId as string).then(res => {
            if (!res.data) return
            return setProjData(res.data)
        })
    }, [state])

    useEffect(() => {
        getAllDeadlines(userId as string, project).then(res => {
            if (!res.data) return
            return setDeadlineData(res.data)
        })
    }, [state])

    useEffect(() => {
        getAllTasks(userId as string, project, deadline).then(res => {
            if (!res.data) return
            return setTaskData(res.data)
        })
    }, [state])

    const goBack = () => {
        const levelNum = parseInt(state.level)
        const newLevel = (levelNum - 1).toString()
        setState({ ...state, level: newLevel })
    }

    if (state.level == "1")
        return (
            <Box align="center">
                <Box py={10}>
                    <Text fontSize="50px">Dashboard</Text>
                </Box>
                <Box align="center">
                    {projData.map(item => (
                        <Box
                            m={4}
                            p={4}
                            border="1px solid black"
                            width="500px"
                            h="200px"
                            borderRadius="xl"
                            _hover={{ boxShadow: "md" }}
                            onClick={() => {
                                setState({ ...state, level: "2" })
                                setProject(item.title)
                            }}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.overview}</Text>
                            <Text>{item.due_date}</Text>
                        </Box>
                    ))}
                </Box>
                <Button m={4} onClick={() => setModal(true)}>
                    Add Project
                </Button>
                <Modal isOpen={modal} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p={5}>
                        <Button
                            w="max-content"
                            onClick={() => {
                                setModal(false)
                                setState({ ...state, update: true })
                            }}
                        >
                            X
                        </Button>
                        <ModalHeader alignSelf="center" fontSize="20px">
                            New Project
                        </ModalHeader>
                        <AddProject />
                    </ModalContent>
                </Modal>
            </Box>
        )
    else if (state.level == "2")
        return (
            <Box>
                <Button
                    onClick={() => {
                        goBack()
                    }}
                >
                    go back
                </Button>
                <Box align="center">
                    <Text fontSize="30px">{project}</Text>
                </Box>
                <Box align="center">
                    {deadlineData.map(item => (
                        <Box
                            m={4}
                            p={4}
                            border="1px solid black"
                            width="500px"
                            h="200px"
                            borderRadius="xl"
                            _hover={{ boxShadow: "md" }}
                            onClick={() => {
                                setState({ ...state, level: "3" })
                                setDeadline(item.title)
                            }}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.desc}</Text>
                            <Text>{item.date}</Text>
                            <DeadlineProgress
                                userId={userId}
                                project={project}
                                deadline={item.title}
                                // level={state.level}
                            />
                        </Box>
                    ))}
                </Box>
                <Box align="center">
                    <Button m={4} onClick={() => setModal(true)}>
                        Add Deadline
                    </Button>
                    <Button
                        onClick={() => {
                            deleteProject(userId, project)
                            goBack()
                        }}
                    >
                        Delete Project
                    </Button>
                </Box>
                <Modal isOpen={modal} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p={5}>
                        <Button
                            w="max-content"
                            onClick={() => {
                                setModal(false)
                                setState({ ...state, update: true })
                            }}
                        >
                            X
                        </Button>
                        <ModalHeader alignSelf="center" fontSize="20px">
                            New Deadline
                        </ModalHeader>
                        <AddDeadline project={project} />
                    </ModalContent>
                </Modal>
            </Box>
        )
    else if (state.level === "3")
        return (
            <Box>
                <Button
                    onClick={() => {
                        goBack()
                    }}
                >
                    go back
                </Button>
                <Box align="center">
                    <Text fontSize="30px">{project}</Text>
                    <Text fontSize="20px">{deadline}</Text>
                </Box>
                <Box align="center">
                    {taskData.map(item => (
                        <Box
                            m={4}
                            p={4}
                            border="1px solid black"
                            width="500px"
                            h="200px"
                            borderRadius="xl"
                            _hover={{ boxShadow: "md" }}
                        >
                            <Flex direction="column" gridRowGap={10}>
                                <Box>
                                    <Text>{item.title}</Text>
                                    <Text>{item.desc}</Text>
                                    <Text>{item.date}</Text>
                                </Box>
                                <Flex justify="center">
                                    <Flex direction="column">
                                        <Checkbox
                                            defaultIsChecked={item.isCompleted}
                                            onChange={e => {
                                                updateTask(
                                                    userId,
                                                    project,
                                                    deadline,
                                                    item.title,
                                                    {
                                                        isCompleted: !item.isCompleted,
                                                    }
                                                )
                                                setState({
                                                    ...state,
                                                    update: !state.update,
                                                })
                                            }}
                                        >
                                            <Text fontSize="20px">
                                                Completed
                                            </Text>
                                        </Checkbox>
                                        <Button
                                            onClick={() => {
                                                deleteTask(
                                                    userId,
                                                    project,
                                                    deadline,
                                                    item.title
                                                )
                                            }}
                                            w="max-content"
                                        >
                                            Delete Task
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Box>
                    ))}
                </Box>
                <Box align="center">
                    <Button m={4} onClick={() => setModal(true)}>
                        Add Task
                    </Button>
                    <Button
                        onClick={() => {
                            deleteDeadline(userId, project, deadline)
                            goBack()
                        }}
                    >
                        Delete Deadline
                    </Button>
                </Box>
                <Modal isOpen={modal} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p={5}>
                        <Button
                            w="max-content"
                            onClick={() => {
                                setModal(false)
                                setState({ ...state, update: true })
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
    else return <Box>There is an error on dash.tsx component</Box>
}

export default Dash
