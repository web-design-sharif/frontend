import Landing from './pages/Landing';
import { Routes, Route, Outlet, BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
