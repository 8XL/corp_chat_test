import React from 'react';
import { observer, inject } from 'mobx-react';

export const UserList = inject('lobbyStore', 'roomStore')(observer(({ lobbyStore, roomStore, store }) => {
    return(
        <div className='userlist'>
            {
                store.users.map((user)=>
                    <div className='userlist__user' key={user.id}>
                        <img alt='avatar' src={user.avatar ? user.avatar : 'https://coubsecureassets-a.akamaihd.net/assets/default-avatars/256-f0d0b2891080bf9c2797d255af3027291aef12c38c6d4a88053f223218ba9ebc.png'} />
                        <span>
                            {user.name}
                        </span>
                    </div>
                )
            }
        </div>
    )
}))