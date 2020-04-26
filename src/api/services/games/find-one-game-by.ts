// VENDOR
// @ts-ignore
import catchify from 'catchify'

// MODELS
import Games from '../../models/games'

const findGame = async (query: any) => {
    const [error, game] = await catchify(Games.findOne(query))

    if (error) {
        throw error
    }

    return game
}

const findBoardFromGame = Games.findBoardFromGame

export {
    findGame,
    findBoardFromGame,
}

export default findGame