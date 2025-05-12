document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-form input");
  inputs.forEach((input) => {
    input.addEventListener("input", updateResults);
  });

  function updateResults() {
    const players = document.querySelectorAll(
      '.input-form input[id^="player-name"]'
    );
    players.forEach((player, index) => {
      const playerNum = index + 1;
      const playerName = player.value || "Player " + playerNum;

      document.getElementById("result-name-" + playerNum).value = playerName;

      document.querySelector(
        'label[for="total-' + playerNum + '"]'
      ).textContent = "Total " + playerName;

      updateField(playerNum, "cards-3", 3);
      updateField(playerNum, "cards-5", 5);
      updateField(playerNum, "cards-8", 8);

      ["expedition", "gold"]
        .concat(Array.from({ length: 5 }, (_, i) => "objective-" + (i + 1)))
        .forEach((field) => {
          const input = document.getElementById(field + "-" + playerNum);
          const result = document.getElementById(
            "result-" + field + "-" + playerNum
          );
          result.value = input.value;
        });

      calculateTotal(playerNum);
    });

    updateWinner();
  }

  function updateField(playerNum, fieldId, multiplier) {
    const input = document.getElementById(fieldId + "-" + playerNum);
    const result = document.getElementById(
      "result-" + fieldId + "-" + playerNum
    );
    const value = input.value !== "" ? parseInt(input.value) * multiplier : "";
    result.value = value;
  }

  function calculateTotal(playerNum) {
    let total = 0;
    const resultInputs = document.querySelectorAll(
      '.results-form input[id^="result-"][id$="-' +
        playerNum +
        '"]:not([id^="result-name"])'
    );
    resultInputs.forEach((input) => {
      if (input.value !== "") {
        total += parseInt(input.value);
      }
    });
    document.getElementById("total-" + playerNum).value = total;
  }

  function updateWinner() {
    let maxTotal = -1;
    let winnerPlayer = "";

    const totalInputs = document.querySelectorAll('input[id^="total-"]');
    totalInputs.forEach((input) => {
      const playerNum = input.id.split("-")[1];
      const total = parseInt(input.value);

      if (total > maxTotal) {
        maxTotal = total;
        winnerPlayer = playerNum;
      }
    });

    const winnerDiv = document.querySelector(".winner");
    if (winnerDiv) {
      const winnerName =
        document.getElementById(`player-name-${winnerPlayer}`).value ||
        `Player ${winnerPlayer}`;
      winnerDiv.innerHTML = `Winner: ${winnerName} with a total of ${maxTotal} 🎉`;
    }
  }
});
