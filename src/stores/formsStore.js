import { observable, computed, action } from 'mobx';
import mainStore from './mainStore';

 
export default class formsStore {

  @observable    
    forms = new Map([
      ['newPost', {value:{}}],
      ['signIn', {value:{}}],
      ['reg', {value:{}}],
      ['message', {value:{}}],
    ]);

  @observable
    redirect = false;

  @action
    changeForm = (e) => {
      const id = e.target.form.id;
      const value = e.target.value;
      const name = e.target.name;
      const newValue = this.forms.get(id);

      newValue.value = {
        ...newValue.value,
        [name]: value
      };
    };

  @action 
    submitForm = (e) => {
      e.preventDefault();
      const id = e.target.id;
      let values = this.forms.get(id).value;

      switch(id){
        case 'reg':
          if(values.pass===values.repPass){
            const user = {
              name: values.name,
              login: values.login,
              password: values.pass
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.redirect =  true;
            mainStore.mainRedirect.link = '/lobby';
            mainStore.mainRedirect.isLogged = true;
          } else {
            alert('The passwords entered do not match. Try again, pls.')
          };
            break;
          
          case 'newPost':
            mainStore.newsStore.setNewPost(values);
            values.title = '';
            values.content = '';
            break;
          
          case 'signIn':
            break;
          
          case 'message':
            mainStore.roomStore.createMessage(values.txt);
            values.txt = '';
            break;

          default: 
            return alert('ВСЁ СЛОМАЛОСЬ, БЕГИ!')
        }
        
    }

  @computed 
    get getRedirect(){
      return this.redirect
    };
} 