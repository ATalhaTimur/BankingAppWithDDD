import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5084/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          FinansApp
        </h2>

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Giriş Yap
        </button>

        <p className="text-sm text-center text-gray-500">
          Hesabın yok mu?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;