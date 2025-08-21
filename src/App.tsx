import Landing from './pages/Landing';
import { Routes, Route, Outlet, BrowserRouter, Navigate } from "react-router";
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import { useAuth } from './hooks/useAuth';
import MyForms from './pages/Forms';
import CNF from './pages/createNewForm/CNF';
import FormFiller from './pages/fill';
import Analyze from './pages/analyze';
import { Flex, Spinner } from '@chakra-ui/react';
import { getItem } from './utils/storage';

function App() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return (
    <Flex h="100vh" w="100vw" justify="center" align="center"><Spinner size="xl" /></Flex>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path="/forms" element={!!getItem('jwt') ? <MyForms /> : <Navigate to="/login" />} />
        <Route path="/create" element={!!getItem('jwt') ? <CNF /> : <Navigate to="/login" />} />
        <Route path="/fill" element={!!getItem('jwt') ? <FormFiller /> : <Navigate to="/login" />} />
        <Route path="/analyze" element={!!getItem('jwt') ? <Analyze /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
