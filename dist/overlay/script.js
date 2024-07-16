const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  document.getElementById(
    "score-team1"
  ).innerText = `Team 1: ${data.score.team1}`;
  document.getElementById(
    "score-team2"
  ).innerText = `Team 2: ${data.score.team2}`;
  document.getElementById("time").innerText = `Time: ${data.time}`;

  const substitutions = document.getElementById("substitutions");
  substitutions.innerHTML = "Substitutions:";
  data.substitutions.forEach((sub, index) => {
    const subItem = document.createElement("div");
    subItem.innerText = sub;
    substitutions.appendChild(subItem);
  });

  if (data.substitutions.length > 0) {
    setTimeout(() => {
      substitutions.innerHTML = "Substitutions:";
    }, 5000);
  }
};
