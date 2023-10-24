import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyContextProvider, { MyContext } from "./contexts/MyContext";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function WithAuthentication({ children }) {
  const { rootState } = useContext(MyContext);
  const { isAuth } = rootState;
  return isAuth ? (
    children
  ) : (
    <Navigate to={`${import.meta.env.VITE_REACT_APP_PATH}`} replace />
  );
}


const App = () => {
  return (
    <MyContextProvider>
        <div>
          <Routes>
            <Route path={`${import.meta.env.VITE_REACT_APP_PATH}`} element={<Home />} />
            <Route
              path={`${import.meta.env.VITE_REACT_APP_PATH}/dashboard/*`}
              element={
                <WithAuthentication>
                  <Dashboard />
                </WithAuthentication>
              }
            />
         </Routes>
        </div>       
              
    </MyContextProvider>
  );
};

export default App;
