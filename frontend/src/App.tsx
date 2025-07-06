import { BrowserRouter, Route, Routes } from "react-router-dom";
import {NavBar} from "./components/NavBar";
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div className="h-[calc(100vh-72px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;