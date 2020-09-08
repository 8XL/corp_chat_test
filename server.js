const express = require('express');
const app = express();
const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const data = require('./data');

const port = process.env.PORT || 8080;
 
const rooms = data;
 
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/test', (req, res)=>{return res.send('Hello world')});

io.on('connect', (socket)=>{
   
    socket.on('JOIN', (obj, fn)=>{ 
        socket.join('lobby');
        console.log(socket.id, ' connected the lobby');
        const user = {
            name: obj.name, 
            avatar: obj.avatar,
            id: socket.id
        };
        rooms.get('lobby').get('users').set(socket.id, user);

        const users = [...rooms.get('lobby').get('users').values()];
        socket.to('lobby').broadcast.emit('GET_ALL', users);

        const newsList = [...rooms.get('lobby').get('newsList').values()].reverse();
        fn(users, newsList);
    });

    socket.on('ADD_NEWS', (news, fn)=>{
        const post = {
            ...news,
            postId: Math.floor(new Date().getTime()/100).toString(),
            raiting: [],
        };
        rooms.get('lobby').get('newsList').set(post.postId, post);

        const newsList = [...rooms.get('lobby').get('newsList').values()].reverse();
        socket.to('lobby').broadcast.emit('GET_NEWS', newsList);
        fn(newsList);
    });

    socket.on('ADD_RAITING', obj=>{
        rooms.get('lobby').get('newsList').get(obj.postId).raiting = obj.raiting;

        const newsList = [...rooms.get('lobby').get('newsList').values()].reverse();
        socket.to('lobby').broadcast.emit('GET_NEWS', newsList);
    });
    
    socket.on('JOIN_ROOM', async(obj, fn)=>{
        const { roomId, user } = obj;
        socket.join(roomId);
        console.log(socket.id, ' connected the ', roomId);
        const newUser = {
            name: user.name, 
            avatar: user.avatar,
            id: socket.id,
            room: roomId
        };
        rooms.get(roomId).get('users').set(socket.id, newUser);

        const users = [...rooms.get(roomId).get('users').values()];
        const history = [...rooms.get(obj.roomId).get('messages').values()];
        fn(history, users);
        socket.to(roomId).broadcast.emit('GET_ALL_ROOM', users);
    });
 
    socket.on('ADD_MESSAGE', (obj)=>{
        const message = {
            roomId: obj.roomId,
            name: obj.name,
            text: obj.text,
            messageId: Math.floor((new Date().getTime()+1)/100).toString(),
        };
        rooms.get(obj.roomId).get('messages').set(message.messageId, message);

        const messages = [...rooms.get(obj.roomId).get('messages').values()];
        socket.to(obj.roomId).broadcast.emit('ADD_MESSAGE', messages);
    });

    socket.on('DEL_MESSAGE', (obj)=>{
        rooms.get(obj.roomId).get('messages').delete(obj.id);

        const messages = [...rooms.get(obj.roomId).get('messages').values()];
        socket.to(obj.roomId).broadcast.emit('ADD_MESSAGE', messages);
    });

    socket.on('leave', roomId=>{
        socket.leave(roomId, ()=>{
            console.log(socket.id, ' left the ', roomId);
            rooms.get(roomId).get('users').delete(socket.id);

            const users = [...rooms.get(roomId).get('users').values()];
            socket.to(roomId).broadcast.emit('GET_ALL_ROOM', users) ;
        });
    });

    socket.on('disconnect', ()=>{
        rooms.forEach((room, roomId)=> {
            if(room.get('users').delete(socket.id)){
                console.log(socket.id, ' disconnected');

                const users = [...rooms.get(roomId).get('users').values()];
                roomId==='lobby'
                    ? socket.to('lobby').broadcast.emit('GET_ALL', users)
                    : socket.to(roomId).broadcast.emit('GET_ALL_ROOM', users)
            };
        });
    });
    
});
 
server.listen(4000, (err)=>{
    if(err){
        throw Error(err);
    };
    console.log('okaaay, go');
}); 