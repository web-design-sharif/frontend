import { useGetResponses } from "../../hooks/useGetResponses";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { BarList, BarListData, Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { Question, QuestionType } from "../../types";
import { Box, Button, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { color } from "@chakra-ui/styled-system";
import { Cursor } from "recharts/types/component/Cursor";
import { getItem } from "../../utils/storage";

interface ChartInfo {
  question: Question;
  answerTexts: string[];
  selectedOptions?: number[];
  count?: number;
}

interface ResponseInfo {
  question: Question;
  answerTexts: string[];
}

const infoToData = (info: ChartInfo) => {
  const frequency = new Map<string, number>();
  for (const item of info.answerTexts)
    frequency.set(item, (frequency.get(item) || 0) + 1);
  const data: { name: string; value: number }[] = Array.from(frequency.entries()).map(
    ([key, count]) => ({
      name: key,
      value: count,
    })
  );

  return data;
}

const ShowList = ({ info } : { info: ChartInfo }) => {
  return (
    // <Stack padding={4} gap={4} backgroundColor="white">
    //   <Heading size="3xl" >{info.question.title}</Heading>
      <Box height="300px" overflow="auto" backgroundColor="white" padding={4}>
        <Stack gap={1}>
          {info.answerTexts.map((ans, ind) => <Flex backgroundColor="colorPalette.100" padding={2} rounded="md" key={ind}><Text>{ans}</Text></Flex>)}
        </Stack>
      </Box>
    // </Stack>
  );
}


const ShowBarListChart = ({ info } : { info: ChartInfo }) => {
  const data = infoToData(info);
  let maxFrequency = Math.max(...data.map(item => item.value));

  const [viewList, setViewList] = useState<boolean>(maxFrequency != 1);

  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: data,
    series: [{ name: "name", color: "teal.subtle" }],
  });

  const getPercent = (value: number) => 
    chart.getValuePercent("value", value).toFixed(1);

  return (
    <Stack padding={4} gap={4} backgroundColor="white" rounded="md" shadow="sm" overflowX="auto">
      <Flex justify="space-between">
        <Heading size="3xl" >{info.question.title}</Heading>
        <Button onClick={() => setViewList(!viewList)}>change</Button>
      </Flex>
      {
        viewList ? <ShowList info={info} /> :
        <Box height="300px" overflow="auto" padding={4}>
          <BarList.Root chart={chart}>
            <BarList.Content>
              <BarList.Bar />
              <BarList.Value valueFormatter={(value) => `${value} (${getPercent(value)}%)`} />
            </BarList.Content>
          </BarList.Root>
        </Box>
      }
    </Stack>
  );
};

const ShowPieChart = ({ info } : { info: ChartInfo }) => {
  const data = infoToData(info);
  let maxFrequency = Math.max(...data.map(item => item.value));

  const [viewList, setViewList] = useState<boolean>(maxFrequency == 1);

  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: data,
    series: [{ name: "name", color: "teal.subtle" }],
  });

  const colors = ["blue.solid", "orange.solid", "pink.solid", "green.solid", "yellow.solid"]

  return (
    <Stack padding={4} gap={4} backgroundColor="white" rounded="md" shadow="sm" overflowX="auto">
      <Flex justify="space-between">
        <Heading size="3xl" >{info.question.title}</Heading>
        <Button onClick={() => setViewList(!viewList)}>change</Button>
      </Flex>
      {
        viewList ? <ShowList info={info} /> :
        <Box padding={4}>
          <Chart.Root boxSize="320px" mx="auto" chart={chart}>
            <PieChart>
              <Tooltip
                cursor={false}
                animationDuration={100}
                content={<Chart.Tooltip hideLabel />}
              />
              <Pie
                isAnimationActive={false}
                data={chart.data}
                dataKey={chart.key("value")}
                labelLine={{ stroke: chart.color("border.emphasized") }}
                label={{
                  fill: chart.color("fg.muted"),
                  style: { fontWeight: "600" },
                }}
              >
                {chart.data.map((item, index) => (
                  <Cell key={item.name} fill={chart.color(colors[index % colors.length])} />
                ))}
              </Pie>
            </PieChart>
          </Chart.Root>
        </Box>
      }
    </Stack>
  );
}

