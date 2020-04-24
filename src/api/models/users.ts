import { Document, model, Schema } from "mongoose"

// Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    deletedAt: Date,
}, {
    timestamps: true
})

interface UserSchemaInterface extends Document {
    username: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

interface UserInterface extends UserSchemaInterface {}

export {
    UserInterface,
}

export default model<UserInterface>("User", UserSchema)