import { Box, Grid, Text, Heading, Stack } from "@chakra-ui/react";

const Customize = () => {
  const items = [
    {title: "Choose From Templates", text:"Select from a variety of surveys, questionnaires, and other templates to get started quickly." },
    {title:"Create Custom Flows And Quizzes", text:"Add logic to show relevant questions based on previous answers to help boost completion rates. Or, create quizzes to test knowledge."},
    {title:"Customize To Match Your Brand", text:"Choose from colors, images, and fonts to match your organization’s branding."},
    {title:"Gather Responses From Anywhere", text:"Respondents can easily access and complete forms from any device."}
  ]


  return (
    <Box py={16} px={8} textAlign="center">
      <Heading as="h2" size="3xl" mb={4} color="colorPalette.700" fontWeight="bold">
        Customize
      </Heading>
      <Text maxW="800px" mx="auto" mb={12} color="gray.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
        {items.map((item, index) => (
          <ItemBox key={index} title={item.title} text={item.text} />
        ))}
      </Grid>
    </Box>
  );
};

const ItemBox = ({title, text}: {title: string, text: string}) => {
  return (
    <Stack direction="column" align="center" height="100%">
      <Box w="150px" h="150px" bg="gray.300" />
      <Heading fontWeight="bold" color="colorPalette.700" size="xl">
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.600" maxW="350px" textAlign="center">
        {text}
      </Text>
    </Stack>
  );
}

export default Customize;
