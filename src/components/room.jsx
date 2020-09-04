import React from 'react';
import { observer, inject } from 'mobx-react';

export const Room = inject('roomStore')(observer(({roomStore, name }) => {
    
    React.useEffect(()=>{
        roomStore.setRoom(name);
    },[])

    return (
        <div className='room'>
            <div className='userlist'>

            {
                roomStore.users.map((user)=>
                    <div className='userlist__user' key={user.name}>
                        <img alt='avatar' src={user.avatar ? user.avatar : 'https://coubsecureassets-a.akamaihd.net/assets/default-avatars/256-f0d0b2891080bf9c2797d255af3027291aef12c38c6d4a88053f223218ba9ebc.png'} />
                        <span>
                            {user.name}
                        </span>
                    </div>
                )
            }

            </div>
            <div className='room__chat'>
                <div className='room__chat--messages'>

                {
                    roomStore.messages&&roomStore.messages.map(message=>
                    <div className={`message ${message.name === roomStore.room.client.name ? 'out' : 'enter'}`} key={message.messageId}>
                        <span>{message.name}</span>
                        <p>
                            {message.text} 
                        </p>
                    </div>
                )}

                </div>
                <div className='room__chat--form'>
                    <form id='messaage' 
                        onChange = { roomStore.changeMessage }
                    >
                        <textarea form='message' name={ name } rows='3' placeholder='Ну давай, покажи всем, какой ты умный' />
                        <input type='submit' name={ name } form='message' value='send' onClick={ roomStore.submitForm }/>
                    </form>
                </div>
            </div>
        </div>
    )
}))