import { observable, action, computed, reaction, autorun, get } from 'mobx';

import { getRoom, addUserRoom, addMessages } from '../api/sokets';
import mainStore from './mainStore';

export default class roomStore{

    @observable 
        room = {
            roomId: null,
            user: mainStore.getClient,
            client: null,
            users: [],
            messages: [],
        };

    @action 
        setRoom = (id) => {
            this.room.roomId = id;
            this.connectRoom();
        };

    @action
        fetchRoom = (data) => {
            this.room.users = data.users;
            this.room.messages = data.messages;
        };

    @action 
        setMessage = (newMessage) => {
            this.messages = [...this.messages, newMessage]
        }
    

    @action // не уверен, что здесь нужен декоратор, проверь
        connectRoom = () => {
            addUserRoom(this.room.roomId, this.room.user);
            getRoom(this.room.roomId, this.fetchRoom);
            addMessages(this.room.roomId, this.setMessage);
        };
}