import { Document, Model, model, Schema } from "mongoose"
import { BoardInterface } from "./boards"
import { UserInterface } from "./users"

// Schema
const GameSchema = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    deletedAt: Date,
}, {
    timestamps: true
})

interface GameSchemaInterface extends Document {
    score: number
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

interface GameInterface extends GameSchemaInterface {
    player: UserInterface["_id"];
    board: BoardInterface["_id"];
}

interface GamePopulatedInterface extends GameSchemaInterface {
    player: UserInterface;
    board: BoardInterface;
}

// Static methods
GameSchema.statics.findGameAndPopulate = async function(id: string) {
    return this.findById(id)
        .populate("board")
        .populate("player")
        .exec()
}

GameSchema.statics.findBoardFromGame = async function(id: string) {
    return this.findById(id).populate("board").exec()
}

GameSchema.statics.findPlayerFromGame = async function(id: string) {
    return this.findById(id).populate("player").exec()
}

interface GameModelInterface extends Model<GameInterface> {
    findGameAndPopulate(id: string): Promise<GamePopulatedInterface>
    findBoardFromGame(id: string): Promise<GamePopulatedInterface>
    findPlayerFromGame(id: string): Promise<GamePopulatedInterface>
}

export {
    GameModelInterface,
    GameInterface,
    GamePopulatedInterface,
}

export default model<GameInterface, GameModelInterface>("Game", GameSchema)