import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from 'react-router-dom';
import Input from "./FormInput/FormInput";
import FileBase from 'react-file-base64';
import './styles.css'

const initialState = {
    drink: '', 
    category: '', 
    alcoholic: '', 
    glass: '', 
    instructions: '', 
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    measure: '',
    selectedFile: '',
}

const Form = ({ currentId, setCurrentId }) => {
    const [formData, setFormData ] = useState(initialState);
    const user = JSON.parse(localStorage.getItem('profile')); 
    const post = useSelector((state) => currentId ? 
        state.posts.posts.find((post) => post._id === currentId) : null)
    // const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const dispatch = useDispatch();
	const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === null) {
            dispatch(createPost({ 
                ...formData, 
                name: user.result.name 
            }, navigate));
        } else {
            dispatch(updatePost(currentId, { 
                ...formData, 
                name: user.result.name 
            }, navigate));
        }
        
        clear();
    };


    const clear = () => {
        // setCurrentId("");
        setCurrentId(null);
        setFormData(initialState);
    };


    const handleChange = (e) => {
		setFormData({ 
            ...formData, 
            [e.target.name] : e.target.value 
        })
	};
    

    useEffect(() => {
        if (!post?.drink) clear();
        if (post) setFormData(post);
    }, [post]);
    

    if (!user?.result) {
        return (
            <div className="form-noshow">
                <h2 className="form-noshow-text">
                    Sign In to create your own drinks and like others' drinks.
                </h2>
            </div>
        );
    };


    return (
        <div className="form-container">
            <form 
                className="form" 
                autoComplete="off" 
                noValidate 
                onSubmit={handleSubmit}>

                <h2 className="form-title">
                    {currentId ? "Editing" : "Create"} a cocktail
                </h2><br />

                <Input 
                    label="Drink:" 
                    name="drink" 
                    placeholder="Drink" 
                    value={formData.drink} 
                    handleChange={handleChange} 
                />                

                <Input 
                    label="Category:" 
                    name="category" 
                    placeholder="Category" 
                    value={formData.category} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Alcoholic:" 
                    name="alcoholic" 
                    placeholder="Alcoholic" 
                    value={formData.alcoholic} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Glass:" 
                    name="glass" 
                    placeholder="Glass" 
                    value={formData.glass} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Instructions:" 
                    name="instructions" 
                    placeholder="Instructions" 
                    value={formData.instructions} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Ingredient #1:" 
                    name="ingredient1" 
                    placeholder="Ingredient #1" 
                    value={formData.ingredient1} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Ingredient #2:" 
                    name="ingredient2" 
                    placeholder="Ingredient #2" 
                    value={formData.ingredient2} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Ingredient #3:" 
                    name="ingredient3" 
                    placeholder="Ingredient #3" 
                    value={formData.ingredient3} 
                    handleChange={handleChange} 
                />

                <Input 
                    label="Measure:" 
                    name="measure" 
                    placeholder="Measure" 
                    value={formData.measure} 
                    handleChange={handleChange} 
                />

                <label 
                    className="form-input-label"
                    htmlFor="fileInput" 
                >
                    Image: 
                </label>
                <br />
                <div 
                    className="form-input-image"    
                    id="fileInput" 
                    name="fileInput">
                    <FileBase 
                        required
                        type="file"
                        multiple={false}
                        onDone={
                            ({ base64 }) => 
                            setFormData({ 
                                ...formData, 
                                selectedFile: base64 
                            })
                        }
                    />
                </div>
                
                <button 
                    className="form-button-submit"
                    type="submit" 
                >
                    Submit
                </button>

                <button 
                    className="form-button-clear" 
                    type="button" 
                    onClick={clear}
                >
                    Clear
                </button>
            </form>
        </div>
    )
}

export default Form;