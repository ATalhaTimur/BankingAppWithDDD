import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const accountTypes = [
  { value: 0, label: "₺ Türk Lirası" },
  { value: 1, label: "$ Amerikan Doları" },
  { value: 2, label: "€ Euro" },
  { value: 3, label: " XAU Altın (kg)" },
  { value: 4, label: "XAG Gümüş (kg)" },
];

const AccountCreatePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (accountType === "") return alert("Hesap türü seçilmedi");

    try {
      setIsLoading(true);

      await axios.post("http://localhost:5084/api/accounts", {
        userId: user.id,
        accountType: parseInt(accountType),
        fullName: user.fullName,
      });

      alert("Yeni hesap başarıyla oluşturuldu");
      navigate("/");
    } catch (err) {
      console.error("Hesap oluşturulamadı", err);
      alert("Hesap oluşturulamadı");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4">🆕 Yeni Hesap Oluştur</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Hesap Türü</label>
          <select
            className="w-full border p-2 rounded"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Seç</option>
            {accountTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCreate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Oluşturuluyor..." : "Hesap Oluştur"}
        </button>
      </div>
    </div>
  );
};

export default AccountCreatePage;