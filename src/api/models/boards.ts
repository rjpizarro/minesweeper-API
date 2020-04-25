import { Document, model, Schema } from "mongoose"
import { BoardType } from '../../libs/minesweeper-engine'

// Schema
const BoardSchema = new Schema({
    belongsToGame: {
        type: Schema.Types.ObjectId,
        required: true
    },
    rows: {
        type: Number,
        default: 9
    },
    cols: {
        type: Number,
        default: 9
    },
    mines: {
        type: Number,
        default: 10
    },
    matrix: {
        type: Array,
    },
    moves: [
        {
            matrixCreated: Array,
            createdAt: Date,
            rowSelected: Number,
            colSelected: Number,
            value: String,
        }
    ]
}, {
    timestamps: true
})

interface BoardSchemaInterface extends Document {
    belongsToGame: string,
    rows: number,
    cols: number,
    mines: number,
    matrix: BoardType,
    moves: [{
        matrixCreated: BoardType,
        createdAt: {
            type: Date,
        },
        rowSelected: number,
        colSelected: number,
        value: string,
    }],
    createdAt: string,
    updatedAt: string,
}

interface BoardInterface extends BoardSchemaInterface {}

export {
    BoardInterface,
}

export default model<BoardInterface>("Board", BoardSchema)