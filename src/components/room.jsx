import React from 'react';
import { observer, inject } from 'mobx-react';

export const Room = inject('roomStore')(observer(({roomStore, name }) => {
    
    return (
        <div className='room'>
            <div className='userlist'>
                <div className='userlist__user' >
                    <img alt='avatar'/>
                    <span>
                    Username 1111111111
                    </span>
                </div>
                <div className='userlist__user' >
                    <img alt='avatar'/>
                    <span>
                    Username
                    </span>
                </div>
                <div className='userlist__user'>
                    <img alt='avatar'/>
                    <span>
                    Username
                    </span>
                </div>
            </div>
            <div className='room__chat'>
                <div className='room__chat--messages'>
                    <div className='message enter'>
                        Name
                        <p>
                            текстик всякий разный 
                        </p>
                        </div>
                    <div className='message enter'>
                        Name2
                        <p>
                            другой всякий разный текстик от другого
                        </p>
                        </div>
                    <div className='message out'>
                        Name3
                        <p>
                            текстик всякий разный но уже от меня
                        </p>
                    </div>
                </div>
                <div className='room__chat--form'>
                    <form id='messaage'>
                        <textarea form='message' rows='2' placeholder='Ну давай, покажи всем, какой ты умный'/>
                        <input type='submit' form='message' value='send' />
                    </form>
                </div>
            </div>
        </div>
    )
}))