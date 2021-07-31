import React from "react"
import { Box, Text } from "@chakra-ui/react"
import { Project } from "~models"

const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Box>
            <Text>{project.title}</Text>
        </Box>
    )
}

export default ProjectOverview
