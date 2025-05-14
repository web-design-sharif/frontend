import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  Input,
  Text,
  Link,
  Heading,
} from '@chakra-ui/react';

const CNF = () => {
  const [labelToggle, setLabelToggle] = useState(true);
  const [selectedFont, setSelectedFont] = useState('Roboto');

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="20%" bg="blue.900" color="white" p="20px">
        <Text fontSize="2xl" fontWeight="bold" mb="40px">
          Form Builder
        </Text>
        <Box mb="8px" background={'whiteAlpha.500'}>Form</Box>
        <Box mb="8px">Responces</Box>
        <Box mb="8px">Analytics</Box>
        <Box position="absolute" bottom="20px" left="20px" fontSize="sm">
         <Link href="#">
                logout
          </Link>
        </Box>
      </Box>

      {/* Main Content */}
      <Box w="80%" p="32px" bg="gray.50">
        <Heading size="md" mb="8px">Create New Form</Heading>
        <Text fontSize="sm" color="blue.500" mb="24px">My Forms &gt;&gt; Create New Form</Text>

        <Flex gap="24px">
          {/* Form Section */}
          <Box bg="white" p="24px" rounded="md" boxShadow="md" w="60%">
            <Heading size="sm" mb="16px" borderBottom="1px solid #e2e8f0" pb="8px">
              Untitled Form
            </Heading>

            <VStack align="stretch">
              <Box>
                <Text mb="4px">First Name</Text>
                <Input placeholder="John" />
              </Box>
              <Box mt="16px">
                <Text mb="4px">Last Name</Text>
                <Input placeholder="Doe" />
              </Box>
              <Button mt="24px" variant="outline" colorScheme="blue" borderStyle="dashed">
                + Add New Field
              </Button>
            </VStack>
          </Box>

          {/* Settings Panel */}
          <Box bg="white" p="24px" rounded="md" boxShadow="md" w="40%">
            <Box mb="24px">
              <Text mb="8px">Background Color</Text>
              <HStack gap="12px">
                {['white', 'yellow', 'green', 'blue', 'pink', 'black'].map((color) => (
                  <Box
                    key={color}
                    w="20px"
                    h="20px"
                    borderRadius="full"
                    bg={color}
                    border="2px solid gray"
                    cursor="pointer"
                  />
                ))}
              </HStack>
            </Box>

            <Box mb="24px">
              <Text mb="8px">Font Family</Text>
              <HStack gap="8px" wrap="wrap">
                {['Roboto', 'Arial', 'Verdana'].map((font) => (
                  <Button
                    key={font}
                    size="sm"
                    variant={selectedFont === font ? 'solid' : 'outline'}
                    onClick={() => setSelectedFont(font)}
                  >
                    {font}
                  </Button>
                ))}
              </HStack>
            </Box>

            <HStack justify="space-between">
              <Text>Form Labels</Text>
              <Button size="sm" onClick={() => setLabelToggle(!labelToggle)}>
                {labelToggle ? 'Turned ON' : 'Turned OFF'}
              </Button>
            </HStack>
          </Box>
        </Flex>

        <Button mt="32px" colorScheme="blue">
          Publish Form
        </Button>
      </Box>
    </Flex>
  );
};

export default CNF;
