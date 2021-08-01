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
    Icon,
} from "@chakra-ui/react"
import ResponsiveBlock from "../shared/responsive-block"
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
import ProjectProgress from "./project-progress"
import {
    FaPlusCircle,
    FaChevronCircleLeft,
    FaMinusCircle,
} from "react-icons/fa"

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
    const [isLoadingProj, setIsLoadingProj] = useState(true)
    const [isLoadingDead, setIsLoadingDead] = useState(true)
    const [isLoadingTask, setIsLoadingTask] = useState(true)
    const { onClose } = useDisclosure()

    useEffect(() => {
        getAllProjects(userId as string).then(res => {
            if (!res.data) return
            return setProjData(res.data), setIsLoadingProj(false)
        })
    }, [state])

    useEffect(() => {
        getAllDeadlines(userId as string, project).then(res => {
            if (!res.data) return
            return setDeadlineData(res.data), setIsLoadingDead(false)
        })
    }, [state])

    useEffect(() => {
        getAllTasks(userId as string, project, deadline).then(res => {
            if (!res.data) return
            return setTaskData(res.data), setIsLoadingTask(false)
        })
    }, [state])

    const goBack = () => {
        const levelNum = parseInt(state.level)
        const newLevel = (levelNum - 1).toString()
        setState({ ...state, level: newLevel })
    }

    if (state.level == "1") {
        if (isLoadingProj)
            return (
                <Box color="white" p={20}>
                    LOADING
                </Box>
            )
        else
            return (
                <Box align="center" bg="#1F2933" h="max-content">
                    <ResponsiveBlock>
                        <Box py={10}>
                            <Text color="#FFFFFF" fontSize="50px">
                                Dashboard
                            </Text>
                        </Box>
                        <Box align="center" mt={10}>
                            {projData.map(item => (
                                <Box
                                    bg="#1F2933"
                                    align="left"
                                    m={4}
                                    p={4}
                                    width="90%"
                                    h="200px"
                                    borderRadius="xl"
                                    onClick={() => {
                                        setState({ ...state, level: "2" })
                                        setProject(item.title)
                                    }}
                                >
                                    <Text
                                        color="#FFFFFF"
                                        fontSize="20px"
                                        fontWeight={700}
                                    >
                                        {item.title}
                                    </Text>
                                    {/* <Text>{item.overview}</Text> */}
                                    <Text color="#FFFFFF">
                                        due on {item.due_date}
                                    </Text>
                                    <ProjectProgress
                                        userId={userId}
                                        project={item.title}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box
                            as="button"
                            bg="#FFFFFF"
                            w="max-content"
                            borderRadius="xl"
                            p={3}
                            m={10}
                            onClick={() => setModal(true)}
                            color="black"
                        >
                            Add Project
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
                                    New Project
                                </ModalHeader>
                                <AddProject />
                            </ModalContent>
                        </Modal>
                    </ResponsiveBlock>
                </Box>
            )
    } else if (state.level == "2")
        if (isLoadingDead)
            return (
                <Box color="white" p={20}>
                    LOADING
                </Box>
            )
        else
            return (
                <Box bg="#1F2933" h="max-content">
                    <Flex>
                        <Icon
                            fontSize="30px"
                            m={10}
                            as={FaChevronCircleLeft}
                            color="white"
                            bg="black"
                            onClick={() => {
                                goBack()
                            }}
                        ></Icon>
                        <Text color="white" mt={12}>
                            {`>`} {project}
                        </Text>
                    </Flex>
                    <ResponsiveBlock>
                        <Box align="center">
                            <Text color="#FFFFFF" fontSize="30px">
                                {project} Overview
                            </Text>
                        </Box>
                        <Box align="center" pt={10}>
                            <Text
                                fontSize="20px"
                                color="#FFFFFF"
                                borderBottom="1px solid white"
                                w="max-content"
                            >
                                Deadlines
                            </Text>
                        </Box>
                        <Box align="center" py={5}>
                            {deadlineData.map(item => (
                                <Box
                                    bg="#1F2933"
                                    align="left"
                                    m={4}
                                    p={4}
                                    width="90%"
                                    h="200px"
                                    borderRadius="xl"
                                    onClick={() => {
                                        setState({ ...state, level: "3" })
                                        setDeadline(item.title)
                                    }}
                                >
                                    <Text
                                        fontSize="20px"
                                        color="#FFFFFF"
                                        fontWeight={700}
                                    >
                                        {item.title}
                                    </Text>
                                    {/* <Text color="#FFFFFF">{item.desc}</Text> */}
                                    <Text color="#FFFFFF">
                                        {" "}
                                        due on {item.date}
                                    </Text>
                                    <DeadlineProgress
                                        userId={userId}
                                        project={project}
                                        deadline={item.title}
                                    />
                                </Box>
                            ))}
                            <Box align="left" w="90%">
                                <Icon
                                    fontSize="30px"
                                    as={FaPlusCircle}
                                    bg="black"
                                    m={4}
                                    color="white"
                                    borderRadius="full"
                                    onClick={() => setModal(true)}
                                >
                                    +
                                </Icon>
                            </Box>
                        </Box>
                        <Box align="center">
                            <Box
                                as="button"
                                bg="white"
                                m={4}
                                p={2}
                                color="black"
                                borderRadius="xl"
                                onClick={() => {
                                    deleteProject(userId, project)
                                    goBack()
                                }}
                            >
                                Delete Project
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
                                    New Deadline
                                </ModalHeader>
                                <AddDeadline project={project} />
                            </ModalContent>
                        </Modal>
                    </ResponsiveBlock>
                </Box>
            )
    else if (state.level === "3")
        if (isLoadingTask)
            return (
                <Box color="white" p={20}>
                    LOADING
                </Box>
            )
        else
            return (
                <Box bg="#1F2933" h="max-content">
                    <Flex>
                        <Icon
                            fontSize="30px"
                            m={10}
                            as={FaChevronCircleLeft}
                            color="white"
                            bg="black"
                            onClick={() => {
                                goBack()
                            }}
                        ></Icon>
                        <Text color="white" mt={12}>
                            {`>`} {project} {`>`} {deadline}
                        </Text>
                    </Flex>
                    <ResponsiveBlock>
                        <Box align="center" py={20}>
                            <Box align="left" w="50%">
                                <Text color="white" fontSize="20px">
                                    {deadline} Tasks:
                                </Text>
                            </Box>
                            {taskData.map(item => (
                                <Box
                                    // bg="#323F4B"
                                    bgGradient="linear(to-l, #5E72EB, #FF9190)"
                                    align="left"
                                    m={4}
                                    p={4}
                                    width="50%"
                                    h="200px"
                                    borderRadius="xl"
                                    _hover={{ boxShadow: "md" }}
                                >
                                    <Flex
                                        direction="row"
                                        justify="space-between"
                                        pt={14}
                                        px={10}
                                    >
                                        <Flex gridColumnGap={5}>
                                            <Checkbox
                                                size="lg"
                                                colorScheme="telegram"
                                                defaultIsChecked={
                                                    item.isCompleted
                                                }
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
                                            ></Checkbox>
                                            <Box pt={1}>
                                                <Text
                                                    color="white"
                                                    fontWeight={700}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text color="white">
                                                    {item.desc}
                                                </Text>
                                                {item.date != "" ? (
                                                    <Text color="white">
                                                        due on {item.date}
                                                    </Text>
                                                ) : (
                                                    <Text></Text>
                                                )}
                                            </Box>
                                        </Flex>
                                        <Icon
                                            pl={5}
                                            fontSize="30px"
                                            as={FaMinusCircle}
                                            // color="#FF9190"
                                            color="white"
                                            // bg="#323F4B"
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
                                            w="max-content"
                                        ></Icon>
                                    </Flex>
                                </Box>
                            ))}
                            <Box align="left" w="50%">
                                <Icon
                                    fontSize="30px"
                                    as={FaPlusCircle}
                                    bg="black"
                                    m={4}
                                    color="white"
                                    borderRadius="full"
                                    onClick={() => setModal(true)}
                                >
                                    +
                                </Icon>
                            </Box>
                        </Box>
                        <Box align="center">
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
                                <AddTask
                                    project={project}
                                    deadline={deadline}
                                />
                            </ModalContent>
                        </Modal>
                    </ResponsiveBlock>
                </Box>
            )
    else return <Box>There is an error on dash.tsx component</Box>
}

export default Dash
