import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const Lobby = inject('lobbyStore', 'roomStore')(observer(({ lobbyStore}) =>{

    return (
        <div className='main-panel'>
            <div className='userlist'>
                {
                    lobbyStore.users.map((user)=>
                        <div className='userlist__user' key={user.name}>
                            <img alt='avatar' src={user.avatar ? user.avatar : 'https://coubsecureassets-a.akamaihd.net/assets/default-avatars/256-f0d0b2891080bf9c2797d255af3027291aef12c38c6d4a88053f223218ba9ebc.png'} />
                            <span>
                                {user.name}
                            </span>
                        </div>
                    )
                }
            </div>
            <div className='main-panel__rooms'>
                <div className='main-panel__rooms--buttons'>
                    <Link to='/freedom'><button className='btn'>Комната свободы от забот</button></Link>
                    <Link to='/hardwork'><button className='btn'>Комната забот</button></Link>
                    <button className='btn'>Комната секретиков</button>
                </div>
            </div>
      </div>
    )
}))

export default Lobby