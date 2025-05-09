import { Box, Stack, Flex, Heading, Text, Button, ButtonProps, Image } from "@chakra-ui/react"
import { ReactNode } from "react";
import { useNavigate } from "react-router";

const Title = () => {
  return (
    <Box backgroundColor="colorPalette.800" padding="20vh 5%">
      <Flex justify="space-between">
        <Stack color="white" maxWidth={{base: "90%", md: "40%"}}>
          <Heading size="4xl" fontWeight="bold">
            Forms Designer
          </Heading>
          <Text fontSize="3xl">
            Designing and analyzing forms as simple as possible
          </Text>
          <Flex gap={{ base: "3", md: "8" }}>
            <MenuButton
              to="/login"
              variant="outline"
              borderColor="colorPalette.400"
              borderWidth="medium"
              color="colorPalette.400"
              backgroundColor="white"
            >
              Sign In
            </MenuButton>
            <MenuButton to="/signup">Sign Up</MenuButton>
          </Flex>
        </Stack>
        <Flex paddingRight="10%" display={{base: "none", md: "flex"}}>
          <Image src="/landing/title.svg" h="100%" fit="contain" />
        </Flex>
      </Flex>
    </Box>
  );
};

const MenuButton = ({
  children,
  to = "/",
  ...props
}: { children: ReactNode; to?: string } & ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Button
          rounded="sm"
          height="56px"
          width="125px"
          fontSize="md"
          fontWeight="bold"
          borderWidth="2px"
          backgroundColor="colorPalette.400"
          onClick={() => navigate(to)}
          {...props}
        >
          {children}
        </Button>
      </Box>
    </Box>
  );
};

export default Title;