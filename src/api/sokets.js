import io from 'socket.io-client';

const socket = io();

export const setUsers = (callback) => {
    socket.on('ROOM:SET_USERS', callback)
}

export const addMessages = (callback) => {
    socket.on('ROOM:ADD_MESSAGE', callback)
}