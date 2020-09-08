import { observable, action } from 'mobx';

import { joinRoom, sendMessage, deleteMessage, leaveRoom } from '../api/sokets';

export default class roomStore{
    constructor(){
        this.joinRoom = joinRoom;
        this.sendMessage = sendMessage;
        this.leaveRoom = leaveRoom;
        this.deleteMessage = deleteMessage;
    }

    @observable 
        room = {
            roomId: null,
            client: null,
            message: '',
        };

    @observable
        users = [];

    @observable
        messages = [];

    @action
        setClient = (client) =>{
            this.room.client = client;
        };

    @action 
        setRoom = (roomId) => {
            this.room.roomId = roomId;
            this.joinRoom(this.room.client, roomId, this.setHistory, this.setUserList)
        };
 
    @action
        setUserList = (users) =>{
            this.users = users;
        };

    @action
        setHistory = (history) => {
            this.messages = history;
        };
    
    @action
        createMessage = (txt) =>{
            const message = {
                roomId: this.room.roomId,
                name: this.room.client.name,
                text: txt
            };
            this.messages.push(message);
            this.sendMessage(message);
        };

    @action
        delMessage = (messageId, i) => {
            if(window.confirm('Вы действительно хотите удалить это вот?')){
                const delObj = {
                    id: messageId,
                    roomId: this.room.roomId
                }
                this.deleteMessage(delObj)
                this.messages.splice(i, 1);
            };
        };

    @action 
        clearRoom = () => {
            this.users = [];
            this.messages = [];
            this.leaveRoom(this.room.roomId);
        };
} 