import { observable, action } from 'mobx';

export default class lobbyStore {

    @observable 
        users = [];

    @action
        setUsers = (users) => {
            this.users = users;
        };
}