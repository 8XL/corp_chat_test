import { observable, action, computed, autorun } from 'mobx';

import formsStore from './formsStore';
import lobbyStore from './lobbyStore';
import roomStore from './roomStore';
import newsStore from './newsStore';
import { joinLobby, getNews } from '../api/sokets'

class mainStore{

    constructor(){
        this.formsStore = new formsStore();
        this.lobbyStore = new lobbyStore();
        this.roomStore = new roomStore();
        this.newsStore = new newsStore();

        this.getLobby = this.lobbyStore.setUsers;
        this.joinLobby = joinLobby;

        this.setNewsList = this.newsStore.setNewsList;
        this.getNews = getNews;

        autorun(()=>{
            const user = localStorage.getItem('user'); 
            if(user){
                const userObj = JSON.parse(user);
                this.setUser(userObj);
                this.roomStore.setClient(userObj);

                this.mainRedirect.link = '/lobby';
                this.mainRedirect.islogged = true;
              
                this.joinLobby(userObj, this.getLobby);
                this.getNews(this.setNewsList);
            } else {
                this.mainRedirect.link = '/signin'
            }
        })
    }

    @observable
        main = {
            user: null,
        }

    @action 
        setUser = (user) =>{
            this.main.user = user;
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