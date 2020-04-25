// @ts-ignore
import catchify from 'catchify'

// MODELS
import Games from '../../models/games'

const createGame = async (userId?: string, ) => {
    let newGame = {}

    if (userId) {
        newGame = Object.assign({}, newGame, {player: userId})
    }

    const [error, game] = await catchify(Games.create(newGame))

    if (error) {
        throw error
    }

    return game
}

export default createGame