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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigate('/forms');
      // Redirect or store user info in localStorage as needed
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

        <FormControl mb={4} isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email address"
            type="email"
            bg="gray.50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage fontSize="xx-small" textColor="cyan">{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl mb={6} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            bg="gray.50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage fontSize="xx-small" textColor="cyan">{errors.password}</FormErrorMessage>
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
