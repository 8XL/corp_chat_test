import React from 'react';
import { observer, inject } from 'mobx-react';

export const News = inject('newsStore')(observer(({ newsStore }) =>{
    return(
        <div className='news'>
            <div className='news__creator'>
                <form id='newPost' 
                    onChange={ newsStore.changeForm }
                    onSubmit={ newsStore.setNewPost }
                >
                    <input className='news__creator--name' name='title' form='newPost' type='text' placeholder='Названьице...' value={newsStore.newPost.title} required />
                    <textarea className='news__creator--content' name='content' form='newPost' type='text' placeholder='Новостюхи, сплетни, пожелания(не рекомендую), предложения(не-а)...' value={newsStore.newPost.content} required/>
                    <input className='news__creator--submit' type='submit' form='newPost' value='Запостить'/>
                </form>
            </div>
            {
                newsStore.newsList && newsStore.newsList.map(post=>
                    <div className='news__item' key={post.postId}>
                        <div className='news__item--info'>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                        <div className='news--item--raiting' onClick={()=>newsStore.setLike(post)}>
                            <div className={`news__item--raiting-circle ${post.liked && 'disabled'}`}>
                                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.200001 14.52C0.200001 14.2048 0.262079 13.8928 0.38269 13.6016C0.503301 13.3104 0.680084 13.0458 0.902945 12.823C1.12581 12.6001 1.39038 12.4233 1.68156 12.3027C1.97274 12.1821 2.28483 12.12 2.6 12.12C2.91517 12.12 3.22726 12.1821 3.51844 12.3027C3.80962 12.4233 4.0742 12.6001 4.29706 12.823C4.51992 13.0458 4.6967 13.3104 4.81731 13.6016C4.93792 13.8928 5 14.2048 5 14.52V24.12C5 24.7565 4.74714 25.367 4.29706 25.8171C3.84697 26.2672 3.23652 26.52 2.6 26.52C1.96348 26.52 1.35303 26.2672 0.902945 25.8171C0.452857 25.367 0.200001 24.7565 0.200001 24.12V14.52ZM6.6 14.2528V22.9408C6.59972 23.5355 6.76515 24.1185 7.07773 24.6243C7.3903 25.1302 7.83766 25.539 8.3696 25.8048L8.4496 25.8448C9.33742 26.2885 10.3163 26.5197 11.3088 26.52H19.9744C20.7144 26.5203 21.4317 26.2641 22.0041 25.795C22.5765 25.3259 22.9685 24.6729 23.1136 23.9472L25.0336 14.3472C25.1264 13.883 25.115 13.404 25.0003 12.9447C24.8856 12.4854 24.6705 12.0573 24.3703 11.6912C24.0702 11.3251 23.6926 11.0302 23.2647 10.8277C22.8369 10.6251 22.3694 10.5201 21.896 10.52H16.2V4.12001C16.2 3.27132 15.8629 2.45739 15.2627 1.85727C14.6626 1.25716 13.8487 0.920013 13 0.920013C12.5757 0.920013 12.1687 1.08858 11.8686 1.38864C11.5686 1.6887 11.4 2.09567 11.4 2.52001V3.58721C11.4 4.97198 10.9509 6.3194 10.12 7.42721L7.88 10.4128C7.04914 11.5206 6.6 12.868 6.6 14.2528Z" ></path></svg>
                            </div>
                            <div className='news__item--raiting-count'>
                                {post.raiting.length}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}))