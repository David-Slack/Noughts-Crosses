"use client"

import Board from "@/components/board/Board";
import {useState} from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description = 'Go to game start';
        if (move > 0)
            description = 'Go to move ' + move;

        return (
            <li key={move}>
                {move === currentMove ?
                    `This is move ${move}`
                    :
                    <button onClick={() => jumpTo(move)}>{description}</button>
                }
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <h2>Game History</h2>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
