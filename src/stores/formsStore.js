import { observable, action } from 'mobx';
 
export default class formsStore {
  
  @observable    
    form = '';

  @action
    changeForm = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      this.form = {
          ...this.form,
          [name]:value
      }
      return this.form
    }
} 