import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import TransferPage from "../pages/TransferPage";
import ExchangePage from "../pages/ExchangePage";
import AccountDetailsPage from "../pages/AccountDetailsPage";
import AccountCreatePage from "../pages/AccountCreatePage";
import Layout from "../components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout dışı sayfalar (giriş/kayıt) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Layout uygulanan sayfalar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/:id" element={<AccountDetailsPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/create-account" element={<AccountCreatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;