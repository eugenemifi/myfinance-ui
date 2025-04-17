import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import StartPage from "./components/startpage.component";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} element={<StartPage />} className="navbar-brand">
                    FINAPP
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link
                            to={"/home"}
                            element={<Home />}
                            className="nav-link"
                        >
                            Home
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link
                            to={"/login"}
                            element={<Login />}
                            className="nav-link"
                        >
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/register"}
                            element={<Register />}
                            className="nav-link"
                        >
                            Sing up
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
