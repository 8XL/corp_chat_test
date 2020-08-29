import React from 'react';

export default function Registration ({ changeForm, submitRegistration }) {

    return (
        <div className='registration-panel'>
            <form id='reg' 
                onChange={ changeForm }
                onSubmit={ submitRegistration }
            >
                <input type='text' className='registration__name' form='reg' name='name' placeholder='Set your name...' required />
                <input type='text' className='registration__login' form='reg' name='login' placeholder='Create your login...' required />
                <input type='password' className='registration__password' form='reg' name='pass' placeholder='Create your pass...' required />
                <input type='password' className='registration__password' form='reg' name='repPass' placeholder='Repeat your pass...' required />
                <input type='submit' className='registration__enter' form='reg' value='Send' />
            </form>
      </div>
    )
}