import cloneDeep from "lodash.clonedeep";
import React, { useState, useEffect } from "react";
import "./App.css";
import { useEvent, getColors } from "./util";

function App() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [ gameOver , setGameOver] = useState(false);
  //Add numbers - adding 2 random tiles to the grid
  const initialize = () => {
    let newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }
  
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.9 ? 2 : 4;
        added = true;
      }
  
      if(attempts > 50) {
        gridFull = true;
        let gameOver = checkIfGameIsOver();
        if(gameOver) {
          alert("Game Over");
          
        } 
      }
    }
  };
  
  //Swipe left
  const swipeLeft = (temp) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);
    console.table(newArray);
    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (temp) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  //Swipe Right

  const swipeRight = (temp) => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }

    if (temp) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  // Swipe up
  const swipeUp = (temp) => {
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (temp) {
      return b;
    } else {
      setData(b);
    }
  };

  //Swipe down
  const swipeDown = (temp) => {
    console.log(data);
    let b = [...data];
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    console.table("swipe down", JSON.stringify(b));
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (temp) {
      return b;
    } else {
      setData(b);
    }
  };

  /* 
    game is over when all the grids are full
    when all the grids are filled in the up, down ,left and right rows
  */

  const checkIfGameIsOver = () => {

    let checkerLeft = swipeLeft(true);
    console.table(checkerLeft);
    if (JSON.stringify(data) !== JSON.stringify(checkerLeft)) {
      return false;
    }

    let checkerRight = swipeRight(true);
    console.table(checkerRight);
    if (JSON.stringify(data) !== JSON.stringify(checkerRight)) {
      return false;
    }

    let checkerUp = swipeUp(true);
    console.table(checkerUp);
    if (JSON.stringify(data) !== JSON.stringify(checkerUp)) {
      return false;
    }

    let checkerDown = swipeDown(true);
    console.table(checkerDown);
    if (JSON.stringify(data) !== JSON.stringify(checkerDown)) {
      return false;
    }

    return true;
  };

  //Reset the game
  const resetGame = () => {
      const resetGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      addNumber(resetGrid);
      addNumber(resetGrid);
      setData(resetGrid);
  };

  // handle keyevent

  const handlekeyevent = (event) => {
    
    if(gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }
    let gameOverr = checkIfGameIsOver();
    if(gameOverr) {
      alert("Game Over");
      setGameOver(true);
    }
  };

  //loads the component with the initialized data
  useEffect(() => {
    initialize();
  }, []);

  useEvent("keydown", handlekeyevent);

  return (
    <div className="App">
    <div
      style={{
        background: "#AD9D8F",
        width: "max-content",
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      {data.map((row, oneIndex) => {
        return (
          <div style={{ display: "flex" }} key={oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index} />
            ))}
          </div>
        );
      })}
    </div>
    {gameOver && <div>GAME OVER </div>}
    <div
      onClick={resetGame}
      style={{
        padding:10,
        background: "#846F5B",
        width:95,
        margin:"auto",
        marginTop: 20,
        borderRadius: 7,
        color:"#E9DBBA",
        fontWeight: "900",
      }}
    >
    NEW GAME
    </div>

    </div>
  );
}


const Block = ({ num }) => {
  const { blockStyle } = style;
  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#ffffff",
      }}
    >
      {num !== 0 ? num : ""}
      
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
};

export default App;
