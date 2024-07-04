import React from 'react';

interface WalletInfoProps {
  connected: boolean;
  account: any;
  balance: number;
  onRedeemClick: () => void;
  onMintToken: () => void;
  createKeypair: () => void;
  fundAccount: () => void; // Added fundAccount prop
}

const WalletInfo: React.FC<WalletInfoProps> = ({ connected, account, balance, onRedeemClick, onMintToken, createKeypair, fundAccount }) => {
  if (!connected) {
    return (
      <div className="flex justify-center mb-4">
        <button onClick={createKeypair} className="bg-blue-500 text-white py-2 px-4 rounded mb-2">
          Create Keypair
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
        onClick={() => {
          if (account?.publicKey) {
            navigator.clipboard.writeText(account.publicKey);
          } else {
            console.error("No address available to copy.");
          }
        }}>
        {account?.publicKey
          ? `${account.publicKey.slice(0, 6)}...${account.publicKey.slice(-4)}`
          : "No Address"}
      </button>
      <div className="text-black text-center mb-2">
        <p>Balance: DIAM {balance.toFixed(2)}</p>
      </div>
      <button
        onClick={onRedeemClick}
        className="bg-yellow-500 text-white py-2 px-4 rounded mb-2">
        Redeem
      </button>
      <button
        onClick={onMintToken}
        className="bg-green-500 text-white py-2 px-4 rounded mb-2">
        Buy DIAM Tokens
      </button>
      <button
        onClick={fundAccount} // Added fundAccount button
        className="bg-purple-500 text-white py-2 px-4 rounded mb-2">
        Fund Account
      </button>
    </div>
  );
};

export default WalletInfo;