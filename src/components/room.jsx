import React from 'react';
import { observer, inject } from 'mobx-react';

export const Room = inject('roomStore', 'formsStore')(observer(({roomStore, formsStore, name, userList }) => {
    
    React.useEffect(()=>{
        roomStore.setRoom(name);
        messages.current.scrollTo({
            top: 9999,
            behavior: "smooth"})
        return ()=>roomStore.clearRoom();
    },[])

    const txt = formsStore.forms.get('message').value.txt;
    const messages = React.useRef();

    return (
        <div className='room'>

            { userList }
            
            <div className='room__chat'>
                <div className='room__chat--messages' ref={ messages }>

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
                    <form id='message' 
                        onChange={ formsStore.changeForm }
                        onSubmit={ formsStore.submitForm }
                    >
                        <textarea form='message' name='txt' rows='3' value={ txt } placeholder='Ну давай, покажи всем, какой ты умный' required />
                        <input type='submit' form='message' value='send'/>
                    </form>
                </div>
            </div>
        </div>
    )
}))