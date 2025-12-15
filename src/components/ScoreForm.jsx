import React from "react";

export default function ScoreForm({
  players,
  fields,
  inputValues,
  handleInputChange,
  playerNames,
  fireworks,
  handleFireworksChange,
}) {
  return (
    <div className="form-wrapper">
      <h3 className="bg-black/80 p-4 rounded-lg space-y-2 my-4 font-semibold">
        Enter your scores here
      </h3>
      <form className="input-form">
        <div className="grid">
          <div className="grid-header border-bottom">
            {players.map((player) => (
              <div className="grid-cell" key={`header-${player}`}>
                <label htmlFor={`player-name-${player}`}>Player {player}</label>
                <input
                  type="text"
                  id={`player-name-${player}`}
                  name={`player-name-${player}`}
                  value={playerNames[`player-name-${player}`] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <div className="grid-body">
            {/* Score fields */}
            {fields.map((field) => (
              <div className="grid-row" key={field.id}>
                {players.map((player) => (
                  <div className="grid-cell" key={`${field.id}-${player}`}>
                    <label htmlFor={`${field.id}-${player}`}>
                      {field.label}
                    </label>
                    <input
                      type="number"
                      id={`${field.id}-${player}`}
                      name={`${field.id}-${player}`}
                      value={inputValues[`${field.id}-${player}`] || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Fireworks checkbox row */}
            <div className="grid-row">
              {players.map((player) => (
                <div className="grid-cell" key={`fireworks-${player}`}>
                  <label htmlFor={`fireworks-${player}`}>
                    Fireworks (+7)
                  </label>
                  <input
                    type="checkbox"
                    id={`fireworks-${player}`}
                    name={`fireworks-${player}`}
                    checked={fireworks[`fireworks-${player}`] || false}
                    onChange={handleFireworksChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
