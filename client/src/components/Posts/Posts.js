import React from "react";
import { useSelector } from "react-redux";
import Post from './Post/Post.js'
import "./styles.css"


const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return 'No posts...';        

    return (
        isLoading ? 
            <div key={ posts.id } className="isLoading">Is Loading...</div> : (
            <div className='posts-container' key={posts.id}>
                
                <div className='posts-container-title'>
                    <h1>Cocktails</h1> 
                </div>

                <div className="posts-container-posts">
                    { posts.map(( post ) => (
                        <div key={ post._id }>
                            <Post post={ post } setCurrentId={ setCurrentId } />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default Posts;