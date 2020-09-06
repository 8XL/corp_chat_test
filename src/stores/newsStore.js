import { observable, action } from 'mobx';

import { addNews } from '../api/sokets';

export default class newsStore {
    constructor() {
        this.addNews = addNews;
    }

    @observable 
        newsList = [];
    
    @observable
        newPost = {
            title: '',
            content: '',
        }

    @action
        setNewsList = (newsList) => {
            this.newsList = newsList;
        };

    @action
        changeForm = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.newPost = {
                ...this.newPost,
                [name]:[value]
            }
        }

    @action 
        setNewPost = () => {
            addNews(this.newPost);
        }
}