import React from 'react';
import { connect } from 'react-redux';
import Logo from '@assets/Shift2go.svg';
import UnderLine from '@assets/UnderLine.svg';
import { SignupContainer } from './styles';
import { Link } from 'react-router-dom';
import Input from '@components/home/Input';
import { First, Second } from './components'


export const index = () => {
  const [form, setForm] = React.useState(0);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form == 0) return setForm(1);
    if (form == 1) return setForm(0);
  }
  return (
    <SignupContainer
      className="w-full overflow-hidden
         h-full grid grid-cols-4"
    >
      <div
        className="flex flex-col p-5 col-span-1 left bg-lightBlue 
            h-full w-full"
      >
        <img src={Logo} className="w-32 h-32 logo" />
        <h1 className="heroTitle">
          Create account
          <img src={UnderLine} />
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
            <h2 className="business active">Business Information</h2>
            <h2 className="account">Account Information</h2>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col
        col-span-3 bg-white right items-center"
      >
        <div className="w-full flex flex-row-reverse head">
          <p className="goToLogin">Already have an account,
            <Link to="/login"> Login</Link></p>

        </div>
        {form === 0 ?
          (
            <First onSubmit={onSubmit} />
          ) :
          (
            <Second onSubmit={onSubmit} />
          )}
      </div>
    </SignupContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
