import {Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import {AuthProvider} from "./services/AuthContext.jsx";


function App() {


  return (
    <>
      <AuthProvider>
          <Routes>
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/"} element={<Home />} />
           </Routes>
      </AuthProvider>
    </>
  )
}

export default App
