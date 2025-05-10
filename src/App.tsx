import Landing from './pages/Landing';
import { Routes, Route, Outlet, BrowserRouter } from "react-router";
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
