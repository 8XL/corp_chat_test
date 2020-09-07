import io from 'socket.io-client';

export const socket = io();

export const joinLobby = async (user, getUsers, getNews) => {
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

export const joinRoom = async (user, roomId, getHistory, getUsers) =>{
    const obj = {
        user,
        roomId
    };
    socket.emit('JOIN_ROOM', obj, (history, users) =>{
        getHistory(history);
        getUsers(users);
    });
    socket.on('GET_ALL_ROOM', getUsers);
    socket.on('ADD_MESSAGE', getHistory);
};

export const sendMessage = (message) =>{
    socket.emit('ADD_MESSAGE', message);
};

export const deleteMessage = (messageId) => {
    socket.emit('DEL_MESSAGE', messageId);
}

export const leaveRoom = (roomId) => {
    socket.emit('leave', roomId);
};