import { observable, action } from 'mobx';

import { addNews, addRaiting } from '../api/sokets';
import mainStore from './mainStore'

export default class newsStore {
    constructor() {
        this.addNews = addNews;
        this.addRaiting = addRaiting;
    };

    @observable 
        newsList = [];
    
    @observable
        newPost = {
            title: '',
            content: '',
        };

    @action
        setNewsList = (newsList) => {
            const { name } = mainStore.main.user;
            newsList.forEach(post=>{
                const checker = post.raiting.filter(word=>word===name);
                if(checker.length!==0)post.liked = true; 
            })
            this.newsList = newsList;
        };

    @action
        changeForm = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.newPost = {
                ...this.newPost,
                [name]:[value]
            };
        };

    @action 
        setNewPost = (e) => {
            e.preventDefault();
            addNews(this.newPost, this.setNewsList);
            this.newPost = {
                title: '',
                content: '',
            }
        };

    @action
        setLike = (post) => {
            console.log(post)
            if(post.liked){
                alert('Низяяяяяя, ты уже лайкал!')
            }else{
                post.raiting.push(mainStore.main.user.name);
                post.liked = true;
                const updRaiting = {
                    raiting: post.raiting,
                    postId: post.postId
                };
                this.addRaiting(updRaiting);
            };
        };
};