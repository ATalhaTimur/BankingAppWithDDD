const getAccountType = (type) => ["TRY", "USD", "EUR", "XAU", "XAG"][type] || "Unknown";

const AccountInfoCard = ({ account, formatCurrency }) => {
  if (!account) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <h2 className="text-2xl font-bold">Hesap Bilgileri</h2>
      <p><strong>IBAN:</strong> {account.iban}</p>
      <p><strong>Bakiye:</strong> {formatCurrency(account.balance)}</p>
      <p><strong>Hesap Türü:</strong> {getAccountType(account.accountType)}</p>
    </div>
  );
};

export default AccountInfoCard;