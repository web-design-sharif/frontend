import { PasswordInput } from "../../components/ui/password-input";
import { Flex, Input, Stack, Textarea, Text, Box, VStack, Heading, RadioGroup, HStack, Checkbox, Select, For, Portal, createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";


const form = {
  "id": 4,
  "name": "Untitled Form",
  "bgColor": "white",
  "font": "Ancizar Serif",
  "questions": [
    {type: "normal-text", initialValue: "na1", name: 'question 1', radioValues: []},
    {type: "password", initialValue: "na2", name: 'question 2', radioValues: []},
    {type: "email", initialValue: "na3", name: 'question 3', radioValues: []},
    {type: "textarea", initialValue: "na4", name: 'question 4', radioValues: []},
    {type: "multi-choice", initialValue: "na4", name: 'question 5', radioValues: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']},
    {type: "checkbox", initialValue: "na4", name: 'question 6', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
    {type: "dropdown", initialValue: "na4", name: 'question 7', radioValues: ['option 1', 'option 2', 'option 4']},
    {type: "time", initialValue: "na3", name: 'question 8', radioValues: []},
    {type: "date", initialValue: "na4", name: 'question 9', radioValues: []},
  ],
  "owner_id": "4f50",
  "updated": "Now",
  "responses": 1
};

type FormItem = {
  name: string;
  type: string;
  initialValue?: string;
  radioValues: string[]
};

const InputBuilder = ({ item }: { item: FormItem }) => {
  return (
    <Flex>
      {item.type == "normal-text" ? <Input placeholder={item.initialValue} fontFamily={form.font} /> :
        item.type == "password" ? <PasswordInput placeholder={item.initialValue} fontFamily={form.font} /> : 
        <Textarea placeholder={item.initialValue} fontFamily={form.font} />
      }
    </Flex>
  );
};

const EmailInputWithValidation = ({ item }: { item: FormItem }) => {
  const [email, setEmail] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  useEffect(() => {
    setValid(email.includes("@") && email.includes('.'));
  }, [email])

  return (
    <Stack gap={0}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={item.initialValue}
        fontFamily={form.font}
      />
      <Text color="colorPalette.400" fontSize="x-small" fontFamily={form.font}>{valid ? "" : "Invalid Email"}</Text>
    </Stack>
  );
};

const RadioBuilder = ({ item }: { item: FormItem }) => {
  return (
    <RadioGroup.Root defaultValue="1">
      <HStack gap="6">
        {item.radioValues.map((r, i) => (
          <RadioGroup.Item key={i} value={r}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText fontFamily={form.font}>{r}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  );
};

const CheckBoxBuilder = ({ item }: { item: FormItem }) => {
  return (
    <HStack gap="6">
      {item.radioValues.map((r, i) => (
        <Checkbox.Root key={i}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        <Checkbox.Label fontFamily={form.font}>{r}</Checkbox.Label>
      </Checkbox.Root>
      ))}
    </HStack>
  );
};




const DropdownBuilder = ({ item }: { item: FormItem }) => {
  const frameworks = createListCollection({
    items: item.radioValues,
  });
  return (
    <HStack gap="6">
      <Select.Root collection={frameworks} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select an item" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework} fontFamily={form.font}>
                {framework}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
    </HStack>
  );
};

const QuestionBuilder = ({ item }: { item: FormItem }) => {
  const t = item.type;
  return (
    <Box>
      <Heading size="md" mb={1} fontFamily={form.font}>{item.name}</Heading>
      {t == "normal-text" || t == "password" || t == "textarea" ? <InputBuilder item={item} /> :
      t == "email" ? <EmailInputWithValidation item={item}/> : 
      t == "multi-choice" ? <RadioBuilder item={item} /> : 
      t == "checkbox" ? <CheckBoxBuilder item={item} /> : 
      t == "dropdown" ? <DropdownBuilder item={item} /> :
      t == "time" || t == "date" ? <Input type={t} fontFamily={form.font} /> : <></> }
    </Box>
  );
};

const FormFiller = () => {
  const x = [
    {type: "normal-text", initialValue: "na1", name: 'question 1', radioValues: []},
    {type: "password", initialValue: "na2", name: 'question 2', radioValues: []},
    {type: "email", initialValue: "na3", name: 'question 3', radioValues: []},
    {type: "textarea", initialValue: "na4", name: 'question 4', radioValues: []},
    {type: "multi-choice", initialValue: "na4", name: 'question 5', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
    {type: "checkbox", initialValue: "na4", name: 'question 6', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
    {type: "dropdown", initialValue: "na4", name: 'question 7', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
    {type: "time", initialValue: "na3", name: 'question 8', radioValues: []},
    {type: "date", initialValue: "na4", name: 'question 9', radioValues: []},
  ]
  return (
    <Box my="5%">
      <Flex justify="center" rounded="md">
      <Stack boxShadow="md" gap={5} padding={10}>
        <Heading fontFamily={form.font}>{form.name}</Heading>
        <QuestionBuilder item={x[0]} />
        <QuestionBuilder item={x[1]} />
        <QuestionBuilder item={x[2]} />
        <QuestionBuilder item={x[3]} />
        <QuestionBuilder item={x[4]} />
        <QuestionBuilder item={x[5]} />
        <QuestionBuilder item={x[6]} />
        <QuestionBuilder item={x[7]} />
        <QuestionBuilder item={x[8]} />
      </Stack>
    </Flex>
    </Box>
  );
};

export default FormFiller;