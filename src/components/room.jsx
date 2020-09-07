import React from 'react';
import { observer, inject } from 'mobx-react';

export const Room = inject('roomStore')(observer(({roomStore, name, userList }) => {
    
    React.useEffect(()=>{
        roomStore.setRoom(name);
        return ()=>roomStore.clearRoom();
    },[])

    return (
        <div className='room'>

            { userList }
            
            <div className='room__chat'>
                <div className='room__chat--messages'>

                {
                    roomStore.messages&&roomStore.messages.map((message, i)=>
                    <div 
                        className={
                            `message ${message.name === roomStore.room.client.name 
                                ? 'out' 
                                : 'enter'}`
                        } 
                        key={message.messageId}
                        onClick={()=>roomStore.delMessage(message.messageId, i)}
                    >
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
                        <textarea form='message' name={ name } rows='3' value={roomStore.room.message} placeholder='Ну давай, покажи всем, какой ты умный' />
                        <input type='submit' name={ name } form='message' value='send' onClick={ roomStore.submitForm }/>
                    </form>
                </div>
            </div>
        </div>
    )
}))