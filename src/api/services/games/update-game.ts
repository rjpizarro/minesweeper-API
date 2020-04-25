// @ts-ignore
import catchify from 'catchify'

// MODELS
import Games from '../../models/games'

const updateGame = async (id: string, payload: any) => {
    const [error, gameUpdated] = await catchify(
        Games.findOneAndUpdate(
            { _id: id},
            payload,
            {new: true}
        )
    )

    if (error) {
        throw error
    }

    return gameUpdated
}

export default updateGame