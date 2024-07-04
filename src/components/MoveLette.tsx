import React, { useState, ChangeEvent } from 'react';
import { U64 } from "@aptos-labs/ts-sdk";

interface MoveletteProps {
  range: { min: number; max: number };
  guesses: string;
  cost: number;
  result: string | null;
  onRangeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onGuessesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const MoveLette: React.FC<MoveletteProps> = ({
  range,
  guesses,
  cost,
  result,
  onRangeChange,
  onGuessesChange,
  onSubmit
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Move-Lette</h1>
      <div className="flex mb-4">
        <input
          type="number"
          name="min"
          value={range.min}
          onChange={onRangeChange}
          className="border p-2 mr-2 w-full arcade-input"
        />
        <span className="self-center">to</span>
        <input
          type="number"
          name="max"
          value={range.max}
          onChange={onRangeChange}
          className="border p-2 ml-2 w-full arcade-input"
        />
      </div>
      <input
        type="text"
        value={guesses}
        onChange={onGuessesChange}
        placeholder="Enter your guesses (e.g., 1,4,5)"
        className="border p-2 w-full mb-4 arcade-input"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full arcade-button">
        Set Range & Start
      </button>
      <div className="text-center mb-4 arcade-info">
        <p>Cost = {cost} $TELE</p>
        <p>
          Winning Chance = {guesses.split(",").length}/
          {range.max - range.min + 1} ={" "}
          {(
            guesses.split(",").length /
            (range.max - range.min + 1)
          ).toFixed(1)}
        </p>
        <p>
          Potential Win:{" "}
          {(range.max - range.min + 1 - guesses.split(",").length) * 1}{" "}
          $TELE
        </p>
      </div>
      {result && (
        <div className="text-xl font-bold mb-4 text-center arcade-result">
          <p>{result}</p>
        </div>
      )}
    </>
  );
};

export default MoveLette;