import "./App.css";
import { useState, useEffect } from "react";
import ResultForm from "./components/ResultForm";
import ScoreForm from "./components/ScoreForm";

function App() {
  const players = [1, 2, 3, 4];

  const fields = [
    { label: "Cards 3", id: "cards-3", multiplier: 3 },
    { label: "Cards 5", id: "cards-5", multiplier: 5 },
    { label: "Cards 8", id: "cards-8", multiplier: 8 },
    { label: "Expedition cards", id: "expedition" },
    { label: "Gold (1p per 3)", id: "gold" },
  ];

  // Add objectives 1-5
  for (let i = 1; i <= 5; i++) {
    fields.push({ label: `Objective ${i}`, id: `objective-${i}` });
  }

  // State to store input values and results
  const [inputValues, setInputValues] = useState({});
  const [playerNames, setPlayerNames] = useState({});
  const [fireworks, setFireworks] = useState({});
  const [results, setResults] = useState({});
  const [totals, setTotals] = useState({});
  const [winner, setWinner] = useState(null);

  // Initialize state for player names and input values
  useEffect(() => {
    const initialPlayerNames = {};
    const initialInputValues = {};
    const initialFireworks = {};

    players.forEach((player) => {
      initialPlayerNames[`player-name-${player}`] = "";
      initialFireworks[`fireworks-${player}`] = false;

      fields.forEach((field) => {
        initialInputValues[`${field.id}-${player}`] = "";
      });
    });

    setPlayerNames(initialPlayerNames);
    setInputValues(initialInputValues);
    setFireworks(initialFireworks);
  }, []);

  // Update results whenever input values change
  useEffect(() => {
    updateResults();
  }, [inputValues, playerNames, fireworks]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.startsWith("player-name-")) {
      setPlayerNames((prev) => ({
        ...prev,
        [id]: value,
      }));
    } else {
      setInputValues((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle fireworks checkbox changes
  const handleFireworksChange = (e) => {
    const { id, checked } = e.target;
    setFireworks((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // Calculate and update results
  const updateResults = () => {
    const newResults = {};
    const newTotals = {};

    // Copy player names to results
    players.forEach((player) => {
      const playerNameKey = `player-name-${player}`;
      const playerNameValue = playerNames[playerNameKey] || "";
      newResults[`result-name-${player}`] = playerNameValue;
      newTotals[player] = 0;
    });

    // Calculate individual field results
    fields.forEach((field) => {
      players.forEach((player) => {
        const inputKey = `${field.id}-${player}`;
        const inputValue = inputValues[inputKey] || "";
        const resultKey = `result-${field.id}-${player}`;

        let pointValue = 0;

        if (inputValue !== "") {
          const numericValue = parseInt(inputValue, 10);

          if (field.id === "gold") {
            // Gold is worth 1 point per 3 gold
            pointValue = Math.floor(numericValue / 3);
          } else if (field.multiplier) {
            // Fields with multipliers
            pointValue = numericValue * field.multiplier;
          } else {
            // Regular fields (objectives and expedition cards)
            pointValue = numericValue;
          }

          // Add to player's total
          newTotals[player] += pointValue;
        }

        newResults[resultKey] = pointValue || "";
      });
    });

    // Add fireworks points (7 points if checked)
    players.forEach((player) => {
      const fireworksKey = `fireworks-${player}`;
      const hasFireworks = fireworks[fireworksKey] || false;
      newResults[`result-fireworks-${player}`] = hasFireworks ? 7 : "";
      if (hasFireworks) {
        newTotals[player] += 7;
      }
    });

    // Determine the winner
    let maxTotal = -1;
    let winningPlayer = null;
    let isTie = false;

    Object.entries(newTotals).forEach(([player, total]) => {
      if (total > maxTotal) {
        maxTotal = total;
        winningPlayer = player;
        isTie = false;
      } else if (total === maxTotal && total > 0) {
        isTie = true;
      }
    });

    let winnerText = "";
    if (winningPlayer && !isTie) {
      const winnerName =
        playerNames[`player-name-${winningPlayer}`] ||
        `Player ${winningPlayer}`;
      winnerText =
        maxTotal > 0
          ? `🏆 ${winnerName} wins with ${maxTotal} points! 🏆`
          : "";
    } else if (isTie && maxTotal > 0) {
      winnerText = `It's a tie with ${maxTotal} points!`;
    }

    setResults(newResults);
    setTotals(newTotals);
    setWinner(winnerText);
  };

  return (
    <div className="container">
      <header>
        <h1 className="text-6xl mb-5">ANNO 1800</h1>
      </header>

      <section>
        <div className="flex flex-col lg:flex-row gap-10">
          <ScoreForm
            players={players}
            fields={fields}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            playerNames={playerNames}
            fireworks={fireworks}
            handleFireworksChange={handleFireworksChange}
          />
          <ResultForm
            players={players}
            fields={fields}
            results={results}
            totals={totals}
          />
        </div>
      </section>

      <div className="text-center bg-black/80 p-4 rounded-lg space-y-2 my-10">
        <div className="text-2xl font-semibold">{winner}</div>
      </div>

      <footer className="bg-black/80 p-4 rounded-lg  my-10">
        <small>&copy; {new Date().getFullYear()} Sabina Balejikova</small>
        <small>
          <a href="https://sabini.io" target="_blank" rel="noopener noreferrer">
            🔗 Sabini.io
          </a>
        </small>
      </footer>
    </div>
  );
}

export default App;
