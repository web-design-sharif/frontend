import { Box, Grid, Text, Heading, Stack, Image } from "@chakra-ui/react";

const Customize = () => {
  const items = [
    {title: "Choose From Templates", text :"Select from a variety of surveys, questionnaires, and other templates to get started quickly.", imagePath: "/landing/Choose From Templates.jpg", alt:"Choose From Templates" },
    {title: "Create Custom Flows And Quizzes", text: "Add logic to show relevant questions based on previous answers to help boost completion rates. Or, create quizzes to test knowledge.", imagePath: "/landing/Create Custom Flows And Quizzes.jpg", alt:"Create Custom Flows And Quizzes"},
    {title: "Customize To Match Your Brand", text: "Choose from colors, images, and fonts to match your organization’s branding.", imagePath: "/landing/Customize To Match Your Brand.jpg", alt: "Customize To Match Your Brand"},
    {title: "Gather Responses From Anywhere", text: "Respondents can easily access and complete forms from any device.", imagePath: "/landing/Gather Responses From Anywhere.jpg", alt: "Gather Responses From Anywhere"}
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
          <ItemBox key={index} title={item.title} text={item.text} imagePath={item.imagePath} alt={item.alt} />
        ))}
      </Grid>
    </Box>
  );
};

const ItemBox = ({title, text, imagePath, alt}: {title: string, text: string, imagePath: string, alt: string}) => {
  return (
    <Stack direction="column" align="center" height="100%">
      <Image src={imagePath} alt={alt} mb={4} boxSize="200px" objectFit="cover"/>
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