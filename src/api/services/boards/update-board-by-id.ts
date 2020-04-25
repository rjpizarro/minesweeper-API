// VENDOR
// @ts-ignore
import catchify from 'catchify'

// MODELS
import Boards from '../../models/boards'

const updateBoard = async (id: string, payload: any ) => {
    const [error, updatedBoard] = await catchify(
        Boards.findOneAndUpdate(
            {_id: id},
            payload,
            { new: true }
        )
    )

    if (error) {
        throw error
    }

    return updatedBoard
}

export default updateBoard