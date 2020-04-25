

export default {
    tags: ['Games'],
    description: "Returns one Game by their ID",
    operationId: 'getGameByID',
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
                            // player: {
                            //
                            // },
                            // board: {
                            //
                            // },
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
        }
    }
}