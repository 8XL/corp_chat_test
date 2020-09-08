import React from 'react';
import { Link } from 'react-router-dom';

export default function SignIn () {

    return (
        <div className='signin-panel'>
            <form id='signIn'>
                <input type='text' className='signin-panel__signlogin' form='signIn' placeholder='Login...'/>
                <input type='password' className='signin-panel__password' form='signIn' placeholder='Password...'/>
                <input type='submit' className='signin-panel__enter' form='signIn' value='Send' />
                <Link to='/registration'>
                    <span>Я тут новенький</span>
                </Link>
            </form>
            
      </div>
    )
}