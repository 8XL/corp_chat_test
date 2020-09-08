const data = new Map([
    ['lobby', new Map([
        ['users', new Map(
            [['asds', {
                name: '8XL',
                id: 4412312,
                avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
            }],
            ['asdaaa', {
                name: 'Bruce Wayne',
                id: 4412223,
                avatar: 'https://i.pinimg.com/originals/fa/d8/91/fad8915570b3aca1c995e3d642801bcb.png'
            }],
            ['asdaddd', {
                name: 'So cuty rainbow unicorn',
                id: 4412123123,
                avatar: 'https://img1.pnghut.com/4/21/18/1L1Zs9jTHz/animal-figure-pony-pack-legendary-creature-albom.jpg'
            }]]
        )],
        ['newsList', new Map([
            [123141242412, {
                title: 'Пропала уборщица',
                content: 'В последний раз видели в серверной. Проверьте, авось в проводах запуталась?',
                postId: 123141242412,
                raiting: [1,2]
            }],
            [123141321412, {
                title: 'Отпустим грехи?',
                content: 'Случайно на днях увел из холодильника чей-то тортик...прастити...',
                postId: 123141321412,
                raiting: [1,2,3,4,5,6,7,9,'odealo']
            }],
            [333141321412, {
                title: 'Важнецкая конференция в Гонолулу',
                content: 'Ну, вощем, предлагаю руководству организовать поездку сотрудников в Гонолулу на конференцию.',
                postId: 333141321412,
                raiting: [4, 8, 15, 16, 23, 42, 4, 8, 15, 16, 23, 42,]
            }],
        ])]
    ])],
    ['freedom', new Map([
        ['users', new Map([['asds', {
            name: '8XL',
            id: 123123,
            avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
        }],])],
        ['messages', new Map([
            ['28736192379',{
                roomId: 'freedom',
                name: 'Bunny Bugs',
                text: 'У меня есть сомнения!',
                messageId: '28736192379',
            }],
            ['287361923790',{
                roomId: 'freedom',
                name: 'Bunny Bugs',
                text: 'Я думаю, что моя девушка мне изменила! Это реально проверить? Если её к гинекологу сводить?',
                messageId: '287361923790',
            }],
            ['2873619237907',{
                roomId: 'freedom',
                name: '8XL',
                text: 'Угу, и что он там увидит? Счетчик входящих?',
                messageId: '2873619237907',
            }],
        ])]
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
        ['messages', new Map([
            ['2874449554907', {
                roomId: 'work',
                name: 'Bruce Wayne',
                text: 'Как успехи?',
                messageId: '2874449554907',
            }],
            ['287366737127', {
                roomId: 'work',
                name: 'So cuty rainbow unicorn',
                text: 'Знаешь...ну вот например заходишь в дом, где неделю жили дети без родителей после вечеринки...заходишь и думаешь:" ну его нахер убирать" и выходишь на улицу. потом все-таки думаешь, что надо убрать..возвращаешься и убираешь первые пару бутылок, смотришь опять на все вцелом и думаешь "нет, таки нахер это" и опять выходишь на улицу и куришь...собираешься с мыслями, что надо убрать и опять 5 мин убираешь и все еще в ужасе выходишь на улицу посмотреть, что есть еще жизнь нормальная...и такими итерациями пока не уберешь. вот так и у меня сейчас с моим кодом...',
                messageId: '287366737127',
            }],
        ])]
    ])]
]);

module.exports = data;