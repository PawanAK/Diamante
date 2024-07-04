import React from 'react';

interface NFTItem {
  title: string;
  price: number;
  Image: string;
  keywords: string;
  negative: string;
  id: number;
}

interface RedeemModalProps {
  showModal: boolean;
  balance: number;
  nftData: NFTItem[];
  onClose: () => void;
  onMintNFT: (amt: number, prompt: string, negative_prompt: string) => void;
}

const RedeemModal: React.FC<RedeemModalProps> = ({
  showModal,
  balance,
  nftData,
  onClose,
  onMintNFT
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 arcade-modal">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Redeem Through Stickers
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {nftData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-gray-200 p-4 rounded-lg arcade-item">
              <img
                src={item.Image}
                alt={item.title}
                className="w-32 h-32 mb-2"
              />
              <p className="text-lg">
                {item.title} - DIAM {item.price}
              </p>
              <button
                onClick={() => onMintNFT(item.price, item.keywords, item.negative)}
                className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded arcade-button">
                Mint
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded arcade-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default RedeemModal;