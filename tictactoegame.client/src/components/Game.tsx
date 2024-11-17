import React, { useEffect, useState } from 'react';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [players, setPlayers] = useState({ playerX: '', playerO: '' });

    // Fetch players from backend
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5091/api/Users');
                const data = await response.json();
                setPlayers({ playerX: data[0].username, playerO: data[1].username });
            } catch (error) {
                console.error('Failed to fetch players', error);
            }
        };
        fetchPlayers();
    }, []);

    const checkWinner = (newBoard: string[]) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }

        return newBoard.includes(null) ? null : 'Draw';
    };

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsXTurn(!isXTurn);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXTurn(true);
        setWinner(null);
    };

    return (
        <div>
            <h2>Tic Tac Toe Game</h2>
            <div className="players-info">
                <p>Player X: {players.playerX}</p>
                <p>Player O: {players.playerO}</p>
                <p>Current Turn: {isXTurn ? players.playerX : players.playerO}</p>
            </div>
            <div className="board">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        className={`cell ${cell ? 'disabled' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="winner-message">
                    {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner === 'X' ? players.playerX : players.playerO}`}
                </div>
            )}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default Game;
