import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Title from "./Title";
import Create from "./Create";
import Customize from "./Customize";
import Analyze from "./Analyze";
import About from "./About";
import Footer from "./Footer";

const Landing = () => {
  return (
    <Box>
      <Navbar />
      <Title />
      <Create />
      <Analyze />
      <Customize />
      <About />
      <Footer />
    </Box>
  );
};

export default Landing;