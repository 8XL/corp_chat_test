import { observable, action, computed, reaction, autorun } from 'mobx';

import formsStore from './formsStore';

class mainStore{

    constructor(){
        this.formsStore = new formsStore();

        autorun(()=>{
            const user = localStorage.getItem('user'); 
            if(user){
                this.main.user = user;
                this.mainRedirect.link = '/lobby';
                this.mainRedirect.islogged = true;
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

};

export default new mainStore();