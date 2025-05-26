import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../utils/format";

// Kur oranları
const currencyRates = {
  "TRY→USD": 0.031,
  "TRY→EUR": 0.028,
  "TRY→XAU": 0.00052,
  "TRY→XAG": 0.034,
  "USD→TRY": 32.2,
  "EUR→TRY": 35.5,
  "XAU→TRY": 1920,
  "XAG→TRY": 29,
};

const accountTypeMap = {
  0: { label: "₺ TRY", short: "TRY" },
  1: { label: "$ USD", short: "USD" },
  2: { label: "€ EUR", short: "EUR" },
  3: { label: "XAU Altın", short: "XAU" },
  4: { label: "XAG Gümüş", short: "XAG" },
};

const ExchangePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [accounts, setAccounts] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [rateText, setRateText] = useState("");
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ dışarı aldık ki hem useEffect hem işlem sonrası çağrabilelim
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5084/api/accounts?userId=${user.id}`
      );
      setAccounts(res.data);
    } catch (err) {
      console.error("Hesaplar alınamadı", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user.id]);

  useEffect(() => {
    const from = accounts.find((a) => a.id === fromAccountId);
    const to = accounts.find((a) => a.id === toAccountId);

    if (from && to && from.accountType !== to.accountType) {
      const fromSymbol = accountTypeMap[from.accountType].short;
      const toSymbol = accountTypeMap[to.accountType].short;

      const key = `${fromSymbol}→${toSymbol}`;
      const rate = currencyRates[key];

      if (rate) {
        setExchangeRate(rate);
        setRateText(`1 ${fromSymbol} = ${rate} ${toSymbol}`);
      } else {
        setExchangeRate(null);
        setRateText("");
      }
    } else {
      setExchangeRate(null);
      setRateText("");
    }
  }, [fromAccountId, toAccountId, accounts]);

  const handleExchange = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setResult("");

    if (!fromAccountId || !toAccountId || !amount) {
      setErrorMsg("Lütfen tüm alanları doldurun.");
      return;
    }

    if (fromAccountId === toAccountId) {
      setErrorMsg("Aynı hesaplar arasında dönüşüm yapılamaz.");
      return;
    }

    if (!exchangeRate) {
      setErrorMsg("Bu dönüşüm desteklenmiyor.");
      return;
    }

    try {
      await axios.post("http://localhost:5084/api/exchange", {
        fromAccountId,
        toAccountId,
        amount: parseFloat(amount),
      });

      // ✅ hesapları yeniden çekiyoruz
      await fetchAccounts();

      const converted = (parseFloat(amount) * exchangeRate).toFixed(2);
      setSuccessMsg("✅ Döviz dönüşümü başarılı.");
      setResult(
        `${formatCurrency(amount)} → ${formatCurrency(converted)} (${rateText})`
      );
      setAmount("");
    } catch (err) {
      console.error("Exchange hatası", err);
      setErrorMsg("❌ Dönüşüm işlemi başarısız.");
    }
  };

  const getAccountLabel = (acc) => {
    const type = accountTypeMap[acc.accountType];
    return `${type.label} — ${acc.iban} | Bakiye: ${formatCurrency(
      acc.balance
    )}`;
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold">🔁 Kur Dönüşüm</h2>

        {successMsg && <div className="text-green-600">{successMsg}</div>}
        {errorMsg && <div className="text-red-600">{errorMsg}</div>}
        {result && <div className="text-blue-600">{result}</div>}

        {/* Kaynak Hesap */}
        <label className="block font-medium">📤 Kaynak Hesap</label>
        <select
          className="border rounded p-2 w-full"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
        >
          <option value="">Seç</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {getAccountLabel(acc)}
            </option>
          ))}
        </select>

        {/* Hedef Hesap */}
        <label className="block font-medium">📥 Hedef Hesap</label>
        <select
          className="border rounded p-2 w-full"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
        >
          <option value="">Seç</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {getAccountLabel(acc)}
            </option>
          ))}
        </select>

        {/* Kur */}
        {rateText && (
          <p className="text-sm text-gray-600">💱 Kur Oranı: {rateText}</p>
        )}

        <label className="block font-medium">💸 Miktar</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleExchange}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Dönüştür
        </button>
      </div>
    </div>
  );
};

export default ExchangePage;