const ShowBarChart = ({ info } : { info: ChartInfo }) => {
  const data: { name: string; value: number; }[] = [];
  info.selectedOptions?.forEach((value, index) => {
    data.push({"name": info.question.options[index].optionText, "value": value});
  });
  if (!info.count)
    return <></>;
  const countOfData: number = info.count;

  const chart = useChart<BarListData>({
    // sort: { by: "value", direction: "desc" },
    data: data,
    series: [{ name: "value", color: "teal.subtle" }],
  });

  const [viewList, setViewList] = useState<boolean>(/*maxFrequency == 1*/ false);

  return (
    <Stack padding={4} gap={4} backgroundColor="white" rounded="md" shadow="sm" overflowX="auto">
      <Flex justify="space-between">
        <Heading size="3xl" >{info.question.title}</Heading>
        {/* <Button onClick={() => setViewList(!viewList)}>change</Button> */}
      </Flex>
      {
        viewList ? <ShowList info={info} /> :
        <Box padding={4}>
          <Chart.Root maxH="sm" chart={chart}>
            <BarChart data={chart.data}>
              <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey={chart.key("name")}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                dataKey={chart.key("value")}
                tickFormatter={(value) => `${parseFloat(((value / countOfData) * 100).toFixed(2))}%`}
              />
              <Tooltip
                cursor={{ fill: chart.color("bg.muted") }}
                animationDuration={0}
                content={<Chart.Tooltip />}
              />
              {chart.series.map((item, index) => (
                <Bar
                  isAnimationActive={false}
                  key={item.name}
                  dataKey={chart.key(item.name)}
                  fill={chart.color('colorPalette.500')}
                />
              ))}
            </BarChart>
          </Chart.Root>
        </Box>
      }
    </Stack>
  );
}

const ShowChart = ({ info } : { info: ChartInfo }) => {
  switch (info.question.questionType) {
    case QuestionType.NORMAL_TEXT: return (<ShowBarListChart info={info} />);
    case QuestionType.PASSWORD: return (<ShowBarListChart info={info} />);
    case QuestionType.EMAIL: return (<ShowBarListChart info={info} />);
    case QuestionType.TEXT_AREA: return (<ShowBarListChart info={info} />);
    case QuestionType.MULTI_CHOICE: return (<ShowPieChart info={info} />);
    case QuestionType.CHECKBOX: return (<ShowBarChart info={info} />);
    case QuestionType.DROPDOWN: return (<ShowPieChart info={info} />);
    case QuestionType.DATE: return (<ShowBarListChart info={info} />);
    case QuestionType.TIME: return (<ShowBarListChart info={info} />);
    default: return (<></>);
  }
};

const ShowSingleResponse = ({ info }: { info: ResponseInfo }) => {
  return (
    <Stack padding={4} gap={4} backgroundColor="white" rounded="md" shadow="sm" overflowX="auto">
      <Heading size="3xl" >{info.question.title}</Heading>
      <Flex shadow="sm" backgroundColor="colorPalette.100" padding={2} rounded="md">
        <Text>{info.answerTexts[0] != '' ? info.answerTexts[0] : '\n'}</Text>
      </Flex>
    </Stack>
  );
};

const ShowMultipleResponse = ({ info }: { info: ResponseInfo }) => {
  return (
    <Stack padding={4} gap={4} backgroundColor="white" rounded="md" shadow="sm" overflowX="auto">
      <Heading size="3xl" >{info.question.title}</Heading>
      <Flex justify="space-between">
        {info.question.options.map((opt, index) => (
          <Flex shadow="sm" backgroundColor={info.answerTexts.includes(opt.optionText) ? "green.200" : "colorPalette.100"} padding={2} rounded="md" key={index} minW="20%" justify="center"><Text>{opt.optionText}</Text></Flex>
        ))}
      </Flex>
    </Stack>
  );
};

const ShowResponse = ({ responseInfo }: { responseInfo: ResponseInfo }) => {
  switch (responseInfo.question.questionType) {
    case QuestionType.NORMAL_TEXT: return (<ShowSingleResponse info={responseInfo} />);
    case QuestionType.PASSWORD: return (<ShowSingleResponse info={responseInfo} />);
    case QuestionType.EMAIL: return (<ShowSingleResponse info={responseInfo} />);
    case QuestionType.TEXT_AREA: return (<ShowSingleResponse info={responseInfo} />);
    case QuestionType.MULTI_CHOICE: return (<ShowMultipleResponse info={responseInfo} />);
    case QuestionType.CHECKBOX: return (<ShowMultipleResponse info={responseInfo} />);
    case QuestionType.DROPDOWN: return (<ShowMultipleResponse info={responseInfo} />);
    case QuestionType.DATE: return (<ShowSingleResponse info={responseInfo} />);
    case QuestionType.TIME: return (<ShowSingleResponse info={responseInfo} />);
    default: return (<></>);
  }
}

const Sidebar = ({ viewForm, setVeiwForm } : { viewForm: string, setVeiwForm: (view: string) => void }) => {
  const navigate = useNavigate();
  return (
    <Box w="64" bg="colorPalette.900" color="white" p="6" display="flex" flexDir="column" position="fixed" height="100vh">
      <Heading size="md" mb="8">Form Builder</Heading>
      <VStack align="start" gap="4" flex="1">
        <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }} fontWeight="medium" onClick={() => navigate('/forms')}>My Forms</Text>
        {/* <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }} paddingLeft={5}>Responses</Text> */}
        <Text opacity={viewForm == 'analyze' ? "1" : "0.8"} _hover={{ opacity: 1, cursor: 'pointer' }} paddingLeft={5} onClick={() => setVeiwForm('analyze')}>Analytics</Text>
        <Text opacity={viewForm == 'response' ? "1" : "0.8"} _hover={{ opacity: 1, cursor: 'pointer' }} paddingLeft={5} onClick={() => setVeiwForm('response')}>Responses</Text>
        {/* <Text opacity="0.8" _hover={{ opacity: 1, cursor: 'pointer' }}>My Answered Forms</Text> */}
      </VStack>
      <Box mt="auto">
        <Button size="sm" onClick={() => navigate('/')}>
          Homepage
        </Button>
      </Box>
    </Box>
  );
}

const Analyze = () => {
  const { form } = useForm();
  const { allResponses } = useGetResponses();
  console.log(allResponses);
  const [viewForm, setVeiwForm] = useState<string>('analyze');
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);

  if (!form || !getItem('jwt'))
    return <></>;

  const tmp: ChartInfo = {
    question: form.question[0],
    answerTexts: ['answer 1', 'answer 2', 'answer 1', 'answer 1', 'answer 5', 'answer 6', 'answer 1', 'answer 2', 'answer 9', 'answer 9', 'answer 11', 'answer 8', 'answer 13', 'answer 8', 'answer 15', ]
  }

  const allInfo: ChartInfo[] = [];
  form.question.forEach((question) => {
    if (question.questionType != QuestionType.CHECKBOX)
      allInfo.push({question: question, answerTexts: []})
    else
      allInfo.push({question: question, answerTexts: [], selectedOptions: Array(question.options.length).fill(0), count: 0})
  });

  allResponses.forEach((response) => {
    response.answers.forEach((answer) => {
      allInfo.forEach((info) => {
        if (info.question.id == answer.questionId) {
          if (answer.answerText)
            info.answerTexts.push(answer.answerText);
          if (info.question.questionType == QuestionType.CHECKBOX && info.count != undefined) {
            answer.answerOptions.forEach((selOpt) => {
              info.question.options.forEach((opt, optIndex) => {
                if (selOpt.optionId == opt.id && info.selectedOptions)
                  info.selectedOptions[optIndex] += 1;
              })
            });
            if (answer.answerOptions.length > 0)
              info.count += 1;
          }
        }
      });
    });
  });
  
  const responseInfo: ResponseInfo[] = [];

  form.question.forEach((q, index) => {
    responseInfo.push({question: q, answerTexts: []});
  });

  if (allResponses.length > 0) {
    allResponses[currentUserIndex].answers.forEach((ans, index) => {
      responseInfo.forEach((ri, riIndex) => {
        if (ri.question.id == ans.questionId) {
          if (ans.answerText == '' && ans.answerOptions.length > 0) {
            ri.question.options.forEach((opt, optInd) => {
              ans.answerOptions.forEach((ao) => {
                if (ao.optionId == opt.id) {
                  ri.answerTexts.push(opt.optionText);
                }
              })
            });
          } else {
            ri.answerTexts = [ans.answerText];
          }
        }
      });
    });
  }

  
  console.log(responseInfo)


  return (
    <Flex minH="100vh">
      <Sidebar setVeiwForm={setVeiwForm} viewForm={viewForm} />
      {viewForm == 'analyze' ? <Stack flex="1" bg="gray.100" p="8" overflowY="auto" gap={5} marginLeft="64">
        {allInfo.map((info, index) => <ShowChart info={info} key={index}/>)}
        {/* <ShowBarListChart info={tmp} />
        <ShowPieChart info={tmp} />
        <ShowBarChart info={tmp} /> */}
        
      </Stack> : <Stack flex="1" bg="gray.100" p="8" overflowY="auto" gap={5} marginLeft="64">
        <Flex justify="center" gap={4}>
          <Text 
            onClick={() => setCurrentUserIndex(currentUserIndex - 1 < 0 ? 0 : currentUserIndex - 1)}
            backgroundColor="transparent" 
            color="black"
            padding={0}
            margin={0}
            _hover={{cursor: "pointer"}}
            userSelect="none"
          >
            {'<'}
          </Text>
          
          <Text>Answer {currentUserIndex + 1} out of {allResponses.length}</Text>

          

          <Text 
            onClick={() => setCurrentUserIndex(currentUserIndex + 1 >= allResponses.length ? currentUserIndex : currentUserIndex + 1)}
            backgroundColor="transparent" 
            color="black"
            padding={0}
            margin={0}
            _hover={{cursor: "pointer"}}
            userSelect="none"
          >
            {'>'}
          </Text>
        </Flex>
        {responseInfo.map((ri, index) => <ShowResponse responseInfo={ri} key={index} />)}
      </Stack>}

      
    </Flex>
  );
}

export default Analyze;