// VENDOR
// @ts-ignore
import catchify from 'catchify'

// MODELS
import Users from '../../models/users'

const findUser = async (query: any) => {
    const [error, user] = await catchify(Users.findOne(query))

    if (error) {
        throw error
    }

    return user
}

export default findUser