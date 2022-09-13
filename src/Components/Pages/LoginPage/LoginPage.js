// CSS Import
import classes from './LoginPage.module.css';
// Library Imports
import { useContext, useState } from 'react';
// Component Imports
import Card from '../../Containers/Card/Card';
// Context Import
import { UserContext } from '../../../Context/user-context';
// Helper Imports
import { getUserAccount, createUserAccount } from '../../../HelperFunctions/account';

// Page allowing user to login, or sign up 
const LoginPage = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [error, setError] = useState(null);

	// Attempt to log in with inputed values
	const loginHandler = (event) => {
		event.preventDefault();
		getUserAccount(
			event.target.children[1].value,	// Username from Form
			event.target.children[3].value, // Password from Form,
			ctx,
			ctxDispatch,
			setError,
		);
	};

	// Attempt to sign-up with inputed values
	const signupHandler = (event) => {
		event.preventDefault();
		createUserAccount(
			event.target.children[1].value, // Username from Form
			event.target.children[3].value, // E-mail from Form
			event.target.children[5].value, // Password from Form
			ctx,
			ctxDispatch,
			setError,
		)
	}

	return (
		<main className={classes.page}>
			<Card className={classes.card}>
				<h1 className={classes.title}>Food Groups</h1>
				<p className={classes.subtitle}>Recipe sharing with those you care about!</p>
			</Card>
			<section className="login">
				<Card className={classes.card}>
					<h2 className={classes.subtitle}>Login</h2>
					{error && <p className={classes.error}>{error}</p>}
					<form  className={classes.form} onSubmit={loginHandler} method="post">
						<label htmlFor="loginusername">
							<i className="fas fa-user"></i>
						</label>
						<input autoComplete='username' type="text" name="username" placeholder="Username" id="loginusername" required />
						<label htmlFor="loginpassword">
							<i className="fas fa-lock"></i>
						</label>
						<input autoComplete='current-password' type="password" name="password" placeholder="Password" id="loginpassword" required />
						<input type="submit" value="Login" />
					</form>
				</Card>
			</section>

			<section className="signup login">
				<Card className={classes.card}>
					<h2 className={classes.subtitle}>Sign-Up</h2>
					<form className={classes.form} onSubmit={signupHandler} method="post">
						<label htmlFor="signupusername">
							<i className="fas fa-user"></i>
						</label>
						<input autoComplete='username' type="text" name="username" placeholder="Username" id="signupusername" required />
						<label htmlFor="email">
							<i className="fas fa-user"></i>
						</label>
						<input autoComplete='email' type="email" name="email" placeholder="Email" id="email" required />
						
						<label htmlFor="signuppassword">
							<i className="fas fa-lock"></i>
						</label>
						<input autoComplete='current-password' type="password" name="password" placeholder="Password" id="signuppassword" required />
						<input type="submit" value="Sign Up" />
					</form>
				</Card>
			</section>
		</main>
	);
}

export default LoginPage;