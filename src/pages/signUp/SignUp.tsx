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

import { FormControl, FormLabel , FormErrorMessage } from "@chakra-ui/form-control";


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isStrongPassword = (pwd: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd);
};

  const handleSubmit = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!isStrongPassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include both letters and numbers.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmError('');
    }

    if (valid) {
      alert('Signed up successfully (mock)');
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="white">
      <Box maxW="400px" w="full" p={8} boxShadow="lg" borderRadius="md">
        <Heading fontSize="2xl" mb={6}>Sign up to Forms</Heading>

        <FormControl mb={4} isInvalid={!!emailError}>
          <FormLabel>Email</FormLabel>
          <Flex>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.50"
            />
            <Button ml={2} border="1px solid" borderColor="cyan.400" color="white" >
              Send Code
            </Button>
          </Flex>
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.50"
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <FormControl mb={6} isInvalid={!!confirmError}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Enter your password again"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="gray.50"
          />
          <FormErrorMessage>{confirmError}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="cyan"
          w="full"
          boxShadow="md"
          onClick={handleSubmit}
          mb={4}
        >
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center">
          Already have an account?{' '}
          <Link color="cyan.500" href="#">Sign In</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;
