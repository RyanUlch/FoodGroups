// CSS Import
import classes from './LoginPage.module.css';
// Library Imports
import { useContext, useState } from 'react';
// Component Imports
import Card from '../../Containers/Card/Card';
import Footer from '../../Containers/Footer/Footer';
// Context Import
import { UserContext } from '../../../Context/user-context';
// Helper Imports
import { getUserAccount, createUserAccount } from '../../../HelperFunctions/account';

// Page allowing user to login, or sign up 
const LoginPage = (props) => {
	const [ctx, ctxDispatch] = useContext(UserContext);
	const [errorLogin, setErrorLogin] = useState(null);
	const [errorSignup, setErrorSignup] = useState(null);

	// Attempt to log in with inputed values
	const loginHandler = (event) => {
		event.preventDefault();
		getUserAccount(
			event.target.children[1].value,	// Username from Form
			event.target.children[3].value, // Password from Form,
			ctx,
			ctxDispatch,
			setErrorLogin,
		);
	};

	// Attempt to sign-up with inputed values
	const signupHandler = (event) => {
		event.preventDefault();
		console.log('here',event.target.children);
		createUserAccount(
			event.target.children[1].value, // Username from Form
			event.target.children[3].value, // E-mail from Form
			event.target.children[5].value, // Password from Form
			ctx,
			ctxDispatch,
			setErrorSignup,
		)
	}

	return (
		<>
			<main className={classes.page}>
				<Card className={classes.card}>
					<h1 className={classes.title}>Food Groups</h1>
					<p className={classes.subtitle}>Recipe sharing with those you care about!</p>
				</Card>
				<section className="login">
					<Card className={classes.card}>
						<h2 className={classes.subtitle}>Login</h2>
						{errorLogin && <p className={classes.error}>{errorLogin}</p>}
						<form  className={classes.form} onSubmit={loginHandler} method="post">
							<label hidden htmlFor="loginusername">Username for Login</label>
							<input className={`${classes.input} ${classes.username}`} autoComplete='username' type="text" name="username" placeholder="Username" id="loginusername" required />
							<label hidden htmlFor="loginpassword">Password for Login</label>
							<input className={`${classes.input} ${classes.password}`} autoComplete='current-password' type="password" name="password" placeholder="Password" id="loginpassword" required />
							<label hidden htmlFor="loginsubmit">Submit button for Login</label>
							<input className={`${classes.input} ${classes.submit}`} type="submit" value="Login" id="loginsubmit" />
						</form>
					</Card>
				</section>

				<section className="signup login">
					<Card className={classes.card}>
						<h2 className={classes.subtitle}>Sign-Up</h2>
						{errorSignup && <p className={classes.error}>{errorSignup}</p>}
						<form className={classes.form} onSubmit={signupHandler} method="post">
							<label hidden htmlFor="signupusername">Username for Sign-Up</label>
							<input className={`${classes.input} ${classes.username}`} autoComplete='username' type="text" name="username" placeholder="Username" id="signupusername" required />
							<label hidden htmlFor="signupemail">Email for Sign-Up</label>
							<input className={`${classes.input} ${classes.email}`} autoComplete='email' type="email" name="email" placeholder="Email" id="signupemail" required />
							<label hidden htmlFor="signuppassword">Password for Sign-up</label>
							<input className={`${classes.input} ${classes.password}`} autoComplete='current-password' type="password" name="password" placeholder="Password" id="signuppassword" required />
							<label hidden htmlFor="signupsubmit">Submit Button for Sign-Up</label>
							<input className={`${classes.input} ${classes.submit}`} type="submit" value="Sign Up" id="signupsubmit"/>
						</form>
					</Card>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default LoginPage;