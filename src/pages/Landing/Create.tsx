import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

const Create = () => {
  return (
    <Stack alignItems="center" gap={4} my={7} id="create">
      <Heading size={{base: "xl", md: "3xl"}} fontWeight="bold" color="colorPalette.900">
        Creating forms has never been easier
      </Heading>
      <Text maxW={{base: "85%", md: "50%"}} textAlign="center" fontSize={{base: "sm", md: "md"}}>
        Design and customize forms effortlessly with our intuitive tools. Whether you're collecting feedback, conducting surveys, or creating registrations, our platform adapts to your requirements.
      </Text>
      <Flex justify="center" gap={{base: "5", md: "28"}}>
        <ItemBox title="Manage forms" imgPath="/landing/manage.png" subtitle="You can manage your forms all in one place" />
        <ItemBox title="Lots of question types" imgPath="/landing/add.png" subtitle="Add any type of question with a single click" />
      </Flex>
    </Stack>
  );
};

const ItemBox = ({ title, imgPath, subtitle }: {title: string, imgPath: string, subtitle: string}) => {
  return (
    <Box borderColor="gray.300" borderWidth="2px" padding={{base: "10px 5%", md: "20px 10%"}} rounded="md">
      <Stack alignItems="center">
        <Heading color="colorPalette.300" fontSize={{base: "2xs", md: "md"}}>
          {title}
        </Heading>
        <Image src={imgPath} w={{base: "120px", md: "300px"}} h={{base: "67px", md: "200px"}} fit="contain" />
        <Text color="colorPalette.700" fontSize={{base: "2xs", md: "md"}} textAlign="center">
          {subtitle}
        </Text>
      </Stack>
    </Box>
  );
};

export default Create;