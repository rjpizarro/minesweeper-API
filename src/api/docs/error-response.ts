const badRequestError = {
    "400": {
        description: "Bad Request",
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'number' },
                        title: { type: 'string' },
                        message: { type: 'string' },
                        stack: { type: 'string' },
                    }
                }
            }
        }
    }
}

const unauthorizedError = {
    "401": {
        description: "Unauthorized",
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        code: { type: 'number' },
                        title: { type: 'string' },
                        message: { type: 'string' },
                    }
                }
            }
        }
    }
}

const forbiddenError = {
    "403": {
        description: "Forbidden",
    }
}

export {
    badRequestError,
    unauthorizedError,
    forbiddenError
}