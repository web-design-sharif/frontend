import { PasswordInput } from "../../components/ui/password-input";
import { Flex, Input, Stack, Textarea, Text, Box, VStack, Heading, RadioGroup, HStack, Checkbox, Select, For, Portal, createListCollection, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router";
import { AnswerOption, FormResponse, Question, QuestionType } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import { useSubmit } from "../../hooks/useSubmit";


// let form = {
//   "id": 4,
//   "name": "Untitled Form",
//   "bgColor": "white",
//   "font": "Ancizar Serif",
//   "questions": [
//     {type: "normal-text", initialValue: "na1", name: 'question 1', radioValues: []},
//     {type: "password", initialValue: "na2", name: 'question 2', radioValues: []},
//     {type: "email", initialValue: "na3", name: 'question 3', radioValues: []},
//     {type: "textarea", initialValue: "na4", name: 'question 4', radioValues: []},
//     {type: "multi-choice", initialValue: "na4", name: 'question 5', radioValues: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']},
//     {type: "checkbox", initialValue: "na4", name: 'question 6', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
//     {type: "dropdown", initialValue: "na4", name: 'question 7', radioValues: ['option 1', 'option 2', 'option 4']},
//     {type: "time", initialValue: "na3", name: 'question 8', radioValues: []},
//     {type: "date", initialValue: "na4", name: 'question 9', radioValues: []},
//   ],
//   "owner_id": "4f50",
//   "updated": "Now",
//   "responses": 1
// };

const DEFAULT_FONT = 'Roboto';




// type FormItem = {
//   name: string;
//   type: string;
//   initialValue?: string;
//   radioValues: string[]
// };

const InputBuilder = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  return (
    <Flex>
      {item.questionType == QuestionType.NORMAL_TEXT ? <Input placeholder={/*item.initialValue*/''} fontFamily={/*form.font*/ DEFAULT_FONT} onChange={(e) => setAnswer(e.target.value, [])} /> :
        item.questionType == QuestionType.PASSWORD ? <PasswordInput placeholder={/*item.initialValue*/''} fontFamily={/*form.font*/ DEFAULT_FONT} onChange={(e) => setAnswer(e.target.value, [])} /> : 
        <Textarea placeholder={/*item.initialValue*/''} fontFamily={/*form.font*/ DEFAULT_FONT} onChange={(e) => setAnswer(e.target.value, [])} />
      }
    </Flex>
  );
};

const EmailInputWithValidation = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  useEffect(() => {
    setValid(email.includes("@") && email.includes('.'));
  }, [email]);

  return (
    <Stack gap={0}>
      <Input
        type="email"
        value={email}
        onChange={(e) => {setEmail(e.target.value); setAnswer(e.target.value, []);}}
        placeholder={/*item.initialValue*/''}
        // fontFamily={form ? (form.font ? form.font : '') : 'Ancizar Serif'}
        fontFamily={DEFAULT_FONT}
      />
      <Text color="colorPalette.400" fontSize="x-small" fontFamily={/*form.font*/ DEFAULT_FONT}>{valid ? "" : "Invalid Email"}</Text>
    </Stack>
  );
};

