document.getElementById("update-button").addEventListener("click", () => {
  const scoreButton = document.querySelectorAll(".team-score");

  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {};

  Array.from(scoreButton).forEach((button) => {
    button.addEventListener("click", (e) => {
      const team1 = parseInt(e.target.dataset.team1);
      const team2 = parseInt(e.target.dataset.team2);

      ws.send(
        JSON.stringify({
          type: "score",
          team1,
          team2,
        })
      );
    });
  });
});
