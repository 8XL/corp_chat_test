import io from 'socket.io-client';

export const socket = io();

export const joinLobby = (user, getUsers) => {
    socket.emit('JOIN', user, getUsers); 
    socket.on('GET_ALL', getUsers);
}

export const joinRoom = (user, roomId, getHistory, getUsers) =>{
    const obj = {
        user,
        roomId
    };
    socket.emit('JOIN_ROOM', obj, (history, users) =>{
        getHistory(history);
        getUsers(users);
    });
    socket.on('GET_ALL_ROOM', getUsers); // на входе в объекте socketID
}

export const sendMessage = (message) =>{
    socket.emit('ADD_MESSAGE', message);
}

export const getMessage = (getMessage) =>{
    socket.on('ADD_MESSAGE', getMessage); // на входе в объекте румID
}

export const leaveRoom = (roomId) => {
    socket.emit('leave', roomId);
}