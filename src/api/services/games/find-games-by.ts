// VENDOR
// @ts-ignore
import catchify from 'catchify'

// MODELS
import Games from '../../models/games'

const findGamesBy = async (query: any) => {
    const [error, game] = await catchify(Games.find(query))

    if (error) {
        throw error
    }

    return game
}

export default findGamesBy