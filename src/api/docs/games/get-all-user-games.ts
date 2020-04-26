import { badRequestError } from '../error-response'

export default {
    tags: ['Games'],
    description: "Returns all user games. A jwt token is required as an authorization header. Otherwise, an empty array will be returned.",
    operationId: 'getAllUserGames',
    security: [ { bearerAuth: [] } ],
    responses: {
        "200": {
            description: "A list with user games",
            content: {
                "application/json": {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                player: { type: 'string' },
                                board: { type: 'string' },
                                score: {
                                    type: 'number',
                                    description: 'Total score earn when a game is completed'
                                },
                                deletedAt: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time'
                                },
                                updatedAt: {
                                    type: 'string',
                                    format: 'date-time'
                                }
                            }
                        }
                    }
                }
            }
        },
        ...badRequestError
    }
}