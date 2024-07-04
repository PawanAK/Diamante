import React, { useState, ChangeEvent, useEffect } from "react";
import goodimg from "../src/assets/good.jpg";
import evilimg from "../src/assets/evil.jpg";
import axios from "axios";
import "./App.css";

import Header from './components/Header';
import Hero from './components/Hero';
import GameSection from './components/GameSection';
import RedeemModal from './components/RedeemModal';

interface Range {
  min: number;
  max: number;
}

interface NFTItem {
  title: string;
  price: number;
  Image: string;
  keywords: string;
  negative: string;
  id: number;
}

const App: React.FC = () => {
  const [range, setRange] = useState<Range>({ min: 1, max: 10 });
  const [guesses, setGuesses] = useState<string>("1");
  const [cost, setCost] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const [win, setWin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [showGame, setShowGame] = useState<boolean>(false);
  const [account, setAccount] = useState<{ publicKey: string, secret: string } | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [fundingMessage, setFundingMessage] = useState<string>("");

  useEffect(() => {
    const guessArray = guesses.split(",").map(Number);
    const totalCost = guessArray.length;
    setCost(totalCost);
    console.log(win);
  }, [guesses]);

  const createKeypair = async () => {
    if (!account) { // Check if account already exists
      try {
        const response = await axios.post("http://localhost:3001/create-keypair");
        setAccount(response.data);
        setConnected(true);
      } catch (error) {
        console.error("Error creating keypair:", error);
      }
    }
  };

  const fundAccount = async () => {
    console.log('Fund Account button clicked');
    if (account) {
      try {
        const response = await fetch('http://localhost:3001/fund-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicKey: account.publicKey }),
        });
        const data = await response.json();
        console.log('Account funded:', data);
        setFundingMessage(data.message);
        fetchBalance(); // Update balance after funding
      } catch (error) {
        console.error('Error funding account:', error);
        setFundingMessage('Error funding account.');
      }
    }
  };

  const fetchBalance = async () => {
    if (account) {
      try {
        const response = await axios.get(`http://localhost:3001/get-balance?publicKey=${account.publicKey}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  const handleGuessesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuesses(e.target.value);
  };

  const handleSubmit = () => {
    // Implement game logic here
    const guessArray = guesses.split(",").map(Number);
    const randomNumber = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    if (guessArray.includes(randomNumber)) {
      setResult("You win!");
      setWin(true);
    } else {
      setResult("You lose!");
      setWin(false);
    }
  };

  const handleMintToken = async () => {
    // Implement token minting logic here
  };

  const handletokenTransfer = async (amt: number) => {
    // Implement token transfer logic here
  };

  const handleRedeemClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const nftData: NFTItem[] = [
    { title: "Good Pack", price: 30, Image: goodimg, id: 1, negative: "Evil Expression, Scowl, Frown, No beard,Sarcastic Smile,blurry images", keywords: "Cartoon, Exagerated,Handsome, Beautiful, Detailed Animation, Animated, No Background, Black Background, Happy, Long hair, Always bearded" },
    { title: "Evil Pack", price: 30, Image: evilimg, id: 2, negative: "Good Expression, Smile, blurry images", keywords: "Evil ,Cartoon, Exagerated,Handsome, Beautiful, Detailed Animation, Animated, No Background, Black Background, Happy, Long hair, Always bearded, Sarcastic smile" },
  ];

  const mint_nftpack = (amt: number, prompt: string, negative_prompt: string) => {
    var data = {
      action: "Add Sticker",
      prompt: prompt,
      wallet: account?.publicKey,
      negative_prompt: negative_prompt,
    };
    handletokenTransfer(amt);
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  };

  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRange((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  return (
    <div className="landing-page">
      <Header />
      <Hero onGetStarted={() => setShowGame(true)} />
      {showGame && (
        <GameSection
          connected={connected}
          account={account}
          balance={balance}
          range={range}
          guesses={guesses}
          cost={cost}
          result={result}
          onRedeemClick={handleRedeemClick}
          onMintToken={handleMintToken}
          onRangeChange={handleRangeChange}
          onGuessesChange={handleGuessesChange}
          onSubmit={handleSubmit}
          createKeypair={createKeypair}
          fundAccount={fundAccount} // Pass fundAccount as a prop
        />
      )}
      <RedeemModal
        showModal={showModal}
        balance={balance}
        nftData={nftData}
        onClose={handleCloseModal}
        onMintNFT={mint_nftpack}
      />
    </div>
  );
};

export default App;