import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import StartPage from "./components/startpage.component";
import ListUsers from "./components/users.components";
import ListTransactions from "./components/transactions.component";
import User from "./components/user.component";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    FINAPP
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/users"} className="nav-link">
                            Users
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/transactions"} className="nav-link">
                            Transactions
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                            Sing up
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/users" element={<ListUsers/>}/>
                    <Route path="/users/:id" element={<User/>}/>
                    <Route path="/transactions" element={<ListTransactions/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
