import {Square} from "@/components/square/Square";
import {calculateWinner} from "@/helpers/calculateWinner";

export default function Board({ xIsNext, squares, onPlay }) {

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i])
            return;

        const nextSquares = squares.slice();
        nextSquares[i] = "O";
        if (xIsNext)
            nextSquares[i] = "X";

        onPlay(nextSquares);
    }

    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo ? winnerInfo[0] : null;
    const winningLine = winnerInfo ? winnerInfo[1] : [];
    let status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if (winner) {
        status = 'Winner: ' + winner;
        console.log(winningLine);
    }

    const boardRows = [...Array(3).keys()].map((row) => {
        const boardSquares = [...Array(3).keys()].map((col) => {
            const i = 3*row + col;
            return (
                <Square
                    key={i}
                    className="clickable"
                    value={squares[i]}
                    onSquareClick={() => handleClick(i)}
                    winning={winningLine.includes(i)}
                />
            );
        });

        return (
            <div key={row} className="board-row">{boardSquares}</div>
        )
    });

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}
