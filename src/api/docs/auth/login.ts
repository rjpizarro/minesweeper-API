import { badRequestError } from '../error-response'

export default {
    tags: ['Auth'],
    description: "Log in with a register user",
    operationId: 'login',
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            required: true
                        },
                        password: {
                            type: 'string',
                            required: true
                        },
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Logged in user",
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                            },
                            username: {
                                type: 'string',
                            },
                            token: {
                                type: 'string',
                                description: 'JWT token to use in a subsequent request'
                            },
                            createdAt: {
                                type: 'string',
                            },
                        }
                    }
                }
            }
        },
        ...badRequestError
    }
}