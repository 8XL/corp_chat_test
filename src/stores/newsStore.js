import { observable, action } from 'mobx';

import { addNews, addRaiting } from '../api/sokets';
import mainStore from './mainStore';

export default class newsStore {
    constructor() {
        this.addNews = addNews;
        this.addRaiting = addRaiting;
    };

    @observable 
        newsList = [];

    @action
        setNewsList = (newsList) => {
            const { name } = mainStore.main.user;
            newsList.forEach(post=>{
                const checker = post.raiting.filter(word=>word===name);
                if(checker.length!==0)post.liked = true; 
            });
            this.newsList = newsList;
        };

    @action 
        setNewPost = (newPost) => { 
            addNews(newPost, this.setNewsList);
        };

    @action
        setLike = (post) => {
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