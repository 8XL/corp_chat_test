import { observable, action, computed, reaction, autorun, get } from 'mobx';


export default class roomStore{

    @observable 
        room = {
            roomId: null,
            client: null,
            users: [],
            messages: [],
        };

    @action
        setClient = (client) =>{
            this.room.client = client;
        }

    @action 
        setRoom = (roomId) => {
            this.room.roomId = roomId;
        };

    @action
        setUserList = (users) =>{
            this.room.users = users;
        }

    @action
        setHistory = (history) => {
            this.room.messages = history;
        }

    @action 
        setMessage = (newMessage) => {
            const message = { 
                name:this.user.name,
                text: newMessage
            };
            this.room.messages = [...this.room.messages, message];
        }
}