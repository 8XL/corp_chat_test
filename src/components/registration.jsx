import React from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';

export const Registration = inject('formsStore')(observer(({ formsStore })=>{
    return (
        <div className='registration-panel'>
            <form id='reg' 
                onChange={ formsStore.changeForm }
                onSubmit={ formsStore.submitForm }
            >
                <input type='text' className='registration__name' form='reg' name='name' placeholder='Set your name...' required />
                <input type='text' className='registration__login' form='reg' name='login' placeholder='Create your login...' required />
                <input type='password' className='registration__password' form='reg' name='pass' placeholder='Create your pass...' required />
                <input type='password' className='registration__password' form='reg' name='repPass' placeholder='Repeat your pass...' required />
                <input type='submit' className='registration__enter' form='reg' value='Send' />
            </form>
            { formsStore.form.redirect && <Redirect to='/' /> }
      </div>
    )
}))

