import numpy as np
from numpy import array, max, min



class MinMax:
    def __init__(self):
        self.GameChecker3x3 = {0: array([1, 0, 0, 1, 0, 0, 1, 0]),
                               1: array([1, 0, 0, 0, 1, 0, 0, 0]),
                               2: array([1, 0, 0, 0, 0, 1, 0, 1]),
                               3: array([0, 1, 0, 1, 0, 0, 0, 0]),
                               4: array([0, 1, 0, 0, 1, 0, 1, 1]),
                               5: array([0, 1, 0, 0, 0, 1, 0, 0]),
                               6: array([0, 0, 1, 1, 0, 0, 0, 1]),
                               7: array([0, 0, 1, 0, 1, 0, 0, 0]),
                               8: array([0, 0, 1, 0, 0, 1, 1, 0])}

    @staticmethod
    def getAvailablePositions(board):
        return [index for index, value in enumerate(board) if value == 0]

    def getWinValues(self, board):
        winValues = array([0, 0, 0, 0, 0, 0, 0, 0])
        signedPositions = [(index, value) for index, value in enumerate(board) if value != 0]

        for i, v in signedPositions:
            winValues += self.GameChecker3x3[abs(i)] * v

        return winValues

    @staticmethod
    def isWin(winValues):
        checkX = np.any(winValues == 3)
        checkO = np.any(winValues == -3)
        if checkX and checkO:
            raise ValueError("Invalid board: double win values")
        else:
            return np.any(winValues == -3) * -1 + np.any(winValues == 3)

    def getScore(self, winValues, depth):
        depth = 9 - depth
        score = np.count_nonzero(winValues == 2) * 4 ** depth
        score -= np.count_nonzero(winValues == -2) * 4 ** depth
        score = self.isWin(winValues) * 9 ** (depth+1)
        return score

    def findBestMove(self, board=[0, 0, 0, 0, 0, 0, 0, 0, 0], winValues=None, turn=None, depth=0):
        if winValues is None or turn is None:
            winValues = self.getWinValues(board)
            n_zeros = sum([1 for i in board if i == 0])
            if n_zeros == 0:
                raise ValueError("invalid board: full board")
            turn = (-1) ** (1 + n_zeros)

        availablePositions = self.getAvailablePositions(board)

        isWinValue = self.isWin(winValues)
        if isWinValue != 0:
            return self.getScore(winValues, depth)


        if len(availablePositions) == 0:
            return 0
        scores = []

        for i in availablePositions:
            newBoard = board.copy()
            newBoard[i] = turn

            newWinValues = winValues.copy() + self.GameChecker3x3[i] * turn

            scores += [self.findBestMove(newBoard, newWinValues, -turn, depth + 1)]


        if depth == 0:
            if turn == 1:
                return scores,availablePositions[np.argmax(scores)]
            elif turn == -1:
                return availablePositions[np.argmin(scores)]

        elif turn == 1:
            return max(scores) + sum(np.sign(winValues))
        elif turn == -1:
            return min(scores) + sum(np.sign(winValues))

