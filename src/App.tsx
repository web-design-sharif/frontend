import Landing from './pages/Landing';
import { Routes, Route, Outlet, BrowserRouter, Navigate } from "react-router";
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import { useAuth } from './hooks/useAuth';
import MyForms from './pages/Forms';
import CNF from './pages/createNewForm/CNF';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
          <Route path="/forms" element={isLoggedIn ? <MyForms /> : <Navigate to="/login" />} />
          <Route path="/create" element={<CNF />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
