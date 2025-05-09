import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

const Create = () => {
  return (
    <Stack alignItems="center" gap={4} my={7} id="create">
      <Heading size="3xl" fontWeight="bold" color="colorPalette.900">
        Creating forms has never been easier
      </Heading>
      <Text maxW="50%" textAlign="center">
        Design and customize forms effortlessly with our intuitive tools. Whether you're collecting feedback, conducting surveys, or creating registrations, our platform adapts to your requirements.
      </Text>
      <Flex justify="space-between" gap="28">
        <ItemBox title="Manage forms" imgPath="e" subtitle="You can manage your forms all in one place" />
        <ItemBox title="Lots of question types" imgPath="e" subtitle="Add any type of question with a single click" />
      </Flex>
    </Stack>
  );
};

const ItemBox = ({ title, imgPath, subtitle }: {title: string, imgPath: string, subtitle: string}) => {
  return (
    <Box borderColor="gray.300" borderWidth="2px" padding="20px 50px" rounded="md">
      <Stack alignItems="center">
        <Heading color="colorPalette.300" fontSize="md">
          {title}
        </Heading>
        <Image src={imgPath} w="300px" h="200px" fit="contain" />
        <Heading color="colorPalette.700" fontSize="md">
          {subtitle}
        </Heading>
      </Stack>
    </Box>
  );
};

export default Create;