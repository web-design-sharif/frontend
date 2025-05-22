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
import { useSignUp } from '../../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, errors } = useSignUp();
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigate('/forms');
    }
  };

  const handleSubmit = async () => {
    const success = await signUp(email, password, confirmPassword);
    if (success) {
      handleLogin();
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="white">
      <Box maxW="400px" w="full" p={8} boxShadow="lg" borderRadius="md">
        <Heading fontSize="2xl" mb={6}>
          Sign up to Forms
        </Heading>

        <FormControl mb={4} isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.50"
          />
          <FormErrorMessage fontSize="xx-small" textColor="cyan">
            {errors.email}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.50"
          />
          <FormErrorMessage fontSize="xx-small" textColor="cyan">
            {errors.password}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={6} isInvalid={!!errors.confirm}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Enter your password again"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="gray.50"
          />
          <FormErrorMessage fontSize="xx-small" textColor="cyan">
            {errors.confirm}
          </FormErrorMessage>
        </FormControl>

        <Button colorScheme="cyan" w="full" boxShadow="md" onClick={handleSubmit} mb={4}>
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center">
          Already have an account?{' '}
          <Link color="colorPalette.500" href="/login">
            Sign In
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;
