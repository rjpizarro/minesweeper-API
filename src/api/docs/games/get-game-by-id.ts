import { badRequestError, unauthorizedError, forbiddenError } from '../error-response'

export default {
    tags: ['Games'],
    description: "Returns one Game by their ID",
    operationId: 'getGameByID',
    security: [ { bearerAuth: [] } ],
    parameters: [{
        name: 'id',
        in: 'path',
        description: 'Game ID',
        required: true,
        schema: {
            type: 'string'
        }
    }],
    responses: {
        "200": {
            description: "Game response",
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        items: {
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
        },
        ...badRequestError,
        ...forbiddenError,
        ...unauthorizedError,
    }
}