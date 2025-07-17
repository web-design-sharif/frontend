import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Heading, Button, Text, Table, Grid, VStack, Icon, Spinner, Link
} from '@chakra-ui/react';
import { TbLayoutList, TbLayoutGrid } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FiTrash2 } from 'react-icons/fi';

import { useUserForms } from '../../hooks/useUserForms';
import { useUserAnsweredForms } from '../../hooks/useUserAnsweredForms';
import { Form } from '../../types';
import { usePublish } from '../../hooks/usePublish';
import { useDelete } from '../../hooks/useDelete';
import { useForm } from '../../hooks/useForm';

export default function FormManagementPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isAnswered, setAnswered] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  let { forms, loading, error } = useUserForms();
  const { allForms, loadingAll, errorAll } = useUserAnsweredForms();
  const { error: publishError, publishForm } = usePublish();
  const { error: deleteError, deleteForm } = useDelete();
  const [publishedForms, setPublishedForms] = useState<Set<number>>(new Set());
  const { select } = useForm();
  // const [f, setf] = useState<>();

  const navigate = useNavigate();

  let filtered = (isAnswered ? allForms : forms)
  // .filter((f: { title: string; }) =>
  //   f.title.toLowerCase().includes(query.trim().toLowerCase())
  // );

  useEffect(() => {
    const s = new Set<number>();
    forms.forEach((form) => {
      if (form.published)
        s.add(form.id);
    })
    setPublishedForms(s);
  }, [forms]);

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

  const selectForm = (form: Form) => {
    if (isAnswered) {
      select(form);
      navigate('/fill');
    }
    else {
      publishForm(form.id);
      if (publishError)
        alert(publishError);

      if (publishedForms.has(form.id)) {
        setPublishedForms(prev => {
          const next = new Set(prev);
          next.delete(form.id);
          return next;
        });
      } else {
        setPublishedForms(prev => new Set(prev).add(form.id));
      }

      for (let i = 0; i < forms.length; i++) {
        if (forms[i].id == form.id)
          forms[i].updatedAt = new Date().toString();
      }
    }
  };

  const deleteFormNow = (form: Form) => {
    deleteForm(form.id);
    if (deleteError)
      alert(deleteError);
    
    const newForms: Form[] = [];
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].id != form.id)
        newForms.push(forms[i]);
    }
    forms = newForms;
    filtered = (isAnswered ? allForms : forms).filter((f: { title: string; }) =>
      f.title.toLowerCase().includes(query.trim().toLowerCase())
    );
    window.location.reload();
  }

  const analyzeForm = (form: Form) => {
    select(form);
    navigate('/analyze');
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
                  <Table.ColumnHeader w="40%">Form Name</Table.ColumnHeader>
                  <Table.ColumnHeader w="30%">Last Updated</Table.ColumnHeader>
                  <Table.ColumnHeader w="10%">Responses</Table.ColumnHeader>
                  <Table.ColumnHeader w="20%">Action</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map(form => (
                  <Table.Row key={form.id} _hover={{ bg: 'gray.50' }}>
                    <Table.Cell w="40%">
                      {isAnswered ? form.title : <Link onClick={() => analyzeForm(form)}>{form.title}</Link>}
                    </Table.Cell>
                    <Table.Cell color="gray.600" w="30%">{formatDistanceToNow(new Date(form.updatedAt), { addSuffix: true })}</Table.Cell>
                    <Table.Cell  w="10%">{3}</Table.Cell>
                    <Table.Cell w="20%">
                      <Flex justify="space-between">
                        <Link onClick={() => selectForm(form)}>
                          <Text color="colorPalette.600" _hover={{ textDecor: 'underline' }}>
                            { isAnswered ? "View →" : (publishedForms.has(form.id) ? "Unpublish" : "Publish") }
                          </Text>
                        </Link>
                        <Link>
                          {isAnswered ? <></> : <FiTrash2 size={20} color="red" onClick={() => deleteFormNow(form)} />}
                        </Link>
                      </Flex>
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
                <Text fontWeight="medium" mb="2">{form.title}</Text>
                <Text fontSize="sm" color="gray.500" mb="1">Updated {formatDistanceToNow(new Date(form.updatedAt), { addSuffix: true })}</Text>
                <Text fontSize="sm" fontWeight="semibold" mb="4">
                  {3} responses
                </Text>
                <Flex justify="space-between">
                  <Link onClick={() => selectForm(form)}>
                    <Text color="colorPalette.600" _hover={{ textDecor: 'underline' }}>
                      { isAnswered ? "View →" : (publishedForms.has(form.id) ? "Unpublish" : "Publish") }
                    </Text>
                  </Link>
                  <Link>
                    {isAnswered ? <></> : <FiTrash2 size={20} color="red" onClick={() => deleteFormNow(form)} />}
                  </Link>
                </Flex>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </Flex>
  );
}
