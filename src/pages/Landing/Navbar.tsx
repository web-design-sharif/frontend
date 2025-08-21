import {
  Button,
  Box,
  Text,
  BoxProps,
  Link,
  Flex,
  Stack,
  Image,
  ButtonProps,
} from "@chakra-ui/react";
import { useState, ReactNode, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useAuth } from "../../hooks/useAuth";
import { getItem } from "../../utils/storage";

const handleScroll = (id: string) => {
  if (id == "") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.offsetTop - 110;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

const Logo: React.FC<BoxProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box {...props} onClick={() => navigate("/")}>
      <Image boxSize={{base: "50px", md: "75px"}} src="/Logo.jpg"/>
    </Box>
  );
};

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <RxCross2 size="32px" cursor="pointer" />
      ) : (
        <RxHamburgerMenu size="32px" cursor="pointer" />
      )}
    </Box>
  );
};


const MenuItem = ({
  children,
  to = "",
  ...rest
}: {
  children: ReactNode;
  to?: string;
}) => {
  return (
    <Link
      href={"#" + to}
      onClick={(e) => {
        e.preventDefault();
        handleScroll(to);
      }}
    >
      <Text display="block" {...rest} color="black">
        {children}
      </Text>
    </Link>
  );
};

const MenuButton = ({
  children,
  to = "/",
  ...props
}: { children: ReactNode; to?: string } & ButtonProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }}>
        <NavLink to={to}>
          <Text display="block">{children}</Text>
        </NavLink>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Button
          rounded="sm"
          height="56px"
          width="125px"
          fontSize="md"
          fontWeight="bold"
          borderWidth="2px"
          backgroundColor="colorPalette.400"
          onClick={to == '/logout' ? () => {logout(); window.location.reload();} : () => navigate(to)}
          {...props}
        >
          {children}
        </Button>
      </Box>
    </Box>
  );
};

const MenuLinks = ({ isOpen, ...props }: { isOpen: boolean }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }} // Use flex for horizontal layout
      flexBasis={{ base: "100%", md: "auto" }}
      justifyContent="space-between" // Space between MenuItems and Button
      alignItems="center" // Align items vertically in the center
      flexGrow={1}
    >
      <Stack
        align="center"
        justify={["center", "space-between", "space-between", "space-between"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        gap={{ base: "2", md: "8" }}
      >
        <MenuItem to="create" {...props}>
          Create
        </MenuItem>
        <MenuItem to="analyze" {...props}>
          Analyze
        </MenuItem>
        <MenuItem to="customize" {...props}>
          Customize
        </MenuItem>
        <MenuItem to="contact" {...props}>
          Contact Us
        </MenuItem>
      </Stack>
      <Stack
        align="center"
        justify={["center", "space-between", "flex-start", "flex-start"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        gap={{ base: "2", md: "6" }}
      >
        <MenuButton
          to={!!getItem('jwt') ? "/forms" : "/login"}
          variant="outline"
          borderColor="colorPalette.400"
          borderWidth="medium"
          color="colorPalette.400"
          backgroundColor="white"
        >
          {!!getItem('jwt') ? "Dashboard" : "Sign In"}
        </MenuButton>
        <MenuButton to={!!getItem('jwt') ? "/logout" : "/signup"}>{!!getItem('jwt') ? "Logout" : "Sign Up"}</MenuButton>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, isScrolled = false, ...props }: { children: ReactNode; isScrolled?: boolean; }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      backgroundColor="white"
      padding="1.5% 10% 0.75% 10%"
      bg={
        isScrolled
          ? "rgba(230, 230, 230, 0.8)" // translucent white
          : "white"
      }
      // color={
      //   isScrolled
      //     ? "primary.700"
      //     : ["white", "white", "primary.700", "primary.700"]
      // }
      // boxShadow={isScrolled ? "0 4px 12px rgba(255, 255, 255, 0.8)" : "none"}
      backdropFilter={isScrolled ? "saturate(200%) blur(20px)" : "none"}
      borderBottom="1.5px solid"
      borderColor={isScrolled ? "rgba(25, 224, 224, 0.2)" : "transparent"}
      transition="all 0.3s ease, border-color 0.15s ease"
      {...props}
    >
      {children}
    </Flex>
  );
};

const NavBar: React.FC<BoxProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return ( 
    <NavBarContainer isScrolled={isScrolled} {...props}>
      <Box display="flex" alignContent="center">
        <Logo
          color={["white", "white", "primary.500", "primary.500"]}
          onClick={(e) => {
            e.preventDefault();
            handleScroll("");
          }}
          cursor="pointer"
          _hover={{
            opacity: 0.8,
          }}
        />
        <Box
          h="70px"
          w="1px"
          // bg="colorPalette.400"
          mx={6}
          display={{ base: "none", md: "block" }}
        />
      </Box>

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default NavBar;
