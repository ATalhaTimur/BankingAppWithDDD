const TransactionControlTabs = ({
  categoryOptions,
  amount,
  setAmount,
  newCategory,
  setNewCategory,
  description,
  setDescription,
  handleAddExpense,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">➕ Masraf Ekle</h3>

      <div className="space-y-3">
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Tutar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option value="">Kategori Seç</option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddExpense}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Masraf Ekle
        </button>
      </div>
    </div>
  );
};

export default TransactionControlTabs;