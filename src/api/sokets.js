import io from 'socket.io-client';

export const socket = io();

export const joinLobby = (user, getUsers) => {
    socket.emit('JOIN', user, getUsers); 
    socket.on('GET_ALL', getUsers)
}

export const joinRoom = (user, roomId, getHistory, getUsers) =>{
    socket.emit('JOIN_ROOM', user, roomId, getHistory, getUsers);
}

export const setMessage = (roomId, message) =>{
    socket.emit('ADD_MESSAGE', roomId, message)
}

// export const getAllUsers = (callback) => {
//     socket.on('GET_ALL_USERS', (users)=> callback(users))
// }

// export const setUser = (callback) => {
//     socket.on('SET_USER', callback)
// }

// export const getRoom = (route, callback) => {
//     socket.on(`${route}:GET_ROOM`, callback, route)
// }

// export const addUserRoom = (route, arg) =>{
//     socket.on(`${route}:ADD_USER`, arg, route)
// }

// export const addMessages = (route, callback) => {
//     socket.on(`${route}:ADD_MESSAGE`, callback, route)
// }
