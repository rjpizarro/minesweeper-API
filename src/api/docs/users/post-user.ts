import { badRequestError } from '../error-response'

export default {
    tags: ['User'],
    description: "Create/Register a new user",
    operationId: 'postUser',
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
            description: "Created user",
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
                        }
                    }
                }
            }
        },
        ...badRequestError
    }
}