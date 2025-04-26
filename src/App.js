import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register.component";
import StartPage from "./components/startpage.component";
import ShowAllTransactions from "./components/showAllTransactions.component";
import Profile from "./components/profile.component";
import AuthService from "./services/auth.service";
import {useState} from "react";
import Login from "./components/login.component";
import SearchTransactions from "./components/serchTransactional.component";
import Transaction from "./components/transaction.component";
import ListCategories from "./components/listCategories.component";
import ListBanks from "./components/listBanks.component";
import ListTransactionStatus from "./components/listTransactionStatus.component";
import ListTransactionType from "./components/listTransactionType.component";

function App() {

    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    function logout() {
        AuthService.logout();
        setCurrentUser(null);
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">FINAPP</Link>
                {currentUser ? (
                    <>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/search-trans"} className="nav-link">Search Transaction</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/transactions"} className="nav-link">All Transactions</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/categories"} className="nav-link">All Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/banks"} className="nav-link">All Banks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/statuses"} className="nav-link">All Trans Statuses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/types"} className="nav-link">All Trans Types</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link" onClick={logout}>Log out</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/*" element={<StartPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/search-trans" element={<SearchTransactions/>}/>
                    <Route path="/transactions/:id" element={<Transaction/>}/>
                    <Route path="/transactions" element={<ShowAllTransactions/>}/>
                    <Route path="/categories" element={<ListCategories />}/>
                    <Route path="/banks" element={<ListBanks />}/>
                    <Route path="/statuses" element={<ListTransactionStatus />}/>
                    <Route path="/types" element={<ListTransactionType />}/>
                    <Route path="/login" element={<Login action={setCurrentUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;