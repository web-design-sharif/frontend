import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FaTelegramPlane } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  return (
    <Box backgroundColor="colorPalette.800" marginTop="60px" paddingLeft="5%" paddingY={5} >
      <Flex paddingX="5%" justify="space-between" color="white" alignItems="center">
        <Text fontSize="sm">
          Empowering your data collection — one form at a time.
        </Text>
        <Flex gap={5} alignItems="center">
          <Text fontSize="sm">
            Follow us on
          </Text>
          
          <Link href="https://t.me/+o96Pru8SRcRmZTI0" _hover={{opacity: 0.8}}color="white">
            <FaTelegramPlane size={28} />
          </Link>
          <Link href="mailto:arefzarezade@gmail.com" _hover={{opacity: 0.8}}color="white">
            <SiGmail size={28} />
          </Link>
          
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;