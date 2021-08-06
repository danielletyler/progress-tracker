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
    SimpleGrid,
} from "@chakra-ui/react"
import ResponsiveBlock from "../shared/responsive-block"
import {
    getAllDeadlines,
    getAllProjects,
    deleteProject,
    deleteDeadline,
} from "../../controllers/project"
import { UserContext } from "~config/user-context"
import { Deadline, Project, User } from "~models"
import AddProject from "../Add/add-project"
import AddDeadline from "../Add/add-deadline"
import DeadlineProgress from "./deadline-progress"
import ProjectProgress from "./project-progress"
import {
    FaMinusCircle,
    FaPlusCircle,
    FaChevronCircleLeft,
    FaRedo,
    FaEllipsisH,
} from "react-icons/fa"
import { getUser } from "../../controllers/user"
import NewTaskProgress from "./new-task-progress"

const Dash = () => {
    const { userId } = useContext(UserContext)
    const [user, setUser] = useState<User | undefined>(undefined)
    const [projData, setProjData] = useState<Project[]>([])
    const [deadlineData, setDeadlineData] = useState<Deadline[]>([])
    // const [taskData, setTaskData] = useState<Task[]>([])
    const [state, setState] = useState({
        level: "1",
        update: false,
    })
    const [project, setProject] = useState("")
    // const [deadline, setDeadline] = useState("")
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    // const [deleteTaskIcon, setDeleteTaskIcon] = useState("#1F2933")
    const [isLoadingProj, setIsLoadingProj] = useState(true)
    const [isLoadingDead, setIsLoadingDead] = useState(true)
    // const [isLoadingTask, setIsLoadingTask] = useState(true)
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
                            <Flex
                                mt={[4, 0, 0, 0]}
                                direction={["column", "row", "row", "row"]}
                                alignItems="center"
                                justify="center"
                                mb={20}
                            >
                                <Text color="#FFFFFF" fontSize="30px">
                                    {project} Overview
                                </Text>
                                <Flex alignItems="center">
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
                                                Delete Project
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Icon
                                        fontSize="20px"
                                        as={FaPlusCircle}
                                        bg="black"
                                        color="white"
                                        borderRadius="full"
                                        onClick={() => setModal(true)}
                                    >
                                        +
                                    </Icon>
                                </Flex>
                            </Flex>
                        </Box>

                        <Box align="center" py={5}>
                            <SimpleGrid
                                columns={[1, 1, 1, 3]}
                                gridColumnGap={20}
                                gridRowGap={[20, 10, 10, 10]}
                            >
                                {deadlineData.map(item => (
                                    <Box
                                        bg="#1F2933"
                                        align="left"
                                        h="max-content"
                                        borderRadius="xl"
                                    >
                                        <Box>
                                            <Flex
                                                alignItems="center"
                                                gridColumnGap={2}
                                            >
                                                <Text
                                                    fontSize="20px"
                                                    color="#FFFFFF"
                                                    fontWeight={700}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Icon
                                                    fontSize="20px"
                                                    as={FaMinusCircle}
                                                    color={"#2c3b4a"}
                                                    onClick={() => {
                                                        deleteDeadline(
                                                            userId,
                                                            project,
                                                            item.title
                                                        ),
                                                            setState({
                                                                ...state,
                                                                update: !state.update,
                                                            })
                                                    }}
                                                    _hover={{
                                                        color:
                                                            "rgba(255, 0, 0, 0.5)",
                                                    }}
                                                    transition="0.25s"
                                                ></Icon>
                                            </Flex>
                                            <Text mt={1} color="#FFFFFF">
                                                {" "}
                                                due on {item.date}
                                            </Text>
                                        </Box>
                                        <DeadlineProgress
                                            userId={userId}
                                            project={project}
                                            deadline={item.title}
                                        />
                                        <NewTaskProgress
                                            deadline={item.title}
                                            userId={userId}
                                            project={project}
                                        />
                                    </Box>
                                ))}
                            </SimpleGrid>
                            <Box
                                align="left"
                                // w={["100%", "50%", "50%", "50%"]}
                            ></Box>
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
    else return <Box>There is an error on dash.tsx component</Box>
}

export default Dash
