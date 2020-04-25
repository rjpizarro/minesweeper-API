import {getGameByIdDoc, postGameDoc} from './games'
import { postUserDoc } from './users'
import {postMoveDoc} from './moves'

export default {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Minesweeper API Document',
    },
    servers: [
        {
            url: 'http://localhost:8000/api',
            description: 'Local'
        },
        {
            url: 'https://app-dev.herokuapp.com/api',
            description: 'DEV'
        },
    ],
    paths: {
        '/games/{id}': {
            get: getGameByIdDoc,
        },
        '/games': {
            post: postGameDoc,
        },
        '/moves': { post: postMoveDoc },
        '/users': { post: postUserDoc }
    }
}