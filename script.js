function createGrid() {
    const gridElement = document.getElementById('grid');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.max = 9;
            input.value = 0;
            input.id = `cell${i}${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        gridElement.appendChild(row);
    }
}

createGrid();

function getInput() {
    const rows = document.querySelectorAll('#grid tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const rowValues = [];
        cells.forEach(cell => {
            // if(parseInt(cell.value))
            //     rowValues.push(parseInt(cell.value));
            // else
            //     rowValues.push(0);

            const value = parseInt(cell.value);
            rowValues.push(isNaN(value) ? 0 : value);
        });
        sudoku.push(rowValues);
    });
    // console.log(sudoku); // Here, you can use 'sudoku' in your JavaScript code
}


function isSafe(row, col, val, sudoku, n) {
    for (let i = 0; i < n; i++) {
        if (sudoku[row][i] === val) return false;
        
        if (sudoku[i][col] === val) return false;
        
        if (sudoku[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === val) return false;
    }
    return true;
}

function solve(sudoku, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (sudoku[i][j] === 0) {
                for (let val = 1; val <= n; val++) {
                    if (isSafe(i, j, val, sudoku, n)) {
                        sudoku[i][j] = val;
                        let possible = solve(sudoku, n);
                        if (possible) return true;
                        else sudoku[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(sudoku, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let temp = sudoku[i][j];
            if (temp === 0) continue;
            sudoku[i][j] = 0;
            if (!isSafe(i, j, temp, sudoku, n)) return false;
            sudoku[i][j] = temp;
        }
    }
    return true;
}

function drawsudoku() {
    if (!is_valid){
        window.alert("Invalid Sudoku");
        return;
    }
    for (var row = 0; row < sudoku.length; row++) {
        for (var col = 0; col < sudoku[row].length; col++) {
            var cell = document.getElementById("cell" + row + col);
            cell.value = sudoku[row][col];
        }
    }
}

let n=9;
let sudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let is_valid = isValid(sudoku, n);
if (!is_valid) console.log("Invalid Sudoku");

let check = solve(sudoku, n);
if(!check) console.log("Invalid Sudoku");


