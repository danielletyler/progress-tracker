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
} from "@chakra-ui/react"
import {
    getAllTasks,
    getAllDeadlines,
    getAllProjects,
} from "../../controllers/project"
import { UserContext } from "~config/user-context"
import { Deadline, Project, Task } from "~models"
import AddProject from "../Projects/add-project"
import AddDeadline from "../Projects/add-deadline"

const Dash = () => {
    const { userId } = useContext(UserContext)
    const [projData, setProjData] = useState<Project[]>([])
    const [deadlineData, setDeadlineData] = useState<Deadline[]>([])
    const [taskData, setTaskData] = useState<Task[]>([])
    const [level, setLevel] = useState("1")
    const [project, setProject] = useState("")
    const [deadline, setDeadline] = useState("")
    const [modal, setModal] = useState(false)

    const { onClose } = useDisclosure()

    useEffect(() => {
        getAllProjects(userId as string).then(res => {
            if (!res.data) return
            return setProjData(res.data)
        })
    }, [])

    useEffect(() => {
        getAllDeadlines(userId as string, project).then(res => {
            if (!res.data) return
            return setDeadlineData(res.data)
        })
    }, [level])

    useEffect(() => {
        getAllTasks(userId as string, project, deadline).then(res => {
            if (!res.data) return
            return setTaskData(res.data)
        })
    }, [level])

    const goBack = () => {
        const levelNum = parseInt(level)
        const newLevel = (levelNum - 1).toString()
        setLevel(newLevel)
    }

    if (level == "1")
        return (
            <Box>
                <Box>
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
                                setLevel("2")
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
                        <Button w="max-content" onClick={() => setModal(false)}>
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
    else if (level == "2")
        return (
            <Box>
                <Button
                    onClick={() => {
                        goBack()
                        console.log(level)
                    }}
                >
                    go back
                </Button>
                <Box align="center">
                    <Text fontSize="30px">{project}</Text>
                </Box>
                <Box>
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
                                setLevel("3")
                                setDeadline(item.title)
                            }}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.desc}</Text>
                            <Text>{item.date}</Text>
                        </Box>
                    ))}
                </Box>
                <Button m={4} onClick={() => setModal(true)}>
                    Add Deadline
                </Button>
                <Modal isOpen={modal} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent p={5}>
                        <Button w="max-content" onClick={() => setModal(false)}>
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
    else if (level === "3")
        return (
            <Box>
                <Button
                    onClick={() => {
                        goBack()
                        console.log(level)
                    }}
                >
                    go back
                </Button>
                <Box align="center">
                    <Text fontSize="30px">{project}</Text>
                    <Text fontSize="20px">{deadline}</Text>
                </Box>
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
                        <Text>{item.title}</Text>
                        <Text>{item.desc}</Text>
                        <Text>{item.date}</Text>
                    </Box>
                ))}
            </Box>
        )
    else return <Box>There is an error on dash.tsx component</Box>
}

export default Dash
