import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Users from "./pages/Users/Users.jsx";
import Wallets from "./pages/Wallets/Wallets.jsx";
import Currencies from "./pages/Currencies/Currencies.jsx";
import './app.css'
import UserForm from "./pages/Users/UserForm.jsx"
import UserDetail from "./pages/Users/UserDetails.jsx";
import CurrencyForm from "./pages/Currencies/CurrencyForm.jsx";
import UserEdit from "./pages/Users/UserEdit.jsx";
import CurrencyEdit from "./pages/Currencies/CurrencyEdit.jsx";
import CurrencyDetails from "./pages/Currencies/CurrencyDetails.jsx";
import WalletEdit from "./pages/Wallets/WalletEdit.jsx";
import WalletForm from "./pages/Wallets/WalletForm.jsx";
import WalletDetails from "./pages/Wallets/WalletDetails.jsx";
import NotFound from "./components/NotFound.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
function App() {


  return (
    <>
      <BrowserRouter>
          <div className="app-container">
            <Navbar/>

            <div className="content">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path ="/users" element={<Users />}></Route>
                    <Route path ="/users/create" element={<UserForm />}></Route>
                    <Route path ="/users/:id" element={<UserDetail />}></Route>
                    <Route path ="/users/:id/edit" element={<UserEdit />}></Route>

                    <Route path ="/currencies" element={<Currencies />}></Route>
                    <Route path ="/currencies/create" element={<CurrencyForm />}></Route>
                    <Route path ="/currencies/:id/edit" element={<CurrencyEdit />}></Route>
                    <Route path ="/currencies/:id" element={<CurrencyDetails />}></Route>

                    <Route path ="/wallets" element={<Wallets />}></Route>
                    <Route path ="/wallets/:id/edit" element={<WalletEdit />}></Route>
                    <Route path ="/wallets/create" element={<WalletForm />}></Route>
                    <Route path ="/wallets/:id" element={<WalletDetails />}></Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <footer className="footer">
                    © 2026 MyApp.
                </footer>
            </div>
          </div>
      </BrowserRouter>
    </>
  )
}

export default App
