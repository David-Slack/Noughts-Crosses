import {Square} from "@/components/square/Square";
import {calculateWinner} from "@/helpers/calculateWinner";

export default function Board({ xIsNext, squares, onPlay }) {

    const boardRows = [...Array(3).keys()].map((row) => {
        const boardSquares = [...Array(3).keys()].map((col) => {
            const i = 3*row + col;
            return (
                <Square
                    key={i}
                    value={squares[i]}
                    onSquareClick={() => handleClick(i)}
                />
            );
        });

        return (
            <div key={row} className="board-row">{boardSquares}</div>
        )
    });

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i])
            return;

        const nextSquares = squares.slice();
        nextSquares[i] = "O";
        if (xIsNext)
            nextSquares[i] = "X";

        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if (winner)
        status = 'Winner: ' + winner;

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}
