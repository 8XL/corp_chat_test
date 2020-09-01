import { observable, action, computed, reaction, autorun } from 'mobx';

import formsStore from './formsStore';
import lobbyStore from './lobbyStore';
import roomStore from './roomStore'

class mainStore{

    constructor(){
        this.formsStore = new formsStore();
        this.lobbyStore = new lobbyStore();
        this.roomStore = new roomStore()

        autorun(()=>{
            const user = localStorage.getItem('user'); 
            if(user){
                this.main.user = user;
                this.mainRedirect.link = '/lobby';
                this.mainRedirect.islogged = true;
                this.lobbyStore.newUser(user)
            } else {
                this.mainRedirect.link = '/signin'
            }
        })
    }

    @observable
        main = {
            user: null,
        }

    @observable 
        mainRedirect= {
           link: null,
           isLogged: false 
        }

    @computed 
        get getClient(){
            return this.main.user
        }

};

export default new mainStore();