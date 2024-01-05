let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["бастун"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const button7 = document.querySelector("#button7");
const button8 = document.querySelector("#button8");
const button9 = document.querySelector("#button9");
const button10 = document.querySelector("#button10");
const additionalButtons = document.querySelectorAll(".additional-button");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: 'бастун', power: 5 },
  { name: 'сатър', power: 30 },
  { name: 'боздуган', power: 50 },
  { name: 'меч', power: 100 }
];

const monsters = [
  {
    name: "таласъм",
    level: 2,
    health: 15
  },
  {
    name: "караконджул",
    level: 8,
    health: 60
  },
  {
    name: "дракон",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Към магазина", "Към пещерата", "Бий се с дракона"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Ти си в центъра на града. Виждаш знак на който пише \"Магазин\" и табела \"Към пещерата\"."
  },
  {
    name: "store",
    "button text": ["Купи здраве (за 10ж.)", "Купи оръжие (за 30ж.)", "Към центъра"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Ти влезе в магазина."
  },
  {
    name: "cave",
    "button text": ["Бий се с таласъм", "Бий се с караконджул", "Към центъра на града"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Ти влезе в пещерата. Виждаш някакви дзверове."
  },
  {
    name: "fight",
    "button text": ["Атакувай", "Пай се", "Бегаааай"],
    "button functions": [attack, dodge, goTown],
    text: "Ти се биеш с дзверовете."
  },
  {
    name: "kill monster",
    "button text": ["Към центъра", "Оди у центъра", "Абе оди у центъра, бе"],
    "button functions": [easterEgg, easterEgg, easterEgg],
    text: 'Дзвера вика "Майкоу!" и се гътва. Ти печелиш опит и жълтици.'
  },
  {
    name: "lose",
    "button text": ["Опитай пак?", "Пробвай пак?", "Ела ми пак, бе?"],
    "button functions": [restart, restart, restart],
    text: "☠️☠️☠️ Бах те у живота и ти свърши!!! ☠️☠️☠️"
  },
  {
    name: "win",
    "button text": ["Опитай пак?", "Пробвай пак?", "Ела ми пак, бе?"],
    "button functions": [restart, restart, restart],
    text: "🎉 Ти победи дракона! Евала, машина! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Към центъра?"],
    "button functions": [pickOne, pickTwo, pickThree, pickFour, pickFive, pickSix, pickSeven, pickEight, pickNine, goTown],
    text: "Ти откри тайна игра. Избери си число. Пет числа между 1 и 9 ще бъдат избрани случайно. Ако числото, което си избрал съвпада с едно от случайно избраните, печелиш 20 жълтици. Но ако избраното от теб число не е сред случайно избраните, губиш 10 единици от живота си!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = pickFour;
button5.onclick = pickFive;
button6.onclick = pickSix;
button7.onclick = pickSeven;
button8.onclick = pickEight;
button9.onclick = pickNine;
button10.onclick = goTown;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  additionalButtons.forEach(button => {
    button.style.display = "none";
  });
}

function goStore() {
  update(locations[1]);
  text.innerText += " В твоята оръжейна има: " + inventory + ".";
  if (health < 50) {
    text.innerText += " Ама нещо болнав ми изглеждаш, вуйче!";
  } else {
    text.innerText += " И си здрав като бик и почти толкова умен!";
  }
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    if (health < 50) {
      text.innerText = "Сипи, ако нема, донеси.";
    } else {
      text.innerText = "Евалата здравеняк!";
    }
  } else {
    text.innerText = "Е немаш достатъчно жълтици, за да си купиш здраве, баце! Ама споко, то и без това здраве с пари не се купува.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Вече имаш " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В твоята оръжейна има: " + inventory.join(", ") + ".";
    } else {
      text.innerText = "Епа немаш достатъчно жълтици, за да си купиш оръжие, бе прошляк!";
    }
  } else {
    text.innerText = "Ти вече притежаваш най-могъщото оръжие!";
    button2.innerText = "Продай оръжие за 15ж.";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ти продаде " + currentWeapon + ".";
    text.innerText += " В твоята оръжейна имаш: " + inventory;
  } else {
    text.innerText = "Не продавай единственото си оръжие, бе бунак!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "Оня дзвер " + monsters[fighting].name + "а атакува.";
  text.innerText += " Ти го атакуваш с твоят " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Ти пропускаш.";
  }
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;
  if (health <= 0) {
    healthText.innerText = "0";
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Твоят " + inventory.pop() + " се счупи.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Ти се отбраняваш от атаката на " + monsters[fighting].name + "а.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["бастун"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  if (Math.floor(Math.random() * 2) % 2 === 0) {
    update(locations[7]);
    additionalButtons.forEach(button => {
      button.style.display = "inline-block";
    });
  } else {
    goTown();
  }
}

function pickOne() {
  pick(1);
}

function pickTwo() {
  pick(2);
}

function pickThree() {
  pick(3);
}

function pickFour() {
  pick(4);
}

function pickFive() {
  pick(5);
}

function pickSix() {
  pick(6);
}
function pickSeven() {
  pick(7);
}

function pickEight() {
  pick(8);
}

function pickNine() {
  pick(9);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 5) {
    numbers.push(Math.ceil(Math.random() * 9));
  }
  text.innerText = "Ти избра " + guess + ". Това са случайно избраните числа:\n";
  for (let i = 0; i < 5; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Браво! Ти спечели 20 жълтици!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Язък! Ти изгуби 10 единици от здравето си!";
    health -= 10;
    if (health <= 0) {
      healthText.innerText = "0";
      additionalButtons.forEach(b => b.style.display = "none");
      lose();
    } else {
      healthText.innerText = health;
    }
  }
}