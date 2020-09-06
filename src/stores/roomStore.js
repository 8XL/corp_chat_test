import { observable, action } from 'mobx';

import { joinRoom, sendMessage, getMessage, leaveRoom } from '../api/sokets'


export default class roomStore{
    constructor(){
        this.joinRoom = joinRoom;
        this.sendMessage = sendMessage;
        this.getMessage = getMessage;
        this.leaveRoom = leaveRoom;
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
            this.getMessage(this.addNewMessage);
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
        changeMessage = (e) => {
            if(e.target.name===this.room.roomId){
                this.room.message = e.target.value;
            };
        };
    
    @action
        submitForm = (e) =>{
            e.preventDefault()
            if(e.target.name===this.room.roomId){
                console.log('сабмитюююююю')
                const message = {
                    roomId: this.room.roomId,
                    name: this.room.client.name,
                    text: this.room.message
                };

                this.sendMessage(message);
                this.addNewMessage(message);
            };
        };

    @action 
        addNewMessage = (message) => {
            if(message.roomId===this.room.roomId){
                this.messages = [...this.messages, message];
            };
        };

    @action 
        clearRoom = () => {
            this.users = [];
            this.messages = [];
            this.leaveRoom(this.room.roomId);
        };
} 