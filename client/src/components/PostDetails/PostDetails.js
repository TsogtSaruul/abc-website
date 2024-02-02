import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../actions/posts';
import Comments from './Comments/Comments';
import moment from 'moment';
import './styles.css';



const Post = () => {
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	if (!post) return null;

	const openPost = (id) => navigate(`/posts/${id}`);

	if (isLoading) {
		return (
			<div>
				Is Loading...
			</div>
		);
	}

	const recommendedPosts = posts.filter((id) => id !== post._id);


	return (
		<div className='postDetails-container'>
			<div className="postDetails-post-container">
				<div className="postDetails-post-card">
					<div className='postDetails-post'>
						<div className='postDetails-post-image-container'>
							<img src={post?.selectedFile} alt={post?.drink} />
						</div>
						
						<div>
							<p><b>Created by: </b>{post?.name}</p><br />
							
							<h2><b>Drink: </b>{post?.drink}</h2><br />

							<p><b>Category: </b>{post?.category}</p>

							<p><b>Alcoholic: </b>{post?.alcoholic}</p>

							<p><b>Glass: </b>{post?.glass}</p>

							<p><b>Instruction: </b> {post?.instructions}</p>
									
							<p><b>Ingredients: </b> {post?.ingredient1}, {post?.ingredient2}, {post?.ingredient3}</p>
							
							<p><b>Measure: </b>{post?.measure}</p>

							<p><b>Likes: </b>{post?.likes?.length}</p>
							
							<p><b>Created at: </b> {moment(post?.createdAt).fromNow()}</p>
						</div>
					</div>

					<Comments post={post} />
				</div>
			</div>

			{recommendedPosts.length && (
			<div className="recommendedPosts-container">
				<h2>You might also like:</h2>
				<hr />
				{recommendedPosts.map(({ 
					drink, 
					category, 
					alcoholic, 
					glass, 
					instructions, 
					likes, 
					selectedFile, 
					_id 
				}) => (_id !== id) ? (
					<div
						key={_id} 
						className='recommendedPosts-post' 
						onClick={() => openPost(_id)} >
						<img 
							src={selectedFile} 
							className='recommendedPosts-post-image' 
							alt={drink}
						/>

						<div className='recommendedPosts-post-text'>
							<h3>{drink}</h3>
							<p>{category}</p>
							<p>{alcoholic}</p>
							<p>{glass}</p>
							<p>{instructions}</p>
							<p>Likes: {likes.length}</p>
						</div>
					</div>
				): null )}
			</div>
			)}
		</div>
	);
};

export default Post;