const RadioBuilder = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  return (
    <RadioGroup.Root defaultValue="1">
      <HStack gap="6">
        {item.options.map((r, i) => (
          <RadioGroup.Item key={i} value={r.optionText} onClick={() => {setAnswer(r.optionText, [i])}}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText fontFamily={/*form.font*/ DEFAULT_FONT}>{r.optionText}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  );
};

const CheckBoxBuilder = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  const [checks, setChecks] = useState<boolean[]>(Array(item.options.length).fill(false));
  const changeVal = (checked: string | boolean, index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !!checked;
    setChecks(newChecks);
    const tmp: number[] = [];
    newChecks.forEach((value, index) => {if (value) tmp.push(index)});
    setAnswer('', tmp);
  }
  return (
    <HStack gap="6">
      {item.options.map((r, i) => (
        <Checkbox.Root key={i} onCheckedChange={(e) => changeVal(e.checked, i)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        <Checkbox.Label fontFamily={/*form.font*/ DEFAULT_FONT}>{r.optionText}</Checkbox.Label>
      </Checkbox.Root>
      ))}
    </HStack>
  );
};




const DropdownBuilder = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  const t: string[] = [];
  item.options.map((framework) => {
    t.push(framework.optionText);
  })
    const frameworks = createListCollection({
    items: t,
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
            {frameworks.items.map((framework, index) => (
              <Select.Item item={framework} key={index} fontFamily={/*form.font*/ DEFAULT_FONT} onClick={() => {setAnswer(framework, [index])}}>
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

const QuestionBuilder = ({ item, setAnswer }: { item: Question; setAnswer: (ans: string, opt: number[]) => void }) => {
  const t = item.questionType;
  return (
    <Box>
      <Heading size="md" mb={1} fontFamily={/*form.font*/ DEFAULT_FONT}>
        <Text display="inline" color="colorPalette.600">{(item.isRequired ? '*' : '')}</Text>
        {item.title}
      </Heading>
      {t == QuestionType.NORMAL_TEXT || t == QuestionType.PASSWORD || t == QuestionType.TEXT_AREA ? <InputBuilder item={item} setAnswer={setAnswer} /> :
      t == QuestionType.EMAIL ? <EmailInputWithValidation item={item} setAnswer={setAnswer} /> : 
      t == QuestionType.MULTI_CHOICE ? <RadioBuilder item={item} setAnswer={setAnswer} /> : 
      t == QuestionType.CHECKBOX ? <CheckBoxBuilder item={item} setAnswer={setAnswer} /> : 
      t == QuestionType.DROPDOWN ? <DropdownBuilder item={item} setAnswer={setAnswer} /> :
      t == QuestionType.TIME || t == QuestionType.DATE ? <Input type={t.toString().toLowerCase()} fontFamily={/*form.font*/ DEFAULT_FONT} onChange={(e) => {setAnswer(e.target.value, [])}} /> : <></> }
    </Box>
  );
};

const FormFiller = () => {
  // const x = [
  //   {type: "normal-text", initialValue: "na1", name: 'question 1', radioValues: []},
  //   {type: "password", initialValue: "na2", name: 'question 2', radioValues: []},
  //   {type: "email", initialValue: "na3", name: 'question 3', radioValues: []},
  //   {type: "textarea", initialValue: "na4", name: 'question 4', radioValues: []},
  //   {type: "multi-choice", initialValue: "na4", name: 'question 5', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
  //   {type: "checkbox", initialValue: "na4", name: 'question 6', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
  //   {type: "dropdown", initialValue: "na4", name: 'question 7', radioValues: ['option 1', 'option 2', 'option 3', 'option 4']},
  //   {type: "time", initialValue: "na3", name: 'question 8', radioValues: []},
  //   {type: "date", initialValue: "na4", name: 'question 9', radioValues: []},
  // ]

  const { form } = useFormContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { submitForm } = useSubmit();
  const [error, setError] = useState<string>('');

  if (form == null) {
    navigate('/forms');
    return;
  }

  if (user == null) {
    navigate('/');
    return;
  }

  
  const [formResponse, setFormResponse] = useState<FormResponse>({
    id: 0,
    formId: form.id,
    responderId: user.id,
    answers: form.question.map((item) => ({id: 0, questionId: item.id, answerText: '', answerOptions: []}))
  });


  const giveAnswer = (qnum: number, ans: string, opt: number[]) => {
    setFormResponse(prev => {
      const tmpAns = prev.answers;
      tmpAns[qnum].answerText = ans;
      const tmpOp: AnswerOption[] = [];
      opt.forEach((value) => {tmpOp.push({ id: 0, optionId: form.question[qnum].options[value].id })});
      tmpAns[qnum].answerOptions = tmpOp;
      return {id: 0, formId: prev.formId, responderId: prev.responderId, answers: tmpAns };
    });
  };

  const giveSpecificAnswer = (f: (qnum: number, ans: string, opt: number[]) => void) => {
    return (qnum: number) => (ans: string, opt: number[]) => f(qnum, ans, opt);
  };

  const handleSubmit = () => {
    let s: boolean = true;
    formResponse.answers.forEach((answer, index) => {
      if ((answer.answerText == null || answer.answerText == '') && form.question[index].isRequired && answer.answerOptions.length == 0) {
        setError('you havent\'t answered required questions, like the question no. ' + (index + 1));
        s = false;
        return;
      }
    });
    if (s) {
      submitForm(formResponse).then((success) => {
        if (success)
          navigate('/forms');
      });
    }
    

  };

  return (
    <Box my="5%">
      <Flex justify="center" rounded="md">
        <Stack boxShadow="md" gap={5} padding={10} w="80%">
          <Heading fontFamily={/*form.font*/ DEFAULT_FONT} fontSize="3xl">{form.title}</Heading>
          {form.question.map((item, index) => (
            <QuestionBuilder key={index} item={item} setAnswer={giveSpecificAnswer(giveAnswer)(index)} />
          ))}
          <Stack>
          <Flex justify="flex-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </Flex>
          <Text fontSize="xs" color="colorPalette.400">{error}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default FormFiller;