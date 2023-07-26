#include <bits/stdc++.h>
using namespace std;

void getInput(vector<vector<int>> &sudoku, int n){
    cout<<"Enter elements in sudoku \n";
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            int input;
            cin>>input;
            sudoku[i][j] = input;
        }
    }
}

void printSudoku(vector<vector<int>> &sudoku, int n){
    cout<<"Printing elements in sudoku \n";
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            cout<<sudoku[i][j]<<" ";
        }
        cout<<endl;
    }
}

bool isSafe(int row, int col, int val, vector<vector<int>> &sudoku, int n){
    for(int i=0; i<n; i++){
        if(sudoku[row][i] == val) return false;

        if(sudoku[i][col] == val) return false;

        if(sudoku[3*(row/3) + i/3][3*(col/3) + i%3] == val) return false;
    }
    return true;
}

bool solve(vector<vector<int>> &sudoku, int n){
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            if(sudoku[i][j] == 0){
                for(int val = 1; val<=n; val++){
                    if(isSafe(i, j, val, sudoku, n)){
                        sudoku[i][j] = val;
                        bool possible = solve(sudoku, n);
                        if(possible) return true;
                        else sudoku[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
bool isValid(vector<vector<int>> &sudoku, int n){

    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            int temp = sudoku[i][j];
            if(temp == 0) continue;
            sudoku[i][j]=0;
            if(!isSafe(i, j, temp, sudoku, n)) return false;
            sudoku[i][j]=temp;
        }
    }
    return true;
}

int main(){
    
    int n;
    cout<<"Enter number of rows and columns"<<endl;
    cin>>n;

    vector<vector<int>> sudoku(n, vector<int> (n,0));
    // vector<vector<int>> sudoku={{3, 0, 6, 5, 0, 8, 4, 0, 0},
    //                             {5, 2, 0, 0, 0, 0, 0, 0, 0},
    //                             {0, 8, 7, 0, 0, 0, 0, 3, 1},
    //                             {0, 0, 3, 0, 1, 0, 0, 8, 0},
    //                             {9, 0, 0, 8, 6, 3, 0, 0, 5},
    //                             {0, 5, 0, 0, 9, 0, 6, 0, 0},
    //                             {1, 3, 0, 0, 0, 0, 2, 5, 0},
    //                             {0, 0, 0, 0, 0, 0, 0, 7, 4},
    //                             {0, 0, 5, 2, 0, 6, 3, 0, 0}};

    getInput(sudoku, n);

    printSudoku(sudoku, n);

    bool is_valid = isValid(sudoku, n);
    if(!is_valid) cout<<"Invalid Sudoku\n";

    solve(sudoku, n);
    cout<<"Solved sudoku is\n";
    printSudoku(sudoku, n);

    return 0;
}

// 1 2 3
// 2 3 1
// 3 1 2
// 3 0 6 5 0 8 4 0 0
// 5 2 0 0 0 0 0 0 0
// 0 8 7 0 0 0 0 3 1
// 0 0 3 0 1 0 0 8 0
// 9 0 0 8 6 3 0 0 5
// 0 5 0 0 9 0 6 0 0
// 1 3 0 0 0 0 2 5 0
// 0 0 0 0 0 0 0 7 4
// 0 0 5 2 0 6 3 0 0