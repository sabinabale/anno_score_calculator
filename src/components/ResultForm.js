import React from "react";

export default function ResultForm({ players, fields, results, totals }) {
  return (
    <div className="form-wrapper">
      <h3 className="bg-black/80 p-4 rounded-lg space-y-2 my-4">Results</h3>
      <form className="results-form">
        <div className="grid">
          <div className="grid-header border-bottom">
            {players.map((player) => (
              <div className="grid-cell" key={`result-header-${player}`}>
                <label htmlFor={`result-name-${player}`}>Player {player}</label>
                <input
                  type="text"
                  id={`result-name-${player}`}
                  value={results[`result-name-${player}`] || ""}
                  readOnly
                />
              </div>
            ))}
          </div>

          <div className="grid-body">
            {/* Score fields */}
            {fields.map((field) => (
              <div className="grid-row" key={`result-${field.id}`}>
                {players.map((player) => (
                  <div
                    className="grid-cell"
                    key={`result-${field.id}-${player}`}
                  >
                    <label htmlFor={`result-${field.id}-${player}`}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={`result-${field.id}-${player}`}
                      value={results[`result-${field.id}-${player}`] || ""}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Total row */}
            <div className="grid-row total-row">
              {players.map((player) => (
                <div className="grid-cell" key={`total-${player}`}>
                  <label htmlFor={`total-${player}`}>
                    Total Player {player}
                  </label>
                  <input
                    type="text"
                    id={`total-${player}`}
                    value={totals[player] || ""}
                    readOnly
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
