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
        )]
    ])],
    ['freedom', new Map([
        ['users', new Map([['asds', {
            name: '8XL',
            avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
        }],])],
        ['messages', []]
    ])],
    ['work', new Map([
        ['users', new Map()],
        ['messages', []]
    ])]
])

 
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/test', (req, res)=>{return res.send('Hello world')});

io.on('connect', (socket)=>{
    socket.on('JOIN', (obj, fn)=>{ 
        console.log('connected', socket.id)
        socket.join('lobby');
        const user = {
            name: obj.name, 
            avatar: obj.avatar,
            id: socket.id
        };
        rooms.get('lobby').get('users').set(socket.id, user);
        const users = [...rooms.get('lobby').get('users').values()];
        fn(users)
        socket.to('lobby').broadcast.emit('GET_ALL', users);
    })
}) 
 
server.listen(4000, (err)=>{
    if(err){
        throw Error(err);
    };
    console.log('okaaay, go')
});