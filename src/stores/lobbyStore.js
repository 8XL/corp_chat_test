import { observable, action, computed, reaction, autorun } from 'mobx';

import { addUser, getAllUsers } from '../api/sokets'

export default class lobbyStore {
    constructor(){
        
        autorun(()=>{
            getAllUsers(this.setUsers)
        })
    }

    @observable 
        users = [
            {
                name: '8XL',
                avatar: 'https://c7.hotpng.com/preview/17/18/444/finn-the-human-jake-the-dog-character-television-show-adventure-time.jpg'
            },
            {
                name: 'Bruce Wayne',
                avatar: 'https://i.pinimg.com/originals/fa/d8/91/fad8915570b3aca1c995e3d642801bcb.png'
            },
            {
                name: 'So cuty rainbow unicorn',
                avatar: 'https://img1.pnghut.com/4/21/18/1L1Zs9jTHz/animal-figure-pony-pack-legendary-creature-albom.jpg'
            }
        ];

    @action 
        newUser = (user) =>{
            addUser(user);
        };

    @action
        setUsers = (users) => {
            this.users = users;
        };
}