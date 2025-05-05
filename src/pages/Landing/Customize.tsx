import { Box, Grid, Text, Heading, Stack, Link } from "@chakra-ui/react";

const Customize = () => {
  return (
    <Box py={16} px={8} textAlign="center">
      <Heading as="h2" size="xl" mb={4} color="teal.700">
        Customize
      </Heading>
      <Text maxW="800px" mx="auto" mb={12} color="gray.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
        {/* Box 1 */}
        <Stack direction="column" align="center">
          <Box w="150px" h="150px" bg="gray.300" />
          <Link href="#" fontWeight="bold" color="teal.800" _hover={{ textDecoration: "underline" }}>
            Choose From Templates
          </Link>
          <Text fontSize="sm" color="gray.600" maxW="350px" textAlign="center">
            Select from a variety of surveys, questionnaires, and other templates to get started quickly.
          </Text>
        </Stack>

        {/* Box 2 */}
        <Stack direction="column" align="center">
          <Box w="150px" h="150px" bg="gray.300" />
          <Link href="#" fontWeight="bold" color="teal.800" _hover={{ textDecoration: "underline" }}>
            Create Custom Flows And Quizzes
          </Link>
          <Text fontSize="sm" color="gray.600" maxW="350px" textAlign="center">
            Add logic to show relevant questions based on previous answers to help boost completion rates. Or, create quizzes to test knowledge.
          </Text>
        </Stack>

        {/* Box 3 */}
        <Stack direction="column" align="center">
          <Box w="150px" h="150px" bg="gray.300" />
          <Link href="#" fontWeight="bold" color="teal.800" _hover={{ textDecoration: "underline" }}>
            Customize To Match Your Brand
          </Link>
          <Text fontSize="sm" color="gray.600" maxW="350px" textAlign="center">
            Choose from colors, images, and fonts to match your organization’s branding.
          </Text>
        </Stack>

        {/* Box 4 */}
        <Stack direction="column" align="center">
          <Box w="150px" h="150px" bg="gray.300" />
          <Link href="#" fontWeight="bold" color="teal.800" _hover={{ textDecoration: "underline" }}>
            Gather Responses From Anywhere
          </Link>
          <Text fontSize="sm" color="gray.600" maxW="350px" textAlign="center">
            Respondents can easily access and complete forms from any device.
          </Text>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Customize;
