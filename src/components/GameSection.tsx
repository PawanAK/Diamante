import React from 'react';
import WalletInfo from './WalletInfo';
import MoveLette from './MoveLette';

interface GameSectionProps {
  connected: boolean;
  account: any;
  balance: number;
  range: { min: number; max: number };
  guesses: string;
  cost: number;
  result: string | null;
  onRedeemClick: () => void;
  onMintToken: () => void;
  onRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuessesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const GameSection: React.FC<GameSectionProps> = ({
  connected,
  account,
  balance,
  range,
  guesses,
  cost,
  result,
  onRedeemClick,
  onMintToken,
  onRangeChange,
  onGuessesChange,
  onSubmit
}) => {
  return (
    <div className="game-section">
      <WalletInfo
        connected={connected}
        account={account}
        balance={balance}
        onRedeemClick={onRedeemClick}
        onMintToken={onMintToken}
      />
      {connected && (
        <MoveLette
          range={range}
          guesses={guesses}
          cost={cost}
          result={result}
          onRangeChange={onRangeChange}
          onGuessesChange={onGuessesChange}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default GameSection;