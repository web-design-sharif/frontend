import React, { use, useEffect, useState } from 'react';
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
  Editable,
  Menu,
  Portal,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router';

type FormItem = {
  name: string;
  type: string;
  initialValue?: string;
  radioValues: string[]
};

const CNF = () => {
  const [selectedFont, setSelectedFont] = useState<string>('Roboto');
  const [backgroundColor, setBackGroundColor] = useState<string>('white');
  const [title, setTitle] = useState<string>('Untitled Form');
  const [form, setForm] = useState<FormItem[]>([]);
  const [completeForm, setCompleteForm] = useState({});
  const { user } = useAuth();

  const handleCompleteForm = () => {
    setCompleteForm({"name": title, "bgColor": backgroundColor, "font": selectedFont, "questions": form, "owner_id": user ? user.id : '-', "updated": "Now", "responses": 1

    });
  }

  const handleTitleChange = (index: number, newTitle: string) => {
    setForm((prevForm) =>
      prevForm.map((item, i) =>
        i === index ? { ...item, name: newTitle } : item
      )
    );
  };

  const handleInitialValueChange = (index: number, newInitialValue: string) => {
    setForm((prevForm) =>
      prevForm.map((item, i) =>
        i === index ? { ...item, initialValue: newInitialValue } : item
      )
    );
  };

  const addItem = (type: string) => {
    const n = [];
    form.map((item) => n.push(item));
    n.push({ name: "Untitled Question", type: type, initialValue: "", radioValues: [] });
    setForm(n);
  };

  const removeItem = (i: number) => {
    const n: FormItem[] = [];
    form.map((item, index) => {if (index != i) n.push(item)});
    setForm(n);
  };

  const EditableText = ({ font, initialText, index } : { font: string, initialText: string, index: number }) => {
    const [text, setText] = useState<string>(initialText);
    return (
      <Editable.Root 
        value={text}
        onValueChange={(e) => setText(e.value)}
        onValueCommit={(e) => handleTitleChange(index, text)}
        fontFamily={font} 
        activationMode="dblclick"
      >
        <Editable.Preview fontFamily={font}  />
        <Editable.Input fontFamily={font}  />
      </Editable.Root>
    );
  };

  const MultiChoice = ({ index }: { index: number }) => {
    const handleTextChange = (index: number, newText: string) => {
      setTexts((prevForm) =>
        prevForm.map((item, i) =>
          i === index ? newText : item
        )
      );
    };

    const addText = (text: string) => {
      const n = [];
      texts.map((item) => n.push(item));
      n.push(text);
      setTexts(n);
    };

    const RemoveText = () => {
      const n: string[] = [];
      texts.map((item) => n.push(item));
      n.pop();
      setTexts(n);
    };

    const handleRadioChange = () => {
      setForm((prevForm) =>
        prevForm.map((item, i) =>
          i === index ? { ...item, radioValues: texts } : item
        )
      );
    }

    const [texts, setTexts] = useState<string[]>(form[index].radioValues.length > 0 ? form[index].radioValues : ['Option 1', 'Option 2']);
    return (
      <Flex justify="space-between">
      <Stack gap={0}>
        <Button 
          onClick={() => {
            if (texts.length < 5) 
              addText('Option ' + (texts.length + 1));
          }}
          size="sm"
          padding={0}
          width={5}
          height={5}
          backgroundColor={backgroundColor}
          color="colorPalette.800"
        >+</Button>
        <Button 
          onClick={() => {
            if (texts.length > 2) 
              RemoveText();
          }}
          size="sm"
          padding={0}
          width={5}
          height={5}
          backgroundColor={backgroundColor}
          color="colorPalette.800"
        >-</Button>
      </Stack>
        <Stack>
          {texts.map((item, index) => (
            <Editable.Root 
              key={index}
              value={item}
              onValueChange={(e) => handleTextChange(index, e.value)}
              onValueCommit={() => handleRadioChange()}
              fontFamily={selectedFont} 
            >
              <Editable.Preview fontFamily={selectedFont} fontSize="xs" />
              <Editable.Input fontFamily={selectedFont} fontSize="xs" />
            </Editable.Root>
          ))}
        </Stack>
      </Flex>
    );
  };

  const navigate = useNavigate();

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="64" bg="colorPalette.900" color="white" p="6" display="flex" flexDir="column">
        <Heading size="md" mb="8">Form Builder</Heading>
        <VStack align="start" gap="4" flex="1">
          <Text fontWeight="medium">My Forms</Text>
          <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>My Answered Forms</Text>
          <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>Responses</Text>
          <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>Analytics</Text>
        </VStack>
        <Box mt="auto">
          <Button size="sm" opacity="0.8" _hover={{ opacity: 1 }} onClick={() => navigate('/')}>
            Homepage
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box w="80%" p="32px" bg="gray.50">
        <Heading size="md" mb="8px">Create New Form</Heading>
        <Text fontSize="sm" color="colorPalette.500" mb="24px">My Forms &gt;&gt; Create New Form</Text>

        <Flex gap="24px">
          {/* Form Section */}
          <Box bg="white" p="24px" rounded="md" boxShadow="md" w="60%" backgroundColor={backgroundColor}>
            <Editable.Root 
            value={title}
            onValueChange={(e) => setTitle(e.value)}
            fontFamily={selectedFont}
          >
            <Editable.Preview fontWeight="bold" fontFamily={selectedFont} fontSize="lg" />
            <Editable.Input fontWeight="bold" fontFamily={selectedFont} fontSize="lg" />
          </Editable.Root>

            <VStack align="stretch">
              {form.map((item, index) => (
                <Flex justify="space-between" key={index}>
                <Box>
                  <EditableText initialText={item.name} font={selectedFont} index={index} />
                  {item.type == "normal-text" || item.type == "password" || item.type == "email" ? 
                    <Input fontFamily={selectedFont} onChange={(e) => handleInitialValueChange(index, e.target.value)} /> : 
                    item.type == "paragraph" ? <Textarea fontFamily={selectedFont} onChange={(e) => handleInitialValueChange(index, e.target.value)} /> : 
                    item.type == "multi-choice" || item.type == "checkbox" || item.type == "dropdown" ? <MultiChoice index={index} /> : 
                    item.type == "time" || item.type == "date" ? <Input disabled width={150} placeholder={item.type} /> : <></>
                  }
                </Box>
                <Button 
                  onClick={() => {
                    removeItem(index);
                  }}
                  size="md"
                  padding={0}
                  width={5}
                  height={5}
                  backgroundColor={backgroundColor}
                  color="red"
                >x</Button>
                </Flex>
              ))}
              <Menu.Root positioning={{ placement: "bottom" }} onSelect={(details) => addItem(details.value)}>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm">
                    + Add New Field
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner width="20%">
                    <Menu.Content maxH="30vh">
                      <Menu.ItemGroup>
                        <Menu.ItemGroupLabel>Text</Menu.ItemGroupLabel>
                        <Menu.Item value="normal-text" onClick={() => {}}>Normal text</Menu.Item>
                        <Menu.Item value="password">Password</Menu.Item>
                        <Menu.Item value="email">Email</Menu.Item>
                        <Menu.Item value="paragraph">Paragraph</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup>
                        <Menu.ItemGroupLabel>Choice</Menu.ItemGroupLabel>
                        <Menu.Item value="multi-choice">Multiple Choice</Menu.Item>
                        <Menu.Item value="checkbox">Checkbox</Menu.Item>
                        <Menu.Item value="dropdown">Dropdown</Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup>
                        <Menu.ItemGroupLabel>Date and Time</Menu.ItemGroupLabel>
                        <Menu.Item value="time">Time</Menu.Item>
                        <Menu.Item value="date">Date</Menu.Item>
                      </Menu.ItemGroup>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </VStack>
          </Box>

          {/* Settings Panel */}
          <Box bg="white" p="24px" rounded="md" boxShadow="md" w="40%">
            <Box mb="24px">
              <Text mb="8px">Background Color</Text>
              <HStack gap="12px">
                {['white', 'yellow', 'green', 'purple', 'pink', 'gray'].map((color) => (
                  <Box
                    key={color}
                    w="20px"
                    h="20px"
                    borderRadius="full"
                    bg={color}
                    border="2px solid gray"
                    cursor="pointer"
                    onClick={() => setBackGroundColor(color)}
                  />
                ))}
              </HStack>
            </Box>

            <Box mb="24px">
              <Text mb="8px">Font Family</Text>
              <HStack gap="8px" wrap="wrap">
                {['Roboto', 'Ancizar Serif', 'Space Mono'].map((font) => (
                  <Button
                    key={font}
                    size="sm"
                    variant={selectedFont === font ? 'solid' : 'outline'}
                    fontFamily={font}
                    onClick={() => setSelectedFont(font)}
                  >
                    {font}
                  </Button>
                ))}
              </HStack>
            </Box>
          </Box>
        </Flex>

        <Button mt="32px" colorScheme="colorPalette" onClick={() => {handleCompleteForm();console.log(completeForm);}}>
          Publish Form
        </Button>
      </Box>
    </Flex>
  );
};

export default CNF;
