import React, { useState } from 'react';

const About: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
    const [isXTurn, setIsXTurn] = useState(true); // Track turns
    const [winner, setWinner] = useState<string | null>(null);

    //const token = localStorage.getItem('authToken');

    //const response = await fetch('your-protected-api-url', {
    //    method: 'GET',
    //    headers: {
    //        'Authorization': `Bearer ${token}`,
    //    },
    //});


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
        if (board[index] || winner) return; // Prevent overwriting or playing after game over

        const newBoard = [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result);
        } else {
            setIsXTurn(!isXTurn); // Switch turns
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXTurn(true);
        setWinner(null);
    }
    return (
        <React.Fragment>
           <h2>Tic Tac Toe Game</h2>
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
                    {winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}
                </div>
            )}
            <button className="reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </React.Fragment>
    );
};

export default About;
