# Корпоративный чат 

![Скриншот главного экрана чата, слева юзер-лист, в центре блок новостей, в верхней части кнопки выбора конмнат](/git/main.png)

Что у нас тут?
-------------------------

    Данное приложение представляет из себя корпоративный чат на время пандемии. 

    Честно говоря чат достаточно простой и без сложных изысков(черновой вариант демки, если уж совсем откровенным), уложившийся в примерный, двенадцати часовой таймлимит. Из интересного - приложение состоит из стейтлесс-компонентов. Есть еще идеи для реализации и позднее я объясню на примере, где и что хотел бы добавить, но пока давайте по порядку:

### <Lobby />
    Главную комнату приложения вы уже видели на основном скриншоте. По большому счету данный компонент представляет из себя обертку с кнопками(они не имеют разумного функционала внутри приложения, засим и не стал их выносить в отдельный компонент). Фактически эти кнопки выступают лишь линками(react-router) для перемещения внутри чата.
![Скриншот кнопок перехода в комнаты чата](/git/buttons.png)

###### Невошедшее

    Изначально кнопки было три(можете ознакомиться в ранних версиях). Планировалось добавить и третью комнату - "Комната секретов". Так как юзерлист хранит объекты не только с данными пользователя, но и его сокетом, то и реализация офера в секретный чат была бы весьма простой, например: 
*socket.to(//socket.id нужного юзера//).emit(//объект с roomId и паролем секретной комнаты//)*. 
    Но время поджимало.

### <UserList />

![Скриншот компонента user-list c отражением пользователей](/git/userList.png)

    Данный компонет представляет из себя простой список пользователей, отражающий всех подключенных юзеров, в зависимости от комнаты. На главной странице отражены все пользователи, находящиеся онлайн независимо от их фактического расположения. В комнатах же отражены только участники чата, подключенные к этой самой комнате.

###### Невошедшее 

    По клику на себя в юзер-листе предполагалась настройка цветовой темы(styled components) и установка аватарки, но, за неимением полноценного сервера(да и качественных знаний по бэкенду), я решил оставить реализацию на конец. Возможно в ближайший свободный вечер этим займусь.

### <News />

![Скриншот компонента news с отражением опубликованных новостей](/git/gossip.png)

    Новости, конечно громко сказанно. 
*Робин Данбар, британский антрополог и эволюционный психолог, специалист в области поведения приматов определил СПЛЕТНИ, как средство социального объединения больших групп.*
    Следуя рекомендациям умных людей, было принято волевое решение реализовать не смайлы/картинки и прочие простые вещи(первое через юникод, второе через вставку ссылочек в `<img>`...да и это всё в телефонах есть...простите за наглость), а реализовать маленький блок внутрикорпоративных сплетен/новостей/идей/пожеланий и прочего, что хотелось бы вынести на рассмотрение общественности.

    Каждая из новостей имеет блок контента и блок рейтинга(лайки). Здесь уже чуть интереснее: на сервере объект новости с массивом пользователей, лайкнувших новость(сейчас объясню). Ввиду простейшей регистрации без соли и хэша, все проверки проводятся через имя пользователя. В данном случае, если массив хранит имя пользователя, значит пользователь уже поставил лайк и более сделать этого не сможет. 
    Так же каждая новость имеет уникальный id, что и позволяет определить на сервере изменения рейтинга касательно определенной новости.

    Блок создания новой новости привязан, как и все формы привязаны к одному стору, но об этом позже.

###### Невошедшее

    Дизлайки и снятие лайка. Реализация простая и ничем не отличает от самого лайка, разве что метод массива меняем на array.splice/filter(еще не определился).

### <Room />

    Здесь все просто и понятно. Уже знакомый юзер-лист, обыкновенная форма отправки. Комната определяется от имени в пропсах.
![Скриншот компонента room freedom с отражением истории чата](/git/room.png)

    Юзер-лист заполняется в зависимости от присутствия в комнате пользователей. 
![Скриншот компонента room work с отражением истории чата](/git/room2.png)

    По клику на любое сообщение предлагается возможность удалить сообщение из чата для всех пользователей.

    При переходе по линке из lobby через хуки запускается заполнение стора в зависимости от выбранной комнаты(work / freedom). Собственно при покидании комнаты стор очищается.

###### Невошедшее

    Удаление сообщений для себя/для всех. 'Для всех' реализовал, 'для себя' сложнее, ибо нужно каждому пользователю в локалсторе(мой слабый бэкенд) сетить массив с удаленными "для себя" сообщениями для их фильтрации. Подобное мне показалось не очень удобным, но более адекватного решения я не придумал.

    Сообщения с отметкой. Тут проще, ибо, как уже упоминалось, идентификаторы пользователей хранятся в списке.

### Stores

    Тут чуть-чуть интереснее. 

    MaineStore инициализирует и прослушивает все остальные сторы. Оснвной упор логики приложения зашит в него: авторизация пользователя, редирект в чат или на регистрацию, инициализация главной комнаты чата и т.д.
    Авторизация(оооочень простая) осуществляется запросом в локалсторэдж. Если пользователь найден по ключу - забиваем пользователя в сторы и переводим на главную чата. В противном же случае оправляем в окно авторизации(не работает за отсутствие сервера), откуда можно перейти в окно регистрации(работает, сетит данные пользователя в локалсторэдж).

    FormsStore отвечает за все формы в приложении. В зависимости от значния атрибута *name* формы в мапу добавляется её знаечени при изменении.
    Еще более коряво выглядит сабмит форм: switch / case, где кейс соответсвует уже упомянотому имени формы. Полность избежать обособленности форм не вышло, ибо сабмит некоторых форм на сервер подразумевает отправку объекта с несколькими значениями. Отсюда выполнение сабмита происходит через вызов метода в нужной сторе. 

    Остальные сторы просты и менее интересны.

### Стек / депсы
Frontend
    -React
    -React-router
    -Mobx
    -Socket.io

Backend
    -Express(проверка сервера)
    -Socket.io
    -Nodemon

Спасибо за внимание...

p.s. Если увидите какие-то зубодробящие ошибки/костыли или еще чего интересного - очень прошу, оставьте комментарий, дабы я знал над чем работать. Спасибо.
