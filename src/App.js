import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { Lobby, Registration, SignIn, Room, News, UserList } from './components';

const App = inject('mainStore', 'lobbyStore', 'roomStore')(observer(({ mainStore, lobbyStore, roomStore }) => {

  return (
    <div className="wrapper" >
      <Switch>
        <Route exact path='/lobby' 
          render={(props)=>
            <Lobby 
              userList = {
                <UserList 
                  store = { lobbyStore } 
                />
              }
              news = {
                <News/>
              } 
            />
        }/>
        <Route exact path='/signIn' render={(props)=>
           <SignIn /> 
        }/>
        <Route exact path='/registration' render={(props)=>
           <Registration /> 
        }/>
        <Route exact path='/freedom' render={(props)=>
           <Room 
              name={'freedom'}
              userList = {
                <UserList 
                  store = { roomStore } 
                />
              }
            /> 
        }/>
        <Route exact path='/hardwork' render={(props)=>
           <Room 
              name={'work'} 
              userList = {
                <UserList 
                  store = { roomStore } 
                />
              }          
           /> 
        }/>
        { mainStore.mainRedirect.link&&<Redirect to={mainStore.mainRedirect.link} /> }
      </Switch>
    </div>
  );
}))

export default App;
