const mazeContainer = document.querySelector(".maze");
      const mazeCells = [];

      const maze = [
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ];

      const player = {
        row: 0,
        col: 0,
      };

      const goal = {
        row: maze.length - 1,
        col: maze[0].length - 1,
      };

      let isGameRunning = false;

      function createMaze() {
        for (let row = 0; row < maze.length; row++) {
          const mazeRow = [];
          for (let col = 0; col < maze[row].length; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (maze[row][col] === 1) {
              cell.classList.add("obstacle");
            }
            if (row === player.row && col === player.col) {
              cell.classList.add("player");
            }
            if (row === goal.row && col === goal.col) {
              cell.classList.add("goal");
            }
            mazeContainer.appendChild(cell);
            mazeRow.push(cell);
          }
          mazeCells.push(mazeRow);
        }
      }

      function movePlayer(event) {
        if (!isGameRunning) {
          return;
        }

        const key = event.key;
        let newRow = player.row;
        let newCol = player.col;

        if (key === "ArrowUp") {
          newRow--;
        } else if (key === "ArrowDown") {
          newRow++;
        } else if (key === "ArrowLeft") {
          newCol--;
        } else if (key === "ArrowRight") {
          newCol++;
        }

        if (isValidMove(newRow, newCol)) {
          mazeCells[player.row][player.col].classList.remove("player");
          player.row = newRow;
          player.col = newCol;
          mazeCells[player.row][player.col].classList.add("player");

          if (player.row === goal.row && player.col === goal.col) {
            endGame("Congratulations! You reached the goal!");
          }
        }
      }

      function isValidMove(row, col) {
        if (
          row >= 0 &&
          row < maze.length &&
          col >= 0 &&
          col < maze[0].length &&
          maze[row][col] !== 1
        ) {
          return true;
        }
        return false;
      }

      function startGame() {
        if (isGameRunning) {
          return;
        }

        isGameRunning = true;
        document.addEventListener("keydown", movePlayer);
        mazeCells[player.row][player.col].classList.add("animated");
      }

      function endGame(message) {
        isGameRunning = false;
        document.removeEventListener("keydown", movePlayer);
        mazeCells[player.row][player.col].classList.remove("animated");
        alert(message);
        resetGame();
      }

      function resetGame() {
        mazeCells[player.row][player.col].classList.remove("player");
        player.row = 0;
        player.col = 0;
        mazeCells[player.row][player.col].classList.add("player");
      }

      createMaze();