import React from 'react';
import './styles.css';


const FormInput = ({ 
		label, 
		name, 
		value, 
		placeholder, 
		handleChange 
	}) => {

	return (
		<div className='formInput-container'>
			
			<label 
				htmlFor={name} 
				className="formInput-label">
				{label}
			</label><br />

			<input 
				className="formInput-input" 
				id={name} 
				name={name}
				required
				placeholder={placeholder}
				value={value} 
				onChange={handleChange}
			/>
		</div>
	)
}

export default FormInput