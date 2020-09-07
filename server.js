const express = require('express');
const app = express();
const path = require('path');

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
        )],
        ['newsList', new Map([
            [123141242412, {
                title: 'aaaa',
                content: 'AAAAAaaaAAAAaaaaa',
                postId: 123141242412,
                raiting: [1,2,3,4,5,]
            }],
            [123141321412, {
                title: 'accaaa',
                content: 'AAAAAaaaAAAAaaaccccaa',
                postId: 123141321412,
                raiting: [1,2,3,4,5,6,7,9,'odealo']
            }],
            [333141321412, {
                title: 'abbaaa',
                content: 'AAAAAaaaAAAAaaaabbbba',
                postId: 333141321412,
                raiting: [1,2,3,4,5]
            }],
        ])]
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
        ['messages', [
            {
                roomId: 'work',
                name: 'Bruce Wayne',
                text: 'Как успехи?',
                messageId: '2873619554907',
            },
            {
                roomId: 'work',
                name: 'So cuty rainbow unicorn',
                text: 'Знаешь...ну вот например заходишь в дом, где неделю жили дети без родителей после вечеринки...заходишь и думаешь:" ну его нахер убирать" и выходишь на улицу. потом все-таки думаешь, что надо убрать..возвращаешься и убираешь первые пару бутылок, смотришь опять на все вцелом и думаешь "нет, таки нахер это" и опять выходишь на улицу и куришь...собираешься с мыслями, что надо убрать и опять 5 мин убираешь и все еще в ужасе выходишь на улицу посмотреть, что есть еще жизнь нормальная...и такими итерациями пока не уберешь. вот так и у меня сейчас с моим кодом...',
                messageId: '287366737907',
            },
        ]]
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
        console.log(socket.id, ' connected the lobby')
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
            postId: timeId,
            raiting: [],
        };
        rooms.get('lobby').get('newsList').set(post.timeId, post);
        const newsList = [...rooms.get('lobby').get('newsList').values()].reverse();
        socket.to('lobby').broadcast.emit('GET_NEWS', newsList);
        fn(newsList);
    });

    socket.on('ADD_RAITING', obj=>{
        rooms.get('lobby').get('newsList').get(obj.postId).raiting = obj.raiting;
        const newsList = [...rooms.get('lobby').get('newsList').values()].reverse();
        socket.to('lobby').broadcast.emit('GET_NEWS', newsList);
    })
    
    socket.on('JOIN_ROOM', (obj, fn)=>{
        const { roomId, user } = obj;
        socket.join(roomId);
        console.log(socket.id, ' connected the ', roomId)
        const newUser = {
            name: user.name, 
            avatar: user.avatar,
            id: socket.id,
            room: roomId
        };
        rooms.get(roomId).get('users').set(socket.id, newUser);
        const users = [...rooms.get(roomId).get('users').values()];
        const history = rooms.get(roomId).get('messages');
        fn(history, users);
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
        socket.to(obj.roomId).broadcast.emit('ADD_MESSAGE', message);
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
                console.log(socket.id, ' disconnected')
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