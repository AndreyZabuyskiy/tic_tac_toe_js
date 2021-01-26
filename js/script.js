const btnProceed = document.querySelector("#proceed");
const btnAnew = document.querySelector("#anew");
const buttons = document.querySelector(".buttons");
const score = document.querySelector(".score");
const result = document.querySelector(".result");
let isMovePlayer = true;
let isGame = true;

function getArrField(){
  const selectorField = document.querySelectorAll(".cell");
  return [
    [selectorField[0], selectorField[1], selectorField[2]], 
    [selectorField[3], selectorField[4], selectorField[5]], 
    [selectorField[6], selectorField[7], selectorField[8]]
  ];
};

function isThereClass(classes, nameClass){
  for(let i = 0; i < classes.length; ++i){
    if(classes[i] === nameClass){
      return true;
    }
  }

  return false;
};

let field = {
  allShortcuts: document.querySelectorAll(".cell"),
  arrField: getArrField(),

  Clear(){
    this.allShortcuts.forEach(item => {
      item.innerHTML = "";
      item.classList.remove("cell-victory");
    });
    isMovePlayer = true;
    computer.firstMove = true;
  },

  RemoveClassesX_O(){
    for(let i = 0; i < field.allShortcuts.length; ++i){
      field.allShortcuts[i].classList.remove("X");
      field.allShortcuts[i].classList.remove("O");
    }
  }
};

let player = {
  score: 0,

  move(item){
    item.innerHTML = "<img src='images/крестик.png' alt='' width='80%'>";
    item.classList.add("X");
    isMovePlayer = false;
  }
}

let computer = {
  score: 0,
  firstMove: true,

  move(){
    if(this.firstMove){
      this.makeFirstMove();
      return;
    }

    if(!this.attack()){
      if(!this.protection()){
        this.randomMove();
      }
    };
  },

  makeFirstMove(){
    if(field.allShortcuts[4].innerHTML === ""){
      this.makeMove(field.allShortcuts[4]);
    }else{
      this.randomMove();
    }
    this.firstMove = false;
  },

  attack(){
    if(!this.isAttackHorizontally()){
      if(!this.isAttackVertically()){
        return this.isAttackDiagonals();
      }
    }
    return true;
  },

  protection(){
    if(!this.isProtectionHorizontally()){
      if(!this.isProtectionVertically()){
        return this.isProtectionDiagonals();
      }
    }
    return true;
  },

  randomMove(){
    let isMove = false;
    while(!isMove){
      let moving = Math.floor(Math.random() * 9);
      if(field.allShortcuts[moving].innerHTML === ""){
        this.makeMove(field.allShortcuts[moving]);
        isMove = true;
      }
    }
  },

  isAttackHorizontally(){
    const lineNumber = this.findStringWithMatchingCharsHor("O");

    if(lineNumber !== -1){
      for(let i = 0; i < field.arrField[lineNumber].length; ++i){
        if(field.arrField[lineNumber][i].innerHTML === ""){
          this.makeMove(field.arrField[lineNumber][i]);
          return true;
        }
      }
    }

    return false;
  },

  isAttackVertically(){
    const lineNumber = this.findStringWithMatchingCharsVer("O");
    
    if(lineNumber !== -1){
      for(let i = 0; i < field.arrField[lineNumber].length; ++i){
        if(field.arrField[i][lineNumber].innerHTML === ""){
          this.makeMove(field.arrField[i][lineNumber]);
          return true;
        }
      }
    }

    return false;
  },

  isAttackDiagonals(){
    if(!this.isAttackDiagonalsLeftToRight()){
      return this.isAttackDiagonalsRightToLeft();
    }
    return true;
  },

  isAttackDiagonalsLeftToRight(){
    let count = 0;

    for(let i = 0; i < field.arrField.length; ++i){
      if(isThereClass(field.arrField[i][i].classList, "O")){
        count++;
      }
    }

    if(count == 2){
      for(let i = 0; i < field.arrField.length; ++i){
        if(field.arrField[i][i].innerHTML === ""){
          this.makeMove(field.arrField[i][i]);
          return true;
        }
      }
    }

    return false;
  },

  isAttackDiagonalsRightToLeft(){
    let count = 0;
    let col = 2;

    for(let i = 0; i < field.arrField.length; ++i){
      if(isThereClass(field.arrField[i][col--].classList, "O")){
        count++;
      }
    }

    col = 2;
    if(count == 2){
      for(let i = 0; i < field.arrField.length; ++i){
        if(field.arrField[i][col].innerHTML === ""){
          this.makeMove(field.arrField[i][col]);
          return true;
        }
        col--;
      }
    }

    return false;
  },

  isProtectionHorizontally(){
    const lineNumber = this.findStringWithMatchingCharsHor("X");

    if(lineNumber !== -1){
      for(let i = 0; i < field.arrField[lineNumber].length; ++i){
        if(field.arrField[lineNumber][i].innerHTML === ""){
          this.makeMove(field.arrField[lineNumber][i]);
          return true;
        }
      }
    }

    return false;
  },

  isProtectionVertically(){
    const lineNumber = this.findStringWithMatchingCharsVer("X");

    if(lineNumber !== -1){
      for(let i = 0; i < field.arrField[lineNumber].length; ++i){
        if(field.arrField[i][lineNumber].innerHTML === ""){
          this.makeMove(field.arrField[i][lineNumber]);
          return true;
        }
      }
    }

    return false;
  },

  isProtectionDiagonals(){
    if(!this.isProtectionDiagonalsLeftToRight()){
      return this.isProtectionDiagonalsRightToLeft();
    }
    return true;
  },

  isProtectionDiagonalsLeftToRight(){
    let count = 0;

    for(let i = 0; i < field.arrField.length; ++i){
      if(isThereClass(field.arrField[i][i].classList, "X")){
        count++;
      }
    }

    if(count == 2){
      for(let i = 0; i < field.arrField.length; ++i){
        if(field.arrField[i][i].innerHTML === ""){
          this.makeMove(field.arrField[i][i]);
          return true;
        }
      }
    }

    return false;
  },

  isProtectionDiagonalsRightToLeft(){
    let count = 0;
    let col = 2;

    for(let i = 0; i < field.arrField.length; ++i){
      if(isThereClass(field.arrField[i][col--].classList, "X")){
        count++;
      }
    }

    col = 2;
    if(count == 2){
      for(let i = 0; i < field.arrField.length; ++i){
        if(field.arrField[i][col].innerHTML === ""){
          this.makeMove(field.arrField[i][col]);
          return true;
        }
        col--;
      }
    }

    return false;
  },

  makeMove(item){
    item.innerHTML = "<img src='images/нолик.png' alt='' width='80%'>";
    item.classList.add("O");
    isMovePlayer = true;
  },

  findStringWithMatchingCharsHor(char){
    for(let i = 0; i < field.arrField.length; ++i){
      let count = 0;

      for(let j = 0; j < field.arrField[i].length; ++j){
        if(isThereClass(field.arrField[i][j].classList, char)){
          count++;
        }
      }

      if(count === 2) 
        return i;
    }

    return -1;
  },

  findStringWithMatchingCharsVer(char){
    for(let i = 0; i < field.arrField.length; ++i){
      let count = 0;

      for(let j = 0; j < field.arrField[i].length; ++j){
        if(isThereClass(field.arrField[j][i].classList, char)){
          count++;
        }
      }

      if(count === 2) 
        return i;
    }

    return -1;
  }
};

