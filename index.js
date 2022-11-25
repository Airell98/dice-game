const {
  generateRandomNumber,
  generateMembers,
  handleStopGame,
  getWinner,
  printStatistic,
  getPlayerWhoWillRecieveOnesFromLastPlayer,
} = require("./helpers");

//Answer:
function diceGame(membersAmount, dicesAmount) {
  if (membersAmount < 2) {
    return "Permainan tidak dapat dimainkan karena jumlah pemain kurang dari 2 orang";
  }

  if (dicesAmount === 0) {
    return "Permainan tidak dapat dimainkan karena jumlah dadu 0";
  }

  const winNumber = 6;
  let members = generateMembers(membersAmount, dicesAmount);
  let round = 1;

  while (true) {
    //Generate random dices for each player/member
    for (const key in members) {
      const currentMember = members[key];
      for (let i = 0; i < currentMember.dicesToPlay; i++) {
        const randomNumber = generateRandomNumber();
        currentMember.dices.push(randomNumber);
      }
    }

    printStatistic(members, round, "round");

    //Evaluation
    let ones = [];
    for (const key in members) {
      const currentMember = members[key];

      if (currentMember.status === "done") {
        continue;
      }
      let onesFromOpponent = [...ones];
      ones = [];
      let myDicesWithoutOneAndSix = [];
      for (let i = 0; i < currentMember.dices.length; i++) {
        if (currentMember.dices[i] === 1) {
          ones.push(1);
        } else {
          if (currentMember.dices[i] !== winNumber) {
            myDicesWithoutOneAndSix.push(currentMember.dices[i]);
          } else {
            currentMember.score = currentMember.score + 1;
          }
        }
      }
      currentMember.dices = [...myDicesWithoutOneAndSix, ...onesFromOpponent];
      currentMember.dicesToPlay = currentMember.dices.length;
    }

    if (ones.length > 0) {
      const memberKey = getPlayerWhoWillRecieveOnesFromLastPlayer(members);

      members[memberKey].dicesToPlay =
        members[memberKey].dicesToPlay + ones.length;
      members[memberKey].dices = [...members[memberKey].dices, ...ones];
    }

    for (const key in members) {
      const currentMember = members[key];
      if (currentMember.dicesToPlay === 0) {
        currentMember.status = "done";
      }
    }

    //Print evaluation statistics
    printStatistic(members, round, "evaluation");

    const isGameStopped = handleStopGame(members);

    if (isGameStopped) {
      break;
    }

    //Reset dices
    for (const key in members) {
      const currentMember = members[key];

      currentMember.dices = [];
    }

    round++;
  }

  const winner = getWinner(members);

  return `Pemenangnya adalah pemain #${winner.winner} dengan score ${winner.score}`;
}

console.log(diceGame(3, 4));
