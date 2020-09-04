const express = require('express');
const app = express();
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

const rooms = new Map([
    ['lobby', new Map([
        ['users', new Map(
            [['asds', {
                name: '8XL',
                avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
            }],
            ['asdaaa', {
                name: 'Bruce Wayne',
                avatar: 'https://i.pinimg.com/originals/fa/d8/91/fad8915570b3aca1c995e3d642801bcb.png'
            }],
            ['asdaddd', {
                name: 'So cuty rainbow unicorn',
                avatar: 'https://img1.pnghut.com/4/21/18/1L1Zs9jTHz/animal-figure-pony-pack-legendary-creature-albom.jpg'
            }]]
        )]
    ])],
    ['freedom', new Map([
        ['users', new Map([['asds', {
            name: '8XL',
            avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
        }],])],
        ['messages', [
            {
                roomId: 'freedom',
                name: 'unknown',
                text: 'i see staaaars...',
                messageId: '28736192379',
            },
            {
                roomId: 'freedom',
                name: '8XL',
                text: 'i see staaaars...',
                messageId: '287361923790',
            },
            {
                roomId: 'freedom',
                name: 'unknown',
                text: 'i see staaaars...',
                messageId: '2873619237907',
            },
        ]]
    ])],
    ['work', new Map([
        ['users', new Map([
            ['asdaaa', {
                name: 'Bruce Wayne',
                avatar: 'https://i.pinimg.com/originals/fa/d8/91/fad8915570b3aca1c995e3d642801bcb.png'
            }],
            ['asdaddd', {
                name: 'So cuty rainbow unicorn',
                avatar: 'https://img1.pnghut.com/4/21/18/1L1Zs9jTHz/animal-figure-pony-pack-legendary-creature-albom.jpg'
            }]
        ])],
        ['messages', []]
    ])]
])
 
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/test', (req, res)=>{return res.send('Hello world')});

io.on('connect', (socket)=>{
    const timeId = Math.floor(new Date().getTime()/10000);

    socket.on('JOIN', (obj, fn)=>{ 
        socket.join('lobby');
        console.log('connected lobby', socket.id)
        const user = {
            name: obj.name, 
            avatar: obj.avatar,
            id: socket.id
        };
        rooms.get('lobby').get('users').set(socket.id, user);
        const users = [...rooms.get('lobby').get('users').values()];
        fn(users);
        socket.to('lobby').broadcast.emit('GET_ALL', users);
    });
    
    socket.on('JOIN_ROOM', (obj, fn)=>{
        const { roomId, user } = obj;
        socket.join(roomId);
        console.log('connected', roomId, socket.id)
        const newUser = {
            name: user.name, 
            avatar: user.avatar,
            id: socket.id,
            room: roomId
        };
        rooms.get(roomId).get('users').set(socket.id, newUser);

        const users = [...rooms.get(roomId).get('users').values()];
        const history = rooms.get(roomId).get('messages');
        fn(history, users)
        socket.to(roomId).broadcast.emit('GET_ALL_ROOM', users);
    });
 
    socket.on('ADD_MESSAGE', (obj)=>{
        
        const messageId = timeId.toString();
        const message = {
            roomId: obj.roomId,
            name: obj.name,
            text: obj.text,
            messageId: messageId,
        };

        rooms.get(obj.roomId).get('messages').push(message);
        console.log(rooms.get(obj.roomId).get('messages'));
        socket.to(obj.roomId).broadcast.emit('ADD_MESSAGE', message);
    });
});
 
server.listen(4000, (err)=>{
    if(err){
        throw Error(err);
    };
    console.log('okaaay, go')
}); 