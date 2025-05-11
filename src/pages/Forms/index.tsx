import { Box } from "@chakra-ui/react";
import { useAuth } from '../../hooks/useAuth';

const MyForms = () => {
  const { user, logout } = useAuth();
  return (
    <Box>
      Hello {user?.email}
    </Box>
  );
};

export default MyForms;