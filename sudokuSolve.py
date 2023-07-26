# -*- coding: utf-8 -*-
"""
Created on Sun Jul  2 20:00:15 2023

@author: piyush
"""

def getInput(sudoku, n):
    print("Enter elements in sudoku:")
    for i in range(n):
        inputs = list(map(str,input().split()))
        for j in range(len(inputs)):
            sudoku[i].append(inputs[j])

def printSudoku(sudoku, n):
    print("Printing elements in sudoku:")
    for i in range(n):
        for j in range(n):
            print(sudoku[i][j], end=" ")
        print()

def isSafe(row, col, val, sudoku, n):
    for i in range(n):
        if sudoku[row][i] == val:
            return False
        if sudoku[i][col] == val:
            return False
        if sudoku[3*(row//3) + i//3][3*(col//3) + i%3] == val:
            return False
    return True

def solve(sudoku, n):
    for i in range(n):
        for j in range(n):
            if sudoku[i][j] == 0:
                for val in range(1, n+1):
                    if isSafe(i, j, val, sudoku, n):
                        sudoku[i][j] = val
                        possible = solve(sudoku, n)
                        if possible:
                            return True
                        else:
                            sudoku[i][j] = 0
                return False
    return True

def isValid(sudoku, n):
    for i in range(n):
        for j in range(n):
            temp = sudoku[i][j]
            if temp == 0:
                continue
            sudoku[i][j] = 0
            if not isSafe(i, j, temp, sudoku, n):
                return False
            sudoku[i][j] = temp
    return True

n = int(input("Enter number of rows and columns: "))
sudoku=[[]]
# sudoku = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
# [5, 2, 0, 0, 0, 0, 0, 0, 0],
# [0, 8, 7, 0, 0, 0, 0, 3, 1],
# [0, 0, 3, 0, 1, 0, 0, 8, 0],
# [9, 0, 0, 8, 6, 3, 0, 0, 5],
# [0, 5, 0, 0, 9, 0, 6, 0, 0],
# [1, 3, 0, 0, 0, 0, 2, 5, 0],
# [0, 0, 0, 0, 0, 0, 0, 7, 4],
# [0, 0, 5, 2, 0, 6, 3, 0, 0],
# ]

getInput(sudoku, n)

printSudoku(sudoku, n)

is_valid = isValid(sudoku, n)
if not is_valid:
    print("Invalid Sudoku")

solve(sudoku, n)
print("Solved sudoku is:")
printSudoku(sudoku, n)
