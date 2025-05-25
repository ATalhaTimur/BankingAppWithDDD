import { useState, useEffect } from "react";

const TransactionEditModal = ({ isOpen, onClose, transaction, onSave }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString()); // input için string yap
      setDescription(transaction.description);
      setCategory(transaction.category);
    }
  }, [transaction]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);

    if (!description || category === "") {
      alert("Tüm alanlar doldurulmalı");
      return;
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Geçerli bir tutar gir");
      return;
    }

    if (numericAmount > transaction.amount) {
      alert("Tutar artırılamaz");
      return;
    }

    onSave({
      ...transaction,
      amount: numericAmount, // artık decimal backend uyumlu
      description,
      category,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-xl font-semibold">🖊️ İşlem Düzenle</h2>

        <div className="space-y-2">
          <label className="block text-sm">Tutar (sadece azaltılabilir)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            min="0"
            max={transaction.amount}
          />

          <label className="block text-sm">Kategori</label>
          <select
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
          >
            <option value="">Seç</option>
            <option value={0}>Diğer</option>
            <option value={1}>Market</option>
            <option value={2}>Yakıt</option>
            <option value={5}>Yatırım</option>
          </select>

          <label className="block text-sm">Açıklama</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionEditModal;
