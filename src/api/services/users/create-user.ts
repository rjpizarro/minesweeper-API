// VENDOR
// @ts-ignore
import catchify from 'catchify'
import bcrypt from 'bcrypt'

// MODELS
import Users from '../../models/users'

const createUser = async (username: string, password: string) => {
    const [genSaltError, salt] = await catchify(bcrypt.genSalt(10))

    if (genSaltError) {
        throw genSaltError
    }

    const [hashError, hash] = await catchify(bcrypt.hash(password, salt))

    if (hashError) {
        throw hashError
    }

    const [error, user] = await catchify(Users.create({username, password: hash}))

    if (error) {
        throw error
    }

    return user
}

export default createUser