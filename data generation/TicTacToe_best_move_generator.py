from TicTacToeAI.MinMax import MinMax
import numpy as np
import pandas as pd


def is_win(board):
    for row in range(3):
        if board[row * 3] == board[row * 3 + 1] == board[row * 3 + 2] != 0:
            return True
    for col in range(3):
        if board[col] == board[col + 3] == board[col + 6] != 0:
            return True
    if board[0] == board[4] == board[8] != 0 or board[2] == board[4] == board[6] != 0:
        return True
    return False


def tree_build(board=[0, 0, 0, 0, 0, 0, 0, 0, 0], positions=[[0, 0, 0, 0, 0, 0, 0, 0, 0]], turn=1):
    if board.count(0) == 1:
        return positions
    available = [i for i, v in enumerate(board) if v == 0]

    for i in available:
        newBoard = board.copy()
        newBoard[i] = turn
        if not is_win(newBoard) and newBoard not in positions:
            positions += [newBoard]
            tree_build(newBoard, positions, turn * -1)
    return positions




def convertToCSV(positions):
    engine = MinMax()
    bestMoves = [engine.findBestMove(board) for board in positions]
    positions = np.array(positions)

    data = {}
    for i in range(9):
        data[f'X{i}'] = positions[:, i]

    data["BestMove"] = bestMoves



    df = pd.DataFrame(data)
    df.to_csv('TicTacToeGames.csv', index=False)


if __name__ == '__main__':
    result = tree_build()
    convertToCSV(result)
