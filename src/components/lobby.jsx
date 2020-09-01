import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const Lobby = inject('lobbyStore', 'roomStore')(observer(({ lobbyStore, roomStore }) =>{

    const setRoom = (e) =>{
        roomStore.setRoom(e.target.name)
    }
    
    return (
        <div className='main-panel'>
            <div className='userlist'>
                {
                    lobbyStore.users.map((user, index)=>
                        <div className='userlist__user' key={user.name}>
                            <img alt='avatar' src={user.avatar} />
                            <span>
                                {user.name}
                            </span>
                        </div>
                    )
                }
            </div>
            <div className='main-panel__rooms'>
                <div className='main-panel__rooms--buttons'>
                    <Link to='/freedom'><button className='btn' name='freedom' onClick={ setRoom }>Комната свободы от забот</button></Link>
                    <Link to='/hardwork'><button className='btn' name='work' onClick={ setRoom }>Комната забот</button></Link>
                    <button className='btn'>Комната секретиков</button>
                </div>
            </div>
      </div>
    )
}))

export default Lobby