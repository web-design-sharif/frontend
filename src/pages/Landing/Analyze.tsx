import { Box, Grid, Text, Heading, Stack, Link, Image } from "@chakra-ui/react";

const Analyze = () => {
  return (
    <Box py={16} px={8} textAlign="center" bg="gray.50" id="analyze">
      <Heading as="h2" size="3xl" mb={12} color="black" fontWeight="bold">
        Analyzing Data
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        templateRows={{ md: "repeat(2, auto)" }}
        gap={8}
        justifyItems="center"
      >
        {/* Box 1 - Text Card */}
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={6}
          maxW="350px"
          bg="white"
        >
          <Heading fontWeight="bold" fontSize="lg" color="colorPalette.700">
            Visualize The Data
          </Heading>
          <Box my={2} w="300px" mx="auto" borderBottom="1px solid" borderColor="gray.300" />
          <Text fontSize="sm" color="gray.700">
            View automated charts based on respondents’ answers in real-time.
            <br /><br />
            Turn the result into tables for a more detailed and specific analysis.
          </Text>
        </Box>

        {/* Box 2 - Image Placeholder */}
        <Box w="250px" h="200px" bg="gray.300" >
        <Image 
          display={{base: "none", md: "block"}}
          src="/landing/Customize And Share.jpg"
          alt="Visualize The Data"
          boxSize="100%"
          objectFit="cover"
        />
        <Image 
          display={{base: "block", md: "none"}}
          src="/landing/Visualize The Data.jpg" 
          alt="Visualize The Data"
          boxSize="100%"
          objectFit="cover"
        />
        </Box>

        {/* Box 3 - Image Placeholder */}
        <Box w="250px" h="200px" bg="gray.300" >
        <Image 
          display={{base: "none", md: "block"}}
          src="/landing/Visualize The Data.jpg" 
          alt="Visualize The Data"
          boxSize="100%"
          objectFit="cover"
        />
        <Image 
          display={{base: "block", md: "none"}}
          src="/landing/Customize And Share.jpg"
          alt="Visualize The Data"
          boxSize="100%"
          objectFit="cover"
        />
        </Box>

        {/* Box 4 - Text Card */}
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={6}
          maxW="350px"
          bg="white"
        >
          <Heading fontWeight="bold" fontSize="lg" color="colorPalette.700">
            Customize And Share
          </Heading>
          <Box my={2} w="300px" mx="auto" borderBottom="1px solid" borderColor="gray.300" />
          <Text fontSize="sm" color="gray.700">
            Customize the charts by choosing a color pallet and adding descriptions and images to them.
            <br /><br />
            Share the results with others and create reports using them.
          </Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Analyze;
