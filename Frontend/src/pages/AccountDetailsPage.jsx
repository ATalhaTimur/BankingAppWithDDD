import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../utils/format";
import AccountInfoCard from "../components/AccountInfoCard";
import TransactionControlTabs from "../components/TransactionControlTabs";
import TransactionList from "../components/transactions/TransactionList";

const AccountDetailsPage = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const transactionListRef = useRef(); // 👈 bu eklendi

  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("filter");

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      const res = await axios.get(`http://localhost:5084/api/accounts?userId=${user.id}`);
      const selected = res.data.find((a) => a.id === id);
      setAccount(selected);
    } catch (err) {
      console.error("Hesap verisi alınamadı", err);
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !newCategory || !description) return alert("Lütfen tüm alanları doldur");

    try {
      await axios.post("http://localhost:5084/api/transactions", {
        accountId: id,
        amount: parseFloat(amount),
        transactionType: 0,
        category: parseInt(newCategory),
        description,
      });

      setAmount("");
      setNewCategory("");
      setDescription("");

      await fetchAccount(); // Balance güncelle
      transactionListRef.current?.refresh(); // 👈 işlem listesi güncelle
    } catch (err) {
      console.error("Masraf eklenemedi", err);
      alert("Masraf eklenemedi");
    }
  };

  const categoryOptions = [
    { value: 0, label: "Diğer" },
    { value: 1, label: "Market" },
    { value: 2, label: "Benzin" },
    { value: 3, label: "Transfer Ücreti" },
    { value: 4, label: "Kur Dönüşüm" },
    { value: 5, label: "Yatırım" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <AccountInfoCard account={account} formatCurrency={formatCurrency} />

      <TransactionControlTabs
        categoryOptions={categoryOptions}
        amount={amount}
        setAmount={setAmount}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        description={description}
        setDescription={setDescription}
        handleAddExpense={handleAddExpense}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <TransactionList ref={transactionListRef} accountId={id} />
    </div>
  );
};

export default AccountDetailsPage;