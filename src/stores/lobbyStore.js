import { observable, action, computed, reaction, autorun } from 'mobx';

export default class lobbyStore {

    @observable 
        users = [];

    @action
        setUsers = (users) => {
            this.users = users;
        };
}