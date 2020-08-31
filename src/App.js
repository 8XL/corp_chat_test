import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { Lobby, Registration, SignIn } from './components';

const App = inject('mainStore')(observer(({ mainStore }) => {
  
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path='/lobby' 
          render={(props)=>
            <Lobby /> 
        }/>
        <Route exact path='/signIn' render={(props)=>
           <SignIn /> 
        }/>
        <Route exact path='/registration' render={(props)=>
           <Registration /> 
        }/>
        { mainStore.mainRedirect.link&&<Redirect to={mainStore.mainRedirect.link} /> }
      </Switch>
    </div>
  );
}))

export default App;
