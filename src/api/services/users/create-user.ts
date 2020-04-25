// @ts-ignore
import catchify from 'catchify'

// MODELS
import Users from '../../models/users'

const createUser = async (username: string, password: string) => {
    const [error, user] = await catchify(Users.create({username, password}))

    if (error) {
        throw error
    }

    return {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
    }
}

export default createUser