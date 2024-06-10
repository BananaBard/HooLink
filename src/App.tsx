import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Pages from "./utils/pages.utils";
import RedirectPage from "./pages/Redirect";

function App() {
  return (
    <Routes>
      <Route path={Pages.link} element={<RedirectPage />}></Route>
      
      <Route element={<Layout/>}>
        <Route path={Pages.home} element={<LandingPage />} />
        <Route path={Pages.login} element={<Login />} />
        <Route
          path={Pages.dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
