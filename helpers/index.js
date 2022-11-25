function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function generateMembers(membersAmount, dicesAmount) {
  let members = {};

  for (let i = 1; i <= membersAmount; i++) {
    members = {
      ...members,
      [i]: {
        score: 0,
        dicesToPlay: dicesAmount,
        dices: [],
        status: "undone",
      },
    };
  }

  return members;
}

function handleStopGame(members) {
  let counter = 0;
  for (const key in members) {
    const currentMember = members[key];
    if (currentMember.status === "done") {
      counter++;
    }
  }

  const membersAmount = Object.keys(members).length;

  if (membersAmount === counter || membersAmount - counter === 1) {
    return true;
  }

  return false;
}

function getWinner(members) {
  let detail = {
    winner: "",
    score: 0,
  };

  for (const key in members) {
    const currentMember = members[key];
    if (currentMember.score > detail.score) {
      detail = {
        winner: key,
        score: currentMember.score,
      };
    }
  }

  return detail;
}

function printStatistic(members, round, type) {
  const text =
    type === "round" ? `Giliran ${round} lempar dadu:` : "Setelah Evaluasi";

  console.log(text);

  let data = {};
  if (type === "round") {
    for (const key in members) {
      data = {
        ...data,
        [key]: {
          score: members[key].score,
          dices: members[key].dices,
          status: members[key].status,
        },
      };
    }
    console.log(data);
  } else {
    console.log(members);
    console.log("######################################");
  }
}

function getPlayerWhoWillRecieveOnesFromLastPlayer(members) {
  let memberKey = "";
  for (const key in members) {
    const currentMember = members[key];

    if (currentMember.status === "undone") {
      memberKey = key;
      break;
    }
  }

  return memberKey;
}

module.exports = {
  generateRandomNumber,
  generateMembers,
  handleStopGame,
  getWinner,
  printStatistic,
  getPlayerWhoWillRecieveOnesFromLastPlayer,
};
