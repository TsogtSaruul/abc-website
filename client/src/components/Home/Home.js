import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import Posts from "../Posts/Posts";
import Form from '../Form/Form';
import './styles.css';


const Home = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentId, setCurrentId] = useState(null);

    const searchPost = () => {
        if (search) {
            dispatch(getPostsBySearch(search));
            navigate(`/posts/search?searchQuery=${search}`);
        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          searchPost();
        }
    };

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    

    return (
        <div className="home-container">
            <div className='home-container-left'>
                <div className='home-search'>
                    <h3 className='home-search-title'>
                        Search Your Favorite Cocktail
                    </h3> 

                    <input
                        className='home-search-input'
                        type="search"
                        name='search'
                        id="search"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <Posts setCurrentId={setCurrentId} />
            </div>

            <div className='home-container-right'>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
        </div>
    )
};

export default Home