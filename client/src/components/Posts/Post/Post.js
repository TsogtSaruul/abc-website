import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts';
import Likes from "./Likes/Likes";
import { useNavigate } from 'react-router-dom';
import './styles.css';


const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));
    
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const openPost = () => navigate(`/posts/${post._id}`);

    return (
        <div className="post-container">  
            <div className="post-image-container">

                <img 
                    className="post-image" 
                    src={post?.selectedFile} 
                    alt={post?.drink} 
                    title={post?.drink} 
                    onClick={openPost} 
                />
                
                {(user?.result?._id === post?.creator || user?.result?._id !== undefined ) ? (
                    <button 
                        className="post-like-button"
                        type="button" 
                        onClick={handleLike}>
                        <Likes likes={likes} userId={userId} />
                    </button>
                    ) :
                    (
                    <button 
                        className="post-like-button-disabled"
                        type="button" 
                    >
                        <Likes likes={likes} userId={userId} />
                    </button>
                    )
                }
            </div>

            <div className="post-text-container">

                <p>{post?.name}</p>
                <p>{moment(post.createdAt).fromNow()}</p>
                <h2>{post?.drink}</h2>
                <h4>{post?.category}</h4>
                <p className='co-gray'><i>{post?.alcoholic}</i></p>
                <p>{post?.glass}</p>
                
                <div className="post-text-button-container">
            
                    {(user?.result?._id === post?.creator) ? (
                        <>
                            <button 
                                type="button" 
                                className="post-text-button-update" 
                                onClick={() => setCurrentId(post?._id)}>
                                UPDATE
                            </button>
                            
                            <button 
                                type="button" 
                                className='post-text-button-delete' 
                                onClick={() => dispatch(deletePost(post._id))}>
                                DELETE
                            </button>
                        </>
                    ) : 
                        <>
                            <button 
                                type="button" 
                                disabled
                                className="post-text-button-update-disabled" 
                                >
                                UPDATE
                            </button>
                            
                            <button 
                                type="button" 
                                disabled
                                className='post-text-button-delete-disabled' 
                                >
                                DELETE
                            </button>
                        </>
                    }              
                </div>
            </div>
        </div>
    );
};

export default Post;