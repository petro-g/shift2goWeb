import React from 'react';
import { connect } from 'react-redux';
import Logo from '@assets/Shift2go.svg';
import UnderLine from '@assets/UnderLine.svg';
import { SignupContainer } from './styles';
import Input from '@components/home/Input';
import { First } from './components'
import { Link, useHistory, useLocation } from 'react-router-dom';

interface StateObject {
	[key: string]: any
}

export const index = () => {
	const history = useHistory()
	console.log(history)
	const state: StateObject = history.location.state;
	console.log('state from signup', state)
	const [form, setForm] = React.useState(0);
	const page = state ? state.page : 1;
const onSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	if (form == 0) return setForm(1);
	if (form == 1) return setForm(0);
}
return (
	<SignupContainer className="w-full overflow-hidden h-auto sm:h-full flex flex-col sm:grid sm:grid-cols-4">
		<div className="flex flex-col p-5 col-span-1 sm:left bg-lightBlue h-auto sm:h-full w-full" >
            <Link to="/">
				<img src={Logo} className="w-auto sm:w-32 h-auto sm:h-32 logo" />
			</Link>
			<h1 className="heroTitle mb-3 sm:mb-4">
				{page === 1 ? "Create account" : "Add Hotel"}
				<img className="" src={UnderLine} />
			</h1>

			<div className="w-full grid grid-cols-5">
				<div className="col-span-1 flex flex-col rib">
					<div className="number active">
						<p>1</p>
					</div>

					<div className="line">
					</div>

					<p className="number">2</p>
				</div>
				<div className="col-span-4 flex flex-col">
					<h2 className={page === 1 ? "business active": "business"}>Account Information</h2>
					<h2 className={page === 2 ? "account active": "account"}>Business Information</h2>
				</div>
			</div>
		</div>

		<div className="flex flex-col col-span-3 bg-white right items-center overflow-scroll p-4">
			{page === 1 ?
			<div className="w-full flex flex-row-reverse head already_login">
				<p className="goToLogin">Already have an account,
				<Link to="/login"> Login</Link></p>
			</div> : null}

			<First currentPage={page} />
		</div>
	</SignupContainer>
	);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
