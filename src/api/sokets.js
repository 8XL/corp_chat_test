import io from 'socket.io-client';

const socket = io();

export const addUser = (arg) => {
    socket.emit('JOIN', arg)
}

export const getAllUsers = (callback) => {
    socket.on('GET_ALL_USERS', callback)
}

export const setUser = (callback) => {
    socket.on('SET_USER', callback)
}

export const getRoom = (route, callback) => {
    socket.on(`${route}:GET_ROOM`, callback, route)
}

export const addUserRoom = (route, arg) =>{
    socket.on(`${route}:ADD_USER`, arg, route)
}

export const addMessages = (route, callback) => {
    socket.on(`${route}:ADD_MESSAGE`, callback, route)
}