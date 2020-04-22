export enum AdjacentPositionEnum {
    UP,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT,
}

export enum BoardValuesEnum {
    UNREVEALED_EMPTY_POSITION = "E",
    UNREVEALED_MINE_POSITION = "M",
    BLANK_REVEALED_POSITION = "B",
    BOMB_REVEALED_POSITION = "X",
    MASKED_POSITION = "[]",
    BOMB_FLAGGED = "F",
    QUESTION_MARK = "F",
}
