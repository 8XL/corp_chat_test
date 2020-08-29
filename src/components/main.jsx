import React from 'react';

export default function Main () {

    return (
        <div className='main-panel'>
            <div className='userlist'>
                <div className='userlist__user'>
                    <img alt='avatar' />
                    <span>
                    Username111111111111111111
                    </span>
                </div>
                <div className='userlist__user'>
                    <img alt='avatar' />
                    <span>
                    Username
                    </span>
                </div>
                <div className='userlist__user'>
                    <img alt='avatar' />
                    <span>
                    Username
                    </span>
                </div>
            </div>
            <div className='main-panel__rooms'>
                <div className='main-panel__rooms--buttons'>
                    <button className='btn'>Комната свободы от забот</button>
                    <button className='btn'>Комната забот</button>
                    <button className='btn'>Комната секретиков</button>
                </div>
            </div>
      </div>
    )
}