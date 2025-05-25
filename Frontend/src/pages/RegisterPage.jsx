import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    try {
      await axios.post("http://localhost:5084/api/users", {
        fullName,
        email,
        password,
      });

      alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
      navigate("/login");
    } catch (err) {
      console.error("Kayıt hatası", err);
      alert("Kayıt başarısız oldu.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          FinansApp
        </h2>

        <input
          type="text"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
        />

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
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kayıt Ol
        </button>

        <p className="text-sm text-center text-gray-500">
          Zaten hesabın var mı?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;