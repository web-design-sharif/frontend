import React, { useState } from 'react';
import {
  Box, Flex, Heading, Button, Text, Table, Grid, VStack, Icon, Spinner,
} from '@chakra-ui/react';
import { TbLayoutList, TbLayoutGrid } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

import { useUserForms } from '../../hooks/useUserForms';
import { useUserAnsweredForms } from '../../hooks/useUserAnsweredForms';

export default function FormManagementPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isAnswered, setAnswered] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const { forms, loading, error } = useUserForms();
  const { allForms, loadingAll, errorAll } = useUserAnsweredForms();

  const navigate = useNavigate();

  const filtered = (isAnswered ? allForms : forms).filter((f: { name: string; }) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  if (isAnswered ? loadingAll : loading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isAnswered ? errorAll : error) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  

  return (
    <Flex h="100vh">
      <Box w="64" bg="colorPalette.900" color="white" p="6" display="flex" flexDir="column">
        <Heading size="md" mb="8">Form Builder</Heading>
        <VStack align="start" gap="4" flex="1">
          <Text opacity={isAnswered ? "0.8" : 1} _hover={{ opacity: 1, cursor: 'pointer' }} onClick={() => setAnswered(false)}>My Forms</Text>
          <Text opacity={isAnswered ? 1 : "0.8"} _hover={{ opacity: 1, cursor: 'pointer' }} onClick={() => setAnswered(true)}>My Answered Forms</Text>
          {/* <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>Knowledge Base</Text> */}
          {/* <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>Help & Support</Text> */}
        </VStack>
        <Box mt="auto">
          {/* <Text mb="2">My Profile</Text> */}
          <Button size="sm" opacity="0.8" _hover={{ opacity: 1 }} onClick={() => navigate('/')}>
            Homepage
          </Button>
        </Box>
      </Box>

      {/* Main */}
      <Box flex="1" bg="gray.100" p="8" overflowY="auto">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="6">
          <Heading size="lg">Dashboard</Heading>
          <Button 
            // leftIcon={<FaPlus />} 
            onClick={() => navigate('/create')}
            colorPalette="teal"
          >
            Create New Form
          </Button>
        </Flex>

        {/* Toolbar */}
        <Flex bg="white" p="4" rounded="md" shadow="sm" mb="4" align="center" justify="space-between">
          <Text fontWeight="medium">My Forms ({filtered.length})</Text>
          <Flex align="center" gap="4">
            <Button
              onClick={() => setViewMode('grid')}
              // variant={viewMode === 'grid' ? 'solid' : 'ghost'}
            >
              <Icon 
                as={TbLayoutGrid} 
              />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              // variant={viewMode === 'list' ? 'solid' : 'ghost'}
            >
              <Icon 
                as={TbLayoutList} 
              />
            </Button>
          </Flex>
        </Flex>

        {/* Content */}
        {viewMode === 'list' ? (
          <Box bg="white" rounded="md" shadow="sm" overflowX="auto">
            <Table.Root >
              <Table.Header bg="gray.50">
                <Table.Row>
                  <Table.ColumnHeader>Form Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
                  <Table.ColumnHeader>Responses</Table.ColumnHeader>
                  <Table.ColumnHeader>Action</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map(form => (
                  <Table.Row key={form.id} _hover={{ bg: 'gray.50' }}>
                    <Table.Cell>{form.name}</Table.Cell>
                    <Table.Cell color="gray.600">{form.updated}</Table.Cell>
                    <Table.Cell>{form.responses}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/fill`}>
                        <Text color="colorPalette.600" _hover={{ textDecor: 'underline' }}>
                          View →
                        </Text>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            {filtered.map(form => (
              <Box key={form.id} bg="white" p="4" rounded="md" shadow="sm" _hover={{ shadow: 'md' }}>
                <Text fontWeight="medium" mb="2">{form.name}</Text>
                <Text fontSize="sm" color="gray.500" mb="1">Updated {form.updated}</Text>
                <Text fontSize="sm" fontWeight="semibold" mb="4">
                  {form.responses} responses
                </Text>
                <Link to={`/forms/${form.id}`}>
                  <Text color="teal.600" _hover={{ textDecor: 'underline' }}>
                    View →
                  </Text>
                </Link>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </Flex>
  );
}
