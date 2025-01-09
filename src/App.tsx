import React, { useState } from "react";

type DominoCardType = {
  top: number;
  bottom: number;
};

const initialData: DominoCardType[] = [
  { top: 6, bottom: 1 },
  { top: 4, bottom: 3 },
  { top: 5, bottom: 1 },
  { top: 3, bottom: 4 },
  { top: 1, bottom: 1 },
  { top: 3, bottom: 4 },
  { top: 1, bottom: 2 },
];

const DominoCard: React.FC<DominoCardType> = ({ top, bottom }) => {
  const renderDots = (num: number) => {
    const dots = [];
    for (let i = 0; i < num; i++) {
      dots.push(
        <div
          key={i}
          className="w-4 h-4 bg-purple-950 border-1 shadow-2xl rounded-full"
          style={{ margin: "5px" }}
        ></div>
      );
    }
    return dots;
  };

  return (
    <div className="w-20 h-40 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-2xl hover:shadow-2xl hover:border-gray-300 transform transition-all duration-300 hover:scale-75">
      <div className="flex flex-wrap justify-center items-center h-1/2 border-b border-gray-400">
        {renderDots(top)}
      </div>
      <div className="flex flex-wrap justify-center items-center h-1/2">
        {renderDots(bottom)}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cards, setCards] = useState<DominoCardType[]>(initialData);
  const [source, setSource] = useState<number[][]>(
    initialData.map(({ top, bottom }) => [top, bottom])
  );
  const [inputValue, setInputValue] = useState<number | "">("");

  const countDoubles = (cards: DominoCardType[]) => {
    return cards.filter((card) => card.top === card.bottom).length;
  };

  const SortAsc = () => {
    const sorted = [...cards].sort((a, b) => {
      const sumA = a.top + a.bottom;
      const sumB = b.top + b.bottom;
      if (sumA === sumB) {
        return a.top - b.top;
      }
      return sumA - sumB;
    });
    setCards(sorted);
    setSource(sorted.map(({ top, bottom }) => [top, bottom]));
  };

  const SortDesc = () => {
    const sorted = [...cards].sort((a, b) => {
      const sumA = a.top + a.bottom;
      const sumB = b.top + b.bottom;
      if (sumA === sumB) {
        return b.top - a.top;
      }
      return sumB - sumA;
    });
    setCards(sorted);
    setSource(sorted.map(({ top, bottom }) => [top, bottom]));
  };

  const Flip = () => {
    const flippedCards = cards.map((card) => ({
      top: card.bottom,
      bottom: card.top,
    }));
    setCards(flippedCards);
    setSource(flippedCards.map(({ top, bottom }) => [top, bottom]));
  };

  const removeDuplicates = () => {
    const seenPairs: Set<string> = new Set();
    const duplicateCards: Set<string> = new Set();

    cards.forEach((card) => {
      const pair = [card.top, card.bottom].sort((a, b) => a - b).join("-");
      if (seenPairs.has(pair)) {
        duplicateCards.add(pair);
      } else {
        seenPairs.add(pair);
      }
    });

    const uniqueCards = cards.filter((card) => {
      const pair = [card.top, card.bottom].sort((a, b) => a - b).join("-");
      return !duplicateCards.has(pair);
    });

    setCards(uniqueCards);
    setSource(uniqueCards.map((card) => [card.top, card.bottom]));
  };

  const handleRemoveByInput = () => {
    if (inputValue === "") return;

    const num = Number(inputValue);
    setCards((prevCards) =>
      prevCards.filter((card) => card.top + card.bottom !== num)
    );
    setSource((prevSource) =>
      prevSource.filter((source) => source[0] + source[1] !== num)
    );
    setInputValue("");
  };

  const handleReset = () => {
    setCards(initialData);
    setSource(initialData.map(({ top, bottom }) => [top, bottom]));
    setInputValue("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <h1 className="text-3xl text-gray-800 font-bold mb-16">Domino Cards</h1>

      <div className="flex gap-2 text-gray-800 text-lg mb-8 overflow-x-auto">
        <p>Source:</p>
        {source.map((card, index) => (
          <div key={index}>
            {card[0]}.{card[1]}
          </div>
        ))}
      </div>

      <div className="flex gap-5 mb-5 overflow-x-auto">
        {cards.map((card, index) => (
          <DominoCard key={index} top={card.top} bottom={card.bottom} />
        ))}
      </div>

      <div className="mb-10 text-md text-gray-900">
        <p>Double numbers count: {countDoubles(cards)}</p>
      </div>


      <div className="flex gap-4 mb-8 ">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.valueAsNumber)}
          placeholder="Input number"
          className="border-2 px-2 py-1 rounded shadow-lg"
          max={7}
        />
        <button
          onClick={handleRemoveByInput}
          className="px-1 bg-gray-700 font-bold text-gray-200 rounded text-sm shadow-lg hover:scale-110"
        >
          remove
        </button>
        </div>

        
      <div className="flex gap-4 mb-4">
        <button
          onClick={SortAsc}
          className="p-2 bg-purple-300 border-gray-200 shadow-lg text-gray-800 rounded font-bold hover:scale-110"
        >
          Sort Asc
        </button>
        <button
          onClick={SortDesc}
          className="p-2 bg-yellow-300 border-gray-200 shadow-lg text-gray-800 rounded font-bold hover:scale-110"
        >
          Sort Desc
        </button>
        <button onClick={Flip} className="p-2 bg-purple-300 border-gray-200 shadow-lg text-gray-800 rounded font-bold hover:scale-110">
          Flip
        </button>
        <button
          onClick={removeDuplicates}
          className="p-2 bg-yellow-300  border-gray-200 shadow-lg text-gray-800 rounded font-bold hover:scale-110"
        >
          RemoveDup
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-purple-300 font-bold text-gray-800 rounded shadow-lg border-gray-200 hover:scale-110"
        >
          Reset
        </button>
      </div>
      </div>
   
  );
};

export default App;
