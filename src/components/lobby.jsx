import React from 'react';
import { Link } from 'react-router-dom';

export const Lobby = ({ news, userList }) =>{

    return (
        <div className='main-panel'>

            { userList }

            <div className='main-panel__rooms'>
                <div className='main-panel__rooms--buttons'>
                    <Link to='/freedom'><button className='btn'>Комната свободы от забот</button></Link>
                    <Link to='/hardwork'><button className='btn'>Комната забот</button></Link>
                </div>

                { news }

            </div>
      </div>
    )
}
