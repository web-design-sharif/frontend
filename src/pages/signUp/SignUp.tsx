import React from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Heading,
  Link,
  Flex,
} from '@chakra-ui/react';

import { FormControl, FormLabel } from "@chakra-ui/form-control";

const SignUp = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="white">
      <Box
        p={8}
        maxW="400px"
        w="full"
        boxShadow="lg"
        borderRadius="md"
        textAlign="left"
      >
        <Heading fontSize="2xl" mb={6} fontWeight="bold">
          Sign up to Forms
        </Heading>

        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Stack direction="row">
            <Input placeholder="Enter your email address" type="email" bg="gray.50" />
            <Button colorScheme="cyan" variant="outline" borderColor="cyan.400" color="cyan.600">
              Send Code
            </Button>
          </Stack>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Enter your password" type="password" bg="gray.50" />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder="Enter your password again" type="password" bg="gray.50" />
        </FormControl>

        <Button colorScheme="cyan" w="full" size="lg" boxShadow="md">
          Sign Up
        </Button>

        <Text mt={4} fontSize="sm" textAlign="center">
          Already have an account?{' '}
          <Link color="cyan.500" href="/login">
            Sign In
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;
