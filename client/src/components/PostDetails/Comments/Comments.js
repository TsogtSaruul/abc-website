import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../actions/posts';
import './styles.css';


const Comments = ({ post }) => {
	const user = JSON.parse(localStorage.getItem('profile'));
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState(post?.comments);
	const dispatch = useDispatch();

	const handleComment = async () => {
		const newComments = await dispatch(
			commentPost(`${user?.result?.name}: ${comment}`, post._id)
		);

		setComment('');
		setComments(newComments);
	};


	return (
		<div className="comments-container">
			{user?.result.name && 
			
			<div className='comments-textarea-container'>

				<h2>Write a comment</h2>

				<textarea 
					className='comments-textarea' 
					label="Comment" 
					value={comment} 
					onChange={(e) => setComment(e.target.value)} 
				/>
				<br />

				<button 
					className="comments-textarea-button" 
					type='button'
					disabled={!comment.length} 
					onClick={handleComment}>
					Comment
				</button>
			</div>
			}
			
			<h2>Comments</h2>

			<p>{comments.length === 0 ? 'No comment at the moment...' : null}</p>

			{comments?.map((comment, index) => (
				<div 
					key={index} 
					className="comments-comment" >
					<p>
						<strong>{comment.split(':')[0]}:</strong>
						{comment.split(':')[1]}
					</p>
				</div>
			))}
		</div>
	);
};

export default Comments;