let gameMove = {
  winComb: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ],

  isVictoryAndDraw(){
    if(!this.isDraw()){
      return this.isVictory();
    }
    
    this.displayDraw();
    return true;
  },

  isDraw(){
    for(let i = 0; i < field.allShortcuts.length; ++i){
      if(field.allShortcuts[i].innerHTML === ""){
        return false;
      }
    }
    return true;
  },

  isVictory(){
    const currentCharacter = !isMovePlayer ? "X" : "O";

    for(let i = 0; i < this.winComb.length; ++i){
      if(isThereClass(field.allShortcuts[this.winComb[i][0]].classList, currentCharacter) &&
        isThereClass(field.allShortcuts[this.winComb[i][1]].classList, currentCharacter) &&
        isThereClass(field.allShortcuts[this.winComb[i][2]].classList, currentCharacter)){
          field.allShortcuts[this.winComb[i][0]].classList.add("cell-victory");
          field.allShortcuts[this.winComb[i][1]].classList.add("cell-victory");
          field.allShortcuts[this.winComb[i][2]].classList.add("cell-victory");
          this.displayVictory();
          return true;
      }
    }

    return false;
  },

  displayDraw(){
    result.innerHTML = "Ничья";
    isGame = false;
    buttons.style.display = "block";
    field.RemoveClassesX_O();
  },

  displayVictory(){
    if(!isMovePlayer){
      result.innerHTML = "Победили крестики";
      score.innerHTML = `Счет: ${++player.score} - ${computer.score}`;
    } else{
      result.innerHTML = "Победили нолики";
      score.innerHTML = `Счет: ${player.score} - ${++computer.score}`;
    }

    field.RemoveClassesX_O();
    isGame = false;
    buttons.style.display = "block";
  },
};

field.allShortcuts.forEach(item => {
  item.addEventListener("click", function(){
    if(isGame){
      if(this.innerHTML === ""){
        player.move(this);
        if(!gameMove.isVictoryAndDraw()){
          computer.move();
          gameMove.isVictoryAndDraw();
        }
      }
    }
  })
});

field.allShortcuts.forEach(item => {
  item.addEventListener("mouseover", function(){
    if(isGame){
      this.classList.add("cell-hover");
    }
  })
});

field.allShortcuts.forEach(item => {
  item.addEventListener("mouseout", function(){
    this.classList.remove("cell-hover");
  })
});

btnProceed.addEventListener("click", function(){
  buttons.style.display = "none";
  result.innerHTML = "";
  field.Clear();
  isGame = true;
});

btnAnew.addEventListener("click", function(){
  player.score = 0;
  computer.score = 0;
  score.innerHTML = `Счет: ${player.score} - ${computer.score}`;
  result.innerHTML = "";
  field.Clear();
  isGame = true;
  buttons.style.display = "none";
});
