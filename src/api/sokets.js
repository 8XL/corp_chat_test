import io from 'socket.io-client';

export const socket = io();

export const joinLobby = (user, getUsers, getNews) => {
    socket.emit('JOIN', user, (users, newsList)=>{
        getUsers(users);
        getNews(newsList);
    }); 
    socket.on('GET_ALL', getUsers);
    socket.on('GET_NEWS', getNews);
};

export const addNews = (news, getNews) => {
    socket.emit('ADD_NEWS', news, (newsList)=>{
        getNews(newsList)
    });
};

export const addRaiting = (raiting) => {
    socket.emit('ADD_RAITING', raiting);
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
    socket.on('GET_ALL_ROOM', getUsers);
};

export const sendMessage = (message) =>{
    socket.emit('ADD_MESSAGE', message);
};

export const getMessage = (getMessage) =>{
    socket.on('ADD_MESSAGE', getMessage);
};

export const leaveRoom = (roomId) => {
    socket.emit('leave', roomId);
};