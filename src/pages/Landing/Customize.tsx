import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Customize = () => {

  return (
    <Box p={8} textAlign="center">
      <Heading mb={2}>Customize</Heading>
      <Text maxW="600px" mx="auto" mb={10}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>

      <Flex direction="column" gap={12} align="center">
        <Flex gap={500} justify="center" flexWrap="wrap">
          <Box maxW="200px" textAlign="center">
            <Image src="public\team\Choose From Templates.jpg" alt="Choose From Templates" mb={4} boxSize="200px" 
  objectFit="cover"/>
            <Text fontWeight="bold">Choose From Templates</Text>
            <Text fontSize="sm">
              Select From A Variety Of Surveys, Questionnaires, And Other Templates To Get Started Quickly.
            </Text>
          </Box>

          <Box maxW="200px" textAlign="center">
            <Image src="public\team\Create Custom Flows And Quizzes.jpg" alt="Create Custom Flows And Quizzes" mb={4} boxSize="200px" 
  objectFit="cover"/>
            <Text fontWeight="bold">Create Custom Flows And Quizzes</Text>
            <Text fontSize="sm">
              Add Logic To Show Relevant Questions Based On Previous Answers To Help Boost Completion Rates. Or, Create Quizzes To Test Knowledge.
            </Text>
          </Box>
        </Flex>

        <Flex gap={500} justify="center" flexWrap="wrap">
          <Box maxW="200px" textAlign="center">
            <Image src="public\team\Customize To Match Your Brand.jpg" alt="Customize To Match Your Brand" mb={4} boxSize="200px" 
  objectFit="cover"/>
            <Text fontWeight="bold">Customize To Match Your Brand</Text>
            <Text fontSize="sm">
              Choose From Colors, Images, And Fonts To Match Your Organization's Branding.
            </Text>
          </Box>

          <Box maxW="200px" textAlign="center">
            <Image src="public\team\Gather Responses From Anywhere.jpg" alt="Gather Responses From Anywhere" mb={4} boxSize="200px" 
  objectFit="cover"/>
            <Text fontWeight="bold">Gather Responses From Anywhere</Text>
            <Text fontSize="sm">
              Respondents Can Easily Access And Complete Forms From Any Device.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};


export default Customize;
