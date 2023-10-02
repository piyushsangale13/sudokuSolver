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


function getInput() {
    const rows = document.querySelectorAll('#grid tr');
    
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll('td input');
        let rowValues = [];
        
        for (let j = 0; j < cells.length; j++) {
            let value = parseInt(cells[j].value);
            rowValues[j] = isNaN(value) ? 0 : value;
        }
        
        sudoku[i] = rowValues;
    }
}


function isSafe(row, col, val, sudoku, n) {
    for (let i = 0; i < n; i++) {
        if (sudoku[row][i] == val) 
            return false;
    
        if (sudoku[i][col] == val) 
            return false;

        if (sudoku[Math.floor(3 * Math.floor(row / 3)) + Math.floor(i / 3)][Math.floor(3 * Math.floor(col / 3)) + (i % 3)] == val) 
            return false;
    }
    return true;
}


function isValid(sudoku, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let temp = sudoku[i][j];
            if (temp == 0) continue;
            sudoku[i][j] = 0;
            if (!isSafe(i, j, temp, sudoku, n) == true) return false;
            sudoku[i][j] = temp;
        }
    }
    return true;
}


function solve(sudoku, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (sudoku[i][j] == 0) {
                for (let val = 1; val <= n; val++) {
                    if (isSafe(i, j, val, sudoku, n) == true) {
                        sudoku[i][j] = val;
                        let possible = solve(sudoku, n);
                        if(possible == true) return true;   
                        else sudoku[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}


function drawsudoku() {
    const is_valid = isValid(sudoku, n);
    if (!is_valid) {
        window.alert("Invalid Sudoku");
        return;
    }
    const check = solve(sudoku, n);
    if(!check){
        window.alert("Cannot Solve Sudoku");
        return;
    }
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell_value = document.getElementById("cell" + row + col);
            cell_value.value = sudoku[row][col];
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

createGrid();
