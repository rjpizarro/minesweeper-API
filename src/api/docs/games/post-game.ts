export default {
    tags: ['Games'],
    description: "Post a new game",
    operationId: 'postGame',
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        rows: {
                            type: 'number',
                            required: true
                        },
                        cols: {
                            type: 'number',
                            required: true
                        },
                        mines: {
                            type: 'number',
                            required: true
                        },
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Game created",
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                            },
                            score: { type: 'number' },
                            board: {
                                _id: { type: 'string' },
                                rows: { type: 'number' },
                                cols: { type: 'number' },
                                mines: { type: 'number' },
                                matrix: { type: 'array'},
                                moves: { type: 'array'},
                            },
                        }
                    }
                }
            }
        }
    }
}