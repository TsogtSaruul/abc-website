import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import Input from './AuthInput/AuthInput';
import FileBase from 'react-file-base64';
import './styles.css'


const initialState = { 
	firstName: '', 
	lastName: '', 
	email: '', 
	password: '', 
	confirmPassword: '', 
	image: '' 
};


const Auth = () => {
	const [form, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleChange = (e) => setForm({ 
		...form, 
		[e.target.name]: e.target.value 
	});	
	
	const switchMode = () => {
		setForm(initialState);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	function handleSubmit(e) {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(form, navigate));
		} else {
			dispatch(signin(form, navigate));
		}
	};


	return (
		<div className='auth-container'>
			<form className="auth-form" onSubmit={handleSubmit}>

				<h2 className='auth-form-title'>
					{ isSignup ? 'Sign up' : 'Sign in' }
				</h2>
									
				{ isSignup && (
					<>
						<Input 
							label="First name: " 
							type="text" 
							name="firstName" 
							autoFocus="autoFocus" 
							required="required" 
							handleChange={handleChange} 
						/>

						<Input 
							label="Last name: " 
							type="text" 
							name="lastName" 
							required="required" 
							handleChange={handleChange} 
						/>
					</>
				)}
				
				<Input 
					label="E-mail address: " 
					type="email" 
					name="email" 
					required="required" 
					handleChange={handleChange} 
				/>
				
				<Input 
					label="Password: " 
					type={showPassword ? "text" : "password"} 
					name="password" 
					required="required" 
					handleChange={handleChange} 
					showPassword={showPassword} 
					handleShowPassword={handleShowPassword} 
				/>

				{ isSignup && 
					<>
						<Input 
							label="Confirm password: " 
							type={showPassword ? "text" : "password"} 
							name="confirmPassword" 
							required="required" 
							handleChange={handleChange} 
						/>

						<label 
							htmlFor="image" 
							className="auth-form-image-label">
							Image: 
						</label><br />
						<div 
							className="auth-form-image-container" 
							id="image" 
							name="image">
							<FileBase 
								required
								type="file"
								multiple={false}
								onDone={({base64}) => setForm({ 
									...form, 
									image: base64 
								})}
							/>
						</div>
					</>
				}
		
				<button
					type="submit"
					id='Button1'
					className="auth-form-button-signup">
				
					{ isSignup ? 'Sign Up' : 'Sign In' }
				</button>
						
				<button 
					id='Button3' 
					className="auth-form-button-switch"
					onClick={switchMode}>
					
					{ isSignup ? 
						'Already have an account? Sign In' : 
						"Don't have an account? Sign Up" 
					}
				</button>
				
			</form>
		</div>
	);
};

export default Auth;