import {
  Heading,
  Text,
  Stack,
  StackProps,
  Flex,
  Image,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { keyframes } from "@emotion/react";

const cardWidth = 210;


const About: React.FC<StackProps> = (props) => {
  const items = [
    {
      imagePath: "team/default.png",
      name: "Hossein",
      lastName: "Aghaei",
    },
    {
      imagePath: "team/default.png",
      name: "Mohammad Hasan",
      lastName: "Bayatiani",
    },
    {
      imagePath: "team/default.png",
      name: "Hoora",
      lastName: "Abedin",
    },
    {
      imagePath: "team/default.png",
      name: "Amirhossein",
      lastName: "Salami",
    },
    {
      imagePath: "team/default.png",
      name: "Amirhossein",
      lastName: "Mohammadpour",
    },
    {
      imagePath: "team/default.png",
      name: "Omid",
      lastName: "Heidari",
    },
    {
      imagePath: "team/default.png",
      name: "Aref",
      lastName: "Zarezadeh",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollNeg = keyframes`
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  `;

  return (
    <Stack width="100%" textAlign="center" gap={4} backgroundColor="colorPalette.300" padding="10pt 0" {...props}>
      <Heading size="4xl" fontWeight="bold">
        About Us
      </Heading>
      <Text fontSize="lg" padding="0 10%">
        This webpage was made by us.
      </Text>
      <Flex
        ref={containerRef}
        gap={4}
        overflow="hidden"
        position="relative"
        justifyContent="flex-start"
        width="100%"
      >
        <Box
          display="inline-block"
          whiteSpace="nowrap"
          animation={`${scrollNeg} 20s linear infinite`}
          paddingY={10}
        >
          {[...items, ...items].map((item, index) => (
            <TeamMemberItem
              key={index}
              imagePath={item.imagePath}
              name={item.name}
              lastName={item.lastName}
            />
          ))}
        </Box>
      </Flex>
    </Stack>
  );
};

const TeamMemberItem: React.FC<
  { imagePath: string; name: string, lastName: string } & BoxProps
> = ({ imagePath, name, lastName, ...props }) => {
  return (
    <Box
      width={cardWidth}
      backgroundColor="white"
      w={{base: "180px", md: "270px"}}
      color="colorPalette.800"
      alignItems="center"
      display="inline-block"
      mx={4}
      {...props}
    >
      <Image src={imagePath} w={{base: "180px", md: "270px"}} h={{base: "180px", md: "270px"}} />
      <Heading fontWeight="bold" fontSize="2xl" mt={5} h={10} >
        {name}
      </Heading>
      <Heading fontWeight="bold" fontSize="2xl" h={10} >
        {lastName}
      </Heading>
      
      <Box w="100%" backgroundColor="colorPalette.600" h={2} filter="blur(1px)"/>
    </Box>
  );
};

export default About;
