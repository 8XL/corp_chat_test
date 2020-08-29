import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { Main, Registration, SignIn } from './components';

const App = inject('formsStore')(observer(({ formsStore }) => {
  
  const [redirect, setRedirect] = React.useState('/');
  //простая авторизация пользователя из localStorage
  React.useEffect(()=>{
    const user = localStorage.getItem('user'); 
    if(user){
      console.log(user);
      setRedirect(redirect=>('/main'));
    } else {
      setRedirect(redirect=>('/signIn'));
    }
  },[]);
   
  const [form, setForm] = React.useState(null);

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if(form.pass===form.repPass){
      const user = {
        name: form.name,
        login: form.login,
        password: form.pass
      };
      localStorage.setItem('user', JSON.stringify(user));
      setRedirect(redirect=>('/'))
    } else {
      alert('The passwords entered do not match. Try again, pls.')
    };
  }

  return (
    <div className="wrapper" onClick={()=>console.log(observer)}>
      <Switch>
        <Route exact path='/main' 
          render={(props)=>
            <Main/> 
        }/>
        <Route exact path='/signIn' render={(props)=>
           <SignIn  /> 
        }/>
        <Route exact path='/registration' render={(props)=>
           <Registration 
            changeForm={ formsStore.changeForm }
            submitRegistration={ handleSubmitRegistration }
          /> 
        }/>
        <Redirect from='/' to={ redirect } />
      </Switch>
    </div>
  );
}))

export default App;
