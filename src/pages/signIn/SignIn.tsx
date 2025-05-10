import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
} from '@chakra-ui/react';

import { FormControl, FormLabel , FormErrorMessage,} from "@chakra-ui/form-control";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email : string) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Proceed with login
      console.log('Logging in with', { email, password });
    }
  };

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
          Log In to Forms
        </Heading>

        <FormControl mb={4} isInvalid={!!emailError}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email address"
            type="email"
            bg="gray.50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box color="colorPalette.500">
          {emailError && <FormErrorMessage fontSize="xx-small">{emailError}</FormErrorMessage>}
          </Box>
        </FormControl>

        <FormControl mb={6} isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            bg="gray.50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box color="colorPalette.500">
          {passwordError && <FormErrorMessage fontSize="xx-small">{passwordError}</FormErrorMessage>}
          </Box>
        </FormControl>

        <Flex mb={4}>
          <Button
            colorScheme="cyan"
            w="150px"
            boxShadow="md"
            mr={9}
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            borderColor="cyan.400"
            color="cyan.600"
            w="150px"
          >
            Forgot password
          </Button>
        </Flex>

        <Text fontSize="sm" textAlign="center">
          Don’t have an account?{' '}
          <Link color="cyan.500" href="/signup">
            sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignIn;
