import React from 'react'
import { FaThumbsUp } from 'react-icons/fa';


const Likes = ({ likes, userId }) => {
    if (likes.length > 0) {
        return likes.find((like) => like === userId) ? 
        (
            <>
                <FaThumbsUp />&nbsp;{likes.length > 2 ? 
                `You and ${likes.length - 1} others` : 
                `${likes.length} like${likes.length > 1 ? 's' : ''}` }
            </>
        ) : (
            <>
                <FaThumbsUp />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
            </>
        );
    }

    return <><FaThumbsUp />&nbsp;Like</>;
}

export default Likes