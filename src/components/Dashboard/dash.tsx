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
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"
import ResponsiveBlock from "../shared/responsive-block"
import {
    getAllTasks,
    getAllDeadlines,
    getAllProjects,
    deleteProject,
    deleteDeadline,
    deleteTask,
} from "../../controllers/project"
import { UserContext } from "~config/user-context"
import { Deadline, Project, Task, User } from "~models"
import AddProject from "../Add/add-project"
import AddDeadline from "../Add/add-deadline"
import AddTask from "../Add/add-task"
import DeadlineProgress from "./deadline-progress"
import ProjectProgress from "./project-progress"
import {
    FaPlusCircle,
    FaChevronCircleLeft,
    FaMinusCircle,
    FaRedo,
    FaEllipsisH,
} from "react-icons/fa"
import { getUser } from "../../controllers/user"
import TaskProgress from "./task-progress"

const Dash = () => {
    const { userId } = useContext(UserContext)
    const [user, setUser] = useState<User | undefined>(undefined)
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
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)
    const [isLoadingProj, setIsLoadingProj] = useState(true)
    const [isLoadingDead, setIsLoadingDead] = useState(true)
    const [isLoadingTask, setIsLoadingTask] = useState(true)
    const { onClose } = useDisclosure()

    useEffect(() => {
        getUser(userId).then(res => {
            if (!res.data) return
            return setUser(res.data)
        })
    }, [])

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
                <Box align="center" bg="#1F2933" h="max-content" py={5}>
                    <ResponsiveBlock>
                        <Box py={10}>
                            <Text color="#FFFFFF" fontSize="50px">
                                {user?.first_name}'s Dashboard
                            </Text>
                        </Box>
                        <Box align="center" mt={20}>
                            {projData.map(item => (
                                <Box
                                    bg="#1F2933"
                                    align="left"
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
                        <Box align="left" w="90%">
                            <Flex>
                                <Icon
                                    fontSize="30px"
                                    as={FaPlusCircle}
                                    bg="black"
                                    color="white"
                                    borderRadius="full"
                                    onClick={() => setModal(true)}
                                ></Icon>
                            </Flex>
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
                    <Flex justify="space-between">
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
                            />
                            <Text color="white" mt={12}>
                                {`>`} {project}
                            </Text>
                        </Flex>
                        <Icon
                            fontSize="30px"
                            m={10}
                            as={FaRedo}
                            color="white"
                            bg="black"
                            onClick={() => {
                                setState({ ...state, update: !state.update })
                            }}
                        />
                    </Flex>
                    <ResponsiveBlock>
                        <Box align="center">
                            <Flex width="max-content">
                                <Text color="#FFFFFF" fontSize="30px">
                                    {project} Overview
                                </Text>
                                <Menu>
                                    <MenuButton
                                        aria-label="Options"
                                        variant="outline"
                                    >
                                        <Icon
                                            m={4}
                                            fontSize="20px"
                                            color="white"
                                            as={FaEllipsisH}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => setDeleteModal(true)}
                                        >
                                            Delete Project
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Box>

                        <Box align="center" py={5}>
                            <Box align="left" pt={10} w="50%">
                                <Text
                                    fontSize="20px"
                                    color="#FFFFFF"
                                    w="max-content"
                                >
                                    Deadlines:
                                </Text>
                            </Box>
                            {deadlineData.map(item => (
                                <Box
                                    bg="#1F2933"
                                    align="left"
                                    my={10}
                                    width="50%"
                                    h="max-content"
                                    borderRadius="xl"
                                    onClick={() => {
                                        setState({ ...state, level: "3" })
                                        setDeadline(item.title)
                                    }}
                                >
                                    <Flex gridColumnGap={2}>
                                        <Text
                                            fontSize="20px"
                                            color="#FFFFFF"
                                            fontWeight={700}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text mt={1} color="#FFFFFF">
                                            {" "}
                                            due on {item.date}
                                        </Text>
                                    </Flex>
                                    <DeadlineProgress
                                        userId={userId}
                                        project={project}
                                        deadline={item.title}
                                    />
                                </Box>
                            ))}
                            <Box align="left" w="50%">
                                <Icon
                                    fontSize="30px"
                                    as={FaPlusCircle}
                                    bg="black"
                                    color="white"
                                    borderRadius="full"
                                    onClick={() => setModal(true)}
                                >
                                    +
                                </Icon>
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
                        <Modal isOpen={deleteModal} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent p={5}>
                                <Button
                                    w="max-content"
                                    onClick={() => {
                                        setDeleteModal(false)
                                        setState({
                                            ...state,
                                            update: !state.update,
                                        })
                                    }}
                                >
                                    X
                                </Button>
                                <ModalHeader alignSelf="center" fontSize="20px">
                                    Delete Project?
                                </ModalHeader>
                                <Box>
                                    <Text align="center">
                                        Are you sure you want to delete this
                                        project?
                                    </Text>
                                    <Text align="center">
                                        This action cannot be undone
                                    </Text>
                                </Box>
                                <Box align="center">
                                    <Button
                                        mt={10}
                                        onClick={() => {
                                            deleteProject(userId, project),
                                                setDeleteModal(false),
                                                setState({
                                                    ...state,
                                                    level: "1",
                                                })
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
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
                    <Flex justify="space-between">
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
                            />
                            <Text color="white" mt={12}>
                                {`>`} {project} {`>`} {deadline}
                            </Text>
                        </Flex>
                        <Icon
                            fontSize="30px"
                            m={10}
                            as={FaRedo}
                            color="white"
                            bg="black"
                            onClick={() => {
                                setState({ ...state, update: !state.update })
                            }}
                        />
                    </Flex>
                    <ResponsiveBlock>
                        <Box align="center" pt={10} pb={20}>
                            <Box align="left" w="50%">
                                <Flex justify="center" mb={10}>
                                    <Text fontSize="30px" color="white">
                                        {deadline}
                                    </Text>
                                    <Menu>
                                        <MenuButton
                                            aria-label="Options"
                                            variant="outline"
                                        >
                                            <Icon
                                                m={4}
                                                fontSize="20px"
                                                color="white"
                                                as={FaEllipsisH}
                                            />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    setDeleteModal(true)
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                                <Text color="white" fontSize="20px">
                                    Tasks:
                                </Text>
                            </Box>
                            {taskData.map(item => (
                                <Box
                                    // bg="#323F4B"
                                    bgGradient="linear(to-r, #5E72EB, #120C6E)"
                                    align="left"
                                    m={4}
                                    p={4}
                                    width="50%"
                                    h="max-content"
                                    borderRadius="xl"
                                    _hover={{ boxShadow: "md" }}
                                >
                                    <Flex
                                        direction="row"
                                        justify="space-between"
                                        // pt={14}
                                        px={10}
                                    >
                                        <Flex gridColumnGap={5}>
                                            <TaskProgress
                                                userId={userId}
                                                project={project}
                                                deadline={deadline}
                                                task={item.title}
                                            />
                                            <Box>
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
                        <Modal isOpen={deleteModal} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent p={5}>
                                <Button
                                    w="max-content"
                                    onClick={() => {
                                        setDeleteModal(false)
                                        setState({
                                            ...state,
                                            update: !state.update,
                                        })
                                    }}
                                >
                                    X
                                </Button>
                                <ModalHeader alignSelf="center" fontSize="20px">
                                    Delete Deadline?
                                </ModalHeader>
                                <Box>
                                    <Text align="center">
                                        Are you sure you want to delete this
                                        deadline?
                                    </Text>
                                    <Text align="center">
                                        This action cannot be undone
                                    </Text>
                                </Box>
                                <Box align="center">
                                    <Button
                                        mt={10}
                                        onClick={() => {
                                            deleteDeadline(
                                                userId,
                                                project,
                                                deadline
                                            ),
                                                setDeleteModal(false),
                                                setState({
                                                    ...state,
                                                    level: "2",
                                                })
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </ModalContent>
                        </Modal>
                    </ResponsiveBlock>
                </Box>
            )
    else return <Box>There is an error on dash.tsx component</Box>
}

export default Dash
