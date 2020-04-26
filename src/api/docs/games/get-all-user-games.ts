import { badRequestError } from '../error-response'

export default {
    tags: ['Games'],
    description: "Returns all user games. A jwt token is required as an authorization header. Otherwise, an empty array will be returned.",
    operationId: 'getAllUserGames',
    responses: {
        "200": {
            description: "A list with user games",
            content: {
                "application/json": {
                    schema: {
                        type: 'array',
                        items: {
                            player: { type: 'string' },
                            board: { type: 'string' },
                            score: {
                                type: 'number',
                                description: 'Total score earn when a game is completed'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date'
                            },
                            createdAt: {
                                type: 'string'
                            },
                            updatedAt: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        },
        ...badRequestError
    }
}