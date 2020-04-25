const calculateScore = (
    rows: number,
    cols: number,
    mines: number,
    moves: number
): number => {
    return Math.round((rows * cols * mines) / moves)
}

export default calculateScore