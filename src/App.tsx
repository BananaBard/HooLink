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
    <Layout>
      <Routes>
        <Route path={Pages.link} element={<RedirectPage />}></Route>
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
      </Routes>
    </Layout>
  );
}

export default App;
