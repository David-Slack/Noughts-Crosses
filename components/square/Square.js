export function Square({ value, onSquareClick, winning=false }) {
    let squareClass = "square " +
        (winning ? "winning-square " : "");

    return (
        <button className={`square ${squareClass}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}
