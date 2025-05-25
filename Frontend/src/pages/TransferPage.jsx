import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../utils/format";

const accountTypes = [
  { value: 0, label: "₺ Türk Lirası", short: "TRY" },
  { value: 1, label: "$ Dolar", short: "USD" },
  { value: 2, label: "€ Euro", short: "EUR" },
  { value: 3, label: "🪙 Altın", short: "XAU" },
  { value: 4, label: "🥈 Gümüş", short: "XAG" },
];

const TransferPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [senderAccountId, setSenderAccountId] = useState("");

  const [targetSelf, setTargetSelf] = useState(false); // kendi hesabıma mı?
  const [receiverAccountId, setReceiverAccountId] = useState(""); // kendi hesap seçimi
  const [receiverIban, setReceiverIban] = useState(""); // başka kullanıcı için
  const [receiverFullName, setReceiverFullName] = useState("");

  const [amount, setAmount] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5084/api/accounts?userId=${user.id}`
        );
        setAllAccounts(res.data);
      } catch (err) {
        console.error("Hesaplar alınamadı", err);
      }
    };
    fetchAccounts();
  }, [user.id]);

  const filteredAccounts =
    selectedType === ""
      ? []
      : allAccounts.filter((a) => a.accountType === parseInt(selectedType));

  const handleTransfer = async () => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!selectedType || !senderAccountId || !amount) {
      setErrorMsg("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      if (targetSelf) {
        if (!receiverAccountId) {
          setErrorMsg("Alıcı hesabı seçilmedi.");
          return;
        }

        if (receiverAccountId === senderAccountId) {
          setErrorMsg("Aynı hesaba gönderim yapılamaz.");
          return;
        }

        const receiver = allAccounts.find((a) => a.id === receiverAccountId);
        if (!receiver) {
          setErrorMsg("Alıcı hesap bulunamadı.");
          return;
        }

        await axios.post("http://localhost:5084/api/transfers", {
          senderAccountId,
          receiverIban: receiver.iban,
          receiverFullName: receiver.fullName,
          amount: parseFloat(amount),
        });
      } else {
        if (!receiverIban || !receiverFullName) {
          setErrorMsg("Alıcı bilgileri eksik.");
          return;
        }

        await axios.post("http://localhost:5084/api/transfers", {
          senderAccountId,
          receiverIban,
          receiverFullName,
          amount: parseFloat(amount),
        });
      }

      setSuccessMsg("✅ Transfer başarılı!");
      setReceiverIban("");
      setReceiverFullName("");
      setReceiverAccountId("");
      setAmount("");
    } catch (err) {
      console.error("Transfer hatası", err);
      setErrorMsg("❌ Transfer başarısız.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold">💸 Para Transferi</h2>

        {successMsg && <div className="text-green-600">{successMsg}</div>}
        {errorMsg && <div className="text-red-600">{errorMsg}</div>}

        <label className="block font-medium">💱 Hesap Türü</label>
        <select
          className="border rounded p-2 w-full"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setSenderAccountId("");
            setReceiverAccountId("");
          }}
        >
          <option value="">Tür Seç</option>
          {accountTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {selectedType && (
          <>
            <label className="block font-medium">📤 Gönderen Hesap</label>
            <select
              className="border rounded p-2 w-full"
              value={senderAccountId}
              onChange={(e) => setSenderAccountId(e.target.value)}
            >
              <option value="">Hesap Seç</option>
              {filteredAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.iban} — {formatCurrency(acc.balance)}{" "}
                  {accountTypes.find((t) => t.value === acc.accountType)?.short}
                </option>
              ))}
            </select>

            <label className="block font-medium mt-4">👥 Alıcı Türü</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="receiverType"
                  checked={!targetSelf}
                  onChange={() => setTargetSelf(false)}
                />
                Başka kullanıcıya
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="receiverType"
                  checked={targetSelf}
                  onChange={() => setTargetSelf(true)}
                />
                Kendi hesabıma
              </label>
            </div>

            {targetSelf ? (
              <>
                <label className="block font-medium">📥 Alıcı Hesap</label>
                <select
                  className="border rounded p-2 w-full"
                  value={receiverAccountId}
                  onChange={(e) => setReceiverAccountId(e.target.value)}
                >
                  <option value="">Alıcı Hesap Seç</option>
                  {filteredAccounts
                    .filter((acc) => acc.id !== senderAccountId)
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.iban} — {formatCurrency(acc.balance)}{" "}
                        {
                          accountTypes.find((t) => t.value === acc.accountType)
                            ?.short
                        }
                      </option>
                    ))}
                </select>
              </>
            ) : (
              <>
                <label className="block font-medium">🔢 Alıcı IBAN</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="TR96..."
                  value={receiverIban}
                  onChange={(e) => setReceiverIban(e.target.value)}
                />

                <label className="block font-medium">👤 Alıcı Ad Soyad</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Talha Timur"
                  value={receiverFullName}
                  onChange={(e) => setReceiverFullName(e.target.value)}
                />
              </>
            )}
          </>
        )}

        <label className="block font-medium mt-2">💸 Tutar</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleTransfer}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          🚀 Transfer Et
        </button>
      </div>
    </div>
  );
};

export default TransferPage;
