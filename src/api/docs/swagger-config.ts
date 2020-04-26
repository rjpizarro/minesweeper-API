import {getAllUserGamesDoc, getGameByIdDoc, postGameDoc} from './games'
import { postUserDoc } from './users'
import { postMoveDoc } from './moves'
import { loginDoc, registerDoc } from './auth'

export default {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Minesweeper API Document',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    servers: [
        {
            url: 'http://localhost:8000/api',
            description: 'Local'
        },
        {
            url: 'https://murmuring-basin-21822.herokuapp.com/api',
            description: 'DEV'
        },
    ],
    paths: {
        '/games': {
            get: getAllUserGamesDoc,
            post: postGameDoc,
        },
        '/games/{id}': {
            get: getGameByIdDoc,
        },
        '/moves': { post: postMoveDoc },
        '/users': { post: postUserDoc },
        '/auth/login': { post: loginDoc },
        '/auth/register': { post: registerDoc }
    }
}