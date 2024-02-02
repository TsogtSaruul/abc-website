import React from 'react';
import './styles.css'


const AuthInput = ({ 
	label, 
	type, 
	name, 
	autoFocus, 
	required, 
	handleChange, 
	handleShowPassword, 
	showPassword, 
	}) => (

	<div className='authInput-container'>
		
		<label 
			htmlFor={name} 
			className="authInput-input-label"
			>
			{label} 
		</label><br />
		
		<div className='authInput-input-container'>
			<input 
				className="authInput-input"
				type={type}
				name={name}
				id={name} 
				autoFocus={autoFocus}
				required={required}
				onChange={handleChange} 
			/>
			{name === 'password' ? (
				<button 
					className="authInput-input-button"
					type='button'
					id='pwdBtn' 
					onClick={handleShowPassword}
				> 
					{ showPassword ? "Hide" : "Show" }
				</button>
			) : null } 
		</div>
	</div>
);

export default AuthInput;





