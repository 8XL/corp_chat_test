import { observable, computed, action } from 'mobx';
 
export default class formsStore {
  
  @observable    
    form = {
      value: {},
      redirect: false
    };

  @action
    changeForm = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      this.form.value = {
          ...this.form.value,
          [name]:value
      }
      
    }

  @action 
    submitForm = (e) => {
      e.preventDefault();
      if(this.form.pass===this.form.repPass){
        const user = {
          name: this.form.value.name,
          login: this.form.value.login,
          password: this.form.value.pass
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.form.redirect =  true
      } else {
        alert('The passwords entered do not match. Try again, pls.')
      };
    }

  @computed 
    get getRedirect(){
      console.log(this.form.redirect)
      return this.form.redirect
    }
} 