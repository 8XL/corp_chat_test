import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { Lobby, Registration, SignIn, Room} from './components';

const App = inject('mainStore')(observer(({ mainStore }) => {

  return (
    <div className="wrapper" >
      <Switch>
        <Route exact path='/lobby' 
          render={(props)=>
            <Lobby name={'111'} /> 
        }/>
        <Route exact path='/signIn' render={(props)=>
           <SignIn /> 
        }/>
        <Route exact path='/registration' render={(props)=>
           <Registration /> 
        }/>
        <Route exact path='/freedom' render={(props)=>
           <Room name={'flood'} /> 
        }/>
        <Route exact path='/hardwork' render={(props)=>
           <Room name={'work'} /> 
        }/>
        { mainStore.mainRedirect.link&&<Redirect to={mainStore.mainRedirect.link} /> }
      </Switch>
    </div>
  );
}))

export default App;
