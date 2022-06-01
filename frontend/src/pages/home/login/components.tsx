import React, { ReactElement, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import Input from '@components/home/Input';
import Button from '@components/home/Button';
import CheckMark from '@assets/login/checkMark.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { useMergeState, baseUrl } from '../../../utils/helpers';
import Logo from '@assets/Shift2go.svg';
import UnderLine from '@assets/UnderLine.svg';
import { LoginContainer } from './styles';
import Ellipse1Image from '@assets/login/ellipse1.png';
import Ellipse2Image from '@assets/login/ellipse2-image.svg';
import Ellipse3Image from '@assets/login/ellipse3-image.svg';
import Ellipse4Image from '@assets/login/ellipse4-image.svg';
import Ellipse5Image from '@assets/login/ellipse5-image.svg';
import Ellipse6Image from '@assets/login/ellipse6-image.svg';
import Ellipse7Image from '@assets/login/ellipse7-image.svg';
import Pulse from '@assets/pulse.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  goToReset: () => void;
}

export const Login = ({ goToReset }: Props): ReactElement => {
  const [userData, setUserData] = useMergeState({
    username: '',
    password: '',
  });
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [badCredentials, setBadCredentials] = useState('');
  const [pageError, setPageError] = useState('');
  const history = useHistory();
  const [loginLoading, setLoginLoading] = useState(false);

  const signInHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('login')

    if (!userData.username || !userData.password) {
      setFormIncomplete(true);

      setTimeout(() => {
        setFormIncomplete(false);
      }, 3000);
      return;
    }

    setLoginLoading(true);

    let loginUrl = baseUrl + '/v1/auth/login';

    try {
      let res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(userData),
      });

      const response = await res.json();

      if (response.token_type === 'bearer' && response.access_token) {
        setLoginLoading(false);
        // logging in
        console.log(response);

        if (response.user.userType === 'ADMIN') {
          const storage = localStorage;
  
          storage.setItem('token', response.access_token);
          storage.setItem('user', JSON.stringify(response.user));
          history.push('/admin/home');
        } else if (response.user.userType === 'MANAGER') {
          const storage = localStorage;
  
          storage.setItem('token', response.access_token);
          storage.setItem('user', JSON.stringify(response.user));
          const getProfile = () => {
            //   let localToken = localStorage.getItem('token');

            var myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append(
              'Authorization',
              'Bearer ' + response.access_token
            );

            fetch(baseUrl + '/v1/manager/me', {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow',
            })
              .then((response) => response.text())
              .then((result) => {
                const profile = JSON.parse(result);
                sessionStorage.setItem('hotel_id', profile.hotels[0].id);
                //   setProfile(profile);
              })
              .catch((error) => console.log('error', error));
          };
          getProfile();
          history.push('/dashboard');
        } else {
          toast('Please use the mobile app')
        }
        // history.push('/dashboard');
      }

      console.log(response)

      if (response.detail) {
        if (response.detail === 'Please verify you email') {
          setShowRequest(true)
        }
        setLoginLoading(false);
        setBadCredentials(response.detail);
        setTimeout(() => {
          setBadCredentials('');
        }, 4000);
      }
      // if (response.detail === 'Incorrect username or password') {
      //   setLoginLoading(false);
      //   setBadCredentials('Incorrect username or password');
      //   setTimeout(() => {
      //     setBadCredentials('');
      //   }, 4000);
      // }
    } catch (error) {
      console.log(error);
      if (error) {
        setLoginLoading(false);
        setPageError(
          'Something went wrong, please check your network and try again later'
        );
      }
    }
  };

  const requestVerification = async () => {
    toast('Requesting verification email')
    setShowRequest(false)
    let verify = baseUrl + '/v1/auth/verification/request';
    let verify_request = await fetch(verify, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: userData.username
      })
    });
    if (verify_request.ok) {
      if (verify_request.status == 200) {
        toast.success('Email verification sent')
      }
    }
  }

  const logUserIn = (user) => {
    if (user.userType === 'ADMIN') {
      history.push('/admin/home');
    } else if (user.userType === 'MANAGER') {
      history.push('/dashboard');
    }
  };

  useEffect(() => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    if (user && token) {
      console.log(JSON.parse(user));
      logUserIn(JSON.parse(user));
    }
  }, []);

  return (
      <>
        <form className="w-full" onSubmit={signInHandler}>
          <div className="w-full p-4">
            <div className="p-6 bg-white rounded-lg">
              <h1 className='text-3xl font-bold mb-4'>Sign In</h1>

              <div className="mb-4">
                <Input
                    label="Email"
                    onChange={(e) => setUserData({ username: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <Input
                    label="Password"
                    type="password"
                    onChange={(e) => setUserData({ password: e.target.value })}
                />
              </div>
              <div className={showRequest ? 'mb-4 flex justify-between' : 'mb-4 flex justify-end'}>
                {showRequest ?
                <button type="button" onClick={requestVerification} className="forgot font-semibold text-blue-500">
                  Request Verification?
                </button>: null}
                <button type="button" onClick={goToReset} className="forgot font-semibold text-blue-500">
                  Forgot password?
                </button>
              </div>
              <ToastContainer />

              {formIncomplete ? (
                  <div className="text-red-600 center mb-4">
                    {' '}
                    Please fill in all fields{' '}
                  </div>
              ) : null}

              {badCredentials && badCredentials.length ? (
                  <div className="text-red-600 center mb-4"> {badCredentials} </div>
              ) : null}

              {pageError && pageError.length ? (
                  <div className="text-red-600 center mb-4 mx-4"> {pageError} </div>
              ) : null}
              <div className="w-full">
                <div className="lg:mx-12">
                  {loginLoading ? (
                      <button className="w-full px-8 bg-blue-400 rounded-lg py-3" type="submit" disabled={true} >
                        <span>
                          <ClipLoader size={22} color={'#fff'} loading={loginLoading} />
                        </span>
                      </button>
                    )
                      :
                    (
                      <button className="w-full px-8 bg-blue-600 rounded-lg py-3 text-lg text-white" onClick={() => signInHandler} >
                        Login
                      </button>
                    )
                  }
                </div>
              </div>

              {/* <Button isActive={true} onClick={() => signInHandler} type="submit">
                  Login
              </Button> */}

              <p className=" font-light mt-6">
                Don't have an account?
                <Link
                    className="text-blue-500 font-semibold ml-2 hover:text-blue-600"
                    to="/signup"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/*<form className="formHolder p-8 mb-4" onSubmit={signInHandler}>*/}
        {/*  <div className="header">*/}
        {/*    <h1>Sign In</h1>*/}
        {/*  </div>*/}
        {/*  <div className="form-group">*/}
        {/*    <Input*/}
        {/*        label="Email"*/}
        {/*        onChange={(e) => setUserData({ username: e.target.value })}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="form-group">*/}
        {/*    <Input*/}
        {/*        label="Password"*/}
        {/*        type="password"*/}
        {/*        onChange={(e) => setUserData({ password: e.target.value })}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="form-group">*/}
        {/*    <button type="button" onClick={goToReset} className="forgot">*/}
        {/*      Forgot password?*/}
        {/*    </button>*/}
        {/*  </div>*/}

        {/*  {formIncomplete ? (*/}
        {/*      <div className="text-red-600 center mb-4">*/}
        {/*        {' '}*/}
        {/*        Please fill in all fields{' '}*/}
        {/*      </div>*/}
        {/*  ) : null}*/}

        {/*  {badCredentials && badCredentials.length ? (*/}
        {/*      <div className="text-red-600 center mb-4"> {badCredentials} </div>*/}
        {/*  ) : null}*/}

        {/*  {pageError && pageError.length ? (*/}
        {/*      <div className="text-red-600 center mb-4 mx-4"> {pageError} </div>*/}
        {/*  ) : null}*/}
        {/*  <div className="w-full">*/}
        {/*    <div className="lg:mx-12">*/}
        {/*      {loginLoading ? (*/}
        {/*          <button*/}
        {/*              className="w-full px-8 bg-blue-400 rounded-lg py-3"*/}
        {/*              type="submit"*/}
        {/*              disabled={true}*/}
        {/*          >*/}
        {/*      <span>*/}
        {/*        <ClipLoader size={22} color={'#fff'} loading={loginLoading} />*/}
        {/*      </span>*/}
        {/*          </button>*/}
        {/*      ) : (*/}
        {/*          <button*/}
        {/*              className="w-full px-8 bg-blue-600 rounded-lg py-3 text-lg text-white"*/}
        {/*              onClick={() => signInHandler}*/}
        {/*          >*/}
        {/*            Login*/}
        {/*          </button>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  /!* <Button isActive={true} onClick={() => signInHandler} type="submit">*/}
		{/*		Login*/}
		{/*	</Button> *!/*/}

        {/*  <p className=" font-light mt-6">*/}
        {/*    Don't have an account?*/}
        {/*    <Link*/}
        {/*        className="text-blue-500 font-semibold ml-2 hover:text-blue-600"*/}
        {/*        to="/signup"*/}
        {/*    >*/}
        {/*      Sign up*/}
        {/*    </Link>*/}
        {/*  </p>*/}
        {/*</form>*/}
      </>

  );
};

const AuthCard = ({ children }) => {
  return (
      <LoginContainer className="w-full h-full grid grid-cols-12 container md:px-8 lg:flex">
        <div className=" p-5 col-span-12 lg:col-span-5 xl:col-span-7 bg-lightBlue h-full w-full items-start overflow-none">
          <img src={Logo} className="w-32 h-24 logo" />
          <h1 className="heroTitle">
            Find Skilled <strong>Professionals</strong> to <br /> Work in your Hotel <img src={UnderLine} />
          </h1>
          <div className="w-full h-full hidden lg:block flex flex-col relative heroImages" >
            <img className="ellipse-1" src={Ellipse1Image} />
            <img className="ellipse-2" src={Ellipse2Image} />
            {/*<img className="ellipse-3" src={Ellipse3Image} />*/}
            <img className="ellipse-4" src={Ellipse4Image} />
            <img className="ellipse-5" src={Ellipse5Image} />
            <img className="ellipse-6" src={Ellipse6Image} />
            <div className="ellipse-7">
              <img src={Ellipse7Image} />
            </div>
          </div>
        </div>

      <div className="col-span-12 lg:col-span-7 bg-transparent">
        {children}
      </div>
    </LoginContainer>
  );
};

export const Reset = ({ goToReset }: Props): ReactElement => {
  const history = useHistory();
  const [resetEmail, setResetEmail] = useMergeState({
    email: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const resetHandler = async () => {
    if (resetEmail === '' || resetEmail === ' ') {
      setErrorMessage('Please enter a valid email');
      return;
    }
    setResetLoading(true);

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(resetEmail);

    fetch(baseUrl + '/v1/auth/password/reset', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const apiResponse = JSON.parse(result);
        setResetLoading(false);

        if (
          apiResponse.status === 'success' &&
          apiResponse.message ===
            "If email is registered you'll be sent a password reset link"
        ) {
          setSuccessMessage(
            "Success! If email is registered you'll be sent a password reset link"
          );
          setErrorMessage('');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } else {
          setErrorMessage('Something went wrong, please check your connection');
        }
      })
      .catch((error) => {
        setResetLoading(false);
        console.log('error', error);
        setErrorMessage('Something went wrong, please check your connection');
      });
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="p-6 bg-white rounded-lg">
          <h1 className='text-3xl font-bold'>Reset Password</h1>
          <small>
            Please enter your registered Email Address to receive a verification
            code
          </small>

          <div className="my-4">
            <Input
                label="Email Address"
                onChange={(e) => setResetEmail({ email: e.target.value })}
            />
          </div>

          <div className=" w-full flex justify-center mt-6">
            <div className="w-full">
              <div className="lg:mx-6">
                {resetLoading ? (
                    <button
                        className="w-full px-8 bg-blue-400 rounded-lg py-3 mb-6"
                        type="button"
                        disabled={true}
                    >
                  <span>
                    <ClipLoader
                        size={22}
                        color={'#fff'}
                        loading={resetLoading}
                    />
                  </span>
                    </button>
                ) : (
                    <button
                        className="w-full px-8 bg-blue-600 rounded-lg py-3 text-lg text-white mb-6"
                        onClick={resetHandler}
                    >
                      Proceed
                    </button>
                )}
              </div>

              {successMessage && successMessage.length ? (
                  <div className="flex items-center justify-center w-full mr-4">
                    <div className="text-green-600 text-white rounded-full py-3 px-4 w-full text-center my-4">
                      {successMessage}
                    </div>
                  </div>
              ) : null}
              {errorMessage && errorMessage.length ? (
                  <div className="flex items-center justify-center w-full mr-4">
                    <div className="text-red-600 text-white rounded-full py-3 px-4 w-full text-center my-4">
                      {errorMessage}
                    </div>
                  </div>
              ) : null}

              {/* <Button isActive={true} onClick={resetHandler}>
								Proceed
							</Button> */}
            </div>
          </div>
        </div>
      </div>


      {/*<form className="formHolder p-8">*/}
      {/*  <div className="header">*/}
      {/*    <h1>*/}
      {/*      Reset <br />*/}
      {/*      Password*/}
      {/*    </h1>*/}
      {/*    <small>*/}
      {/*      Please enter your registered Email Address to receive a verification*/}
      {/*      code*/}
      {/*    </small>*/}
      {/*  </div>*/}

      {/*  <div className="form-group">*/}
      {/*    <Input*/}
      {/*      label="Email Address"*/}
      {/*      onChange={(e) => setResetEmail({ email: e.target.value })}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className=" w-full flex justify-center px-4">*/}
      {/*    <div className="w-full">*/}
      {/*      <div className="lg:mx-6">*/}
      {/*        {resetLoading ? (*/}
      {/*          <button*/}
      {/*            className="w-full px-8 bg-blue-400 rounded-lg py-3"*/}
      {/*            type="button"*/}
      {/*            disabled={true}*/}
      {/*          >*/}
      {/*            <span>*/}
      {/*              <ClipLoader*/}
      {/*                size={22}*/}
      {/*                color={'#fff'}*/}
      {/*                loading={resetLoading}*/}
      {/*              />*/}
      {/*            </span>*/}
      {/*          </button>*/}
      {/*        ) : (*/}
      {/*          <button*/}
      {/*            className="w-full px-8 bg-blue-600 rounded-lg py-3 text-lg text-white"*/}
      {/*            onClick={resetHandler}*/}
      {/*          >*/}
      {/*            Proceed*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*      </div>*/}

      {/*      {successMessage && successMessage.length ? (*/}
      {/*        <div className="flex items-center justify-center w-full mr-4">*/}
      {/*          <div className="text-green-600 text-white rounded-full py-3 px-4 w-full text-center my-4">*/}
      {/*            {successMessage}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      ) : null}*/}
      {/*      {errorMessage && errorMessage.length ? (*/}
      {/*        <div className="flex items-center justify-center w-full mr-4">*/}
      {/*          <div className="text-red-600 text-white rounded-full py-3 px-4 w-full text-center my-4">*/}
      {/*            {errorMessage}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      ) : null}*/}

      {/*      /!* <Button isActive={true} onClick={resetHandler}>*/}
		{/*						Proceed*/}
		{/*					</Button> *!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  /!* <Button isActive={false} onClick={resetHandler}>*/}
		{/*			Proceed*/}
		{/*		</Button> *!/*/}
      {/*</form>*/}
    </>
  );
};

export const Verification = ({ goToReset }: Props): ReactElement => {
  const history = useHistory();
  const signInHandler = () => {
    history.push('/reset-password');
  };
  return (
    <AuthCard>
      <form className="w-full" onSubmit={signInHandler}>
        <div className="w-full p-4">
          <div className="p-6 bg-white rounded-lg    formHolder verification">
            <button className="resend" type="button">
              Resend Code
            </button>

            <div className="header">
              <h1>
                Email <br />
                Verification
              </h1>
              <small>
                Please enter the 4 digit code sent to oyewusimicheal61@gmail.com
              </small>
            </div>

            <div className="form-group">
              <Input noLabel={true} maxLength={1} />
              <Input noLabel={true} maxLength={1} />
              <Input noLabel={true} maxLength={1} />
              <Input noLabel={true} maxLength={1} />
            </div>

            <Button isActive={false} onClick={signInHandler}>
              Proceed
            </Button>
          </div>
        </div>
      </form>

      {/*<form className="formHolder verification">*/}
      {/*  <button className="resend" type="button">*/}
      {/*    Resend Code*/}
      {/*  </button>*/}
      {/*  <div className="header">*/}
      {/*    <h1>*/}
      {/*      Email <br />*/}
      {/*      Verification*/}
      {/*    </h1>*/}
      {/*    <small>*/}
      {/*      Please enter the 4 digit code sent to oyewusimicheal61@gmail.com*/}
      {/*    </small>*/}
      {/*  </div>*/}
      {/*  <div className="form-group">*/}
      {/*    <Input noLabel={true} maxLength={1} />*/}
      {/*    <Input noLabel={true} maxLength={1} />*/}
      {/*    <Input noLabel={true} maxLength={1} />*/}
      {/*    <Input noLabel={true} maxLength={1} />*/}
      {/*  </div>*/}

      {/*  <Button isActive={false} onClick={signInHandler}>*/}
      {/*    Proceed*/}
      {/*  </Button>*/}
      {/*</form>*/}
    </AuthCard>
  );
};

export const VerifyEmail = ({ goToReset }: Props): ReactElement => {
	const history = useHistory();
  const [pageloading, setPageLoading] = React.useState(true)
  const [verifyResponse, setVerifyResponse] = useState(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      let verifyUrl = baseUrl + `/v1/auth/verification?token=${token}`;

      fetch(verifyUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => response.text())
      .then((result) => {
        let apiResult = JSON.parse(result)

        if (apiResult.access_token) {
          const storage = localStorage;
          storage.setItem('token', apiResult.access_token);
          storage.setItem('user', JSON.stringify(apiResult.user));
          
          console.log(apiResult)

          setPageLoading(false)
          setVerifyResponse("Email Verified")
          if (apiResult.user.userType === 'MANAGER') { 
            setTimeout(() => {
              history.push('/signup', {
                page: 2
              })
            }, 3000);
          }
        } else {
          setPageLoading(false)
          setVerifyResponse(apiResult.detail)
        }

      })
      .catch((error) => {
        console.log('error', error)
        setPageLoading(false)
        setVerifyResponse('Failed to verify email')
      });
    } else {
      history.push('/', {})
    }

  }, [])

  return (

        <form className="w-full">
          <div className="w-full lg:w-2/5 p-4 mx-auto">
        <div className="flex flex-col p-6 bg-white rounded-lg    formHolder mt-12 shadow">
                <Link to="/">
                  <img src={Logo} className="w-32 h-24 logo mx-auto" />
                </Link>

              <div className="form-header w-full mb-12">
                <h1 className='font-bold text-3xl text-center'>
                  Verifying your email...
                </h1>
              </div>

              {pageloading ?
                  <>
                    <span className="flex justify-center mx-auto">
                      <ClipLoader size={22} color={'#0011ff'} loading={pageloading}/>
                    </span>
                  </>
                  :
                  <>
                    <div className="w-full bg-gray-100 p-8 rounded-lg text-center">
                      <p className='font-semibold text-green-500'>{verifyResponse}</p>
                    </div>
                  </>
              }
            </div>
          </div>
        </form>
  )
}

export const SetPassword = ({ goToReset }: Props): ReactElement => {
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(false)
  const [successDialog, setSuccessDialog] = useState(false);
  const [newPass, setNewPass] = useMergeState({
    new_password: '',
    confirmpassword: '',
    token: history.location.search.replace('?token=', ''),
  });

  if (!history.location.search.includes('?token=')) {
    // if no token redirect to hompage
    history.push('/')
  }


  const handleReset = (event) => {
    event.preventDefault()

    if (newPass.new_password !== newPass.confirmpassword) {
      setErrors(true);
      setTimeout(() => {
        setErrors(false)
      }, 2000);
      return;
    }


    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(newPass);
    setLoading(true)

    fetch(baseUrl + '/v1/auth/password/change', {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        setLoading(false)
        const apiResponse = JSON.parse(result);
        console.log(apiResponse)
        if (apiResponse.access_token && apiResponse.token_type === 'bearer') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        
          setSuccessDialog(true);
          setTimeout(() => {
            setSuccessDialog(false);
            history.push('/login');
          }, 2000);
        } else {
          setPasswordResetError(true)
          setTimeout(() => {
            setPasswordResetError(false)
          }, 3000);
        }
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false)
      });
  };

  return (
    <AuthCard>
      <form className="w-full" onSubmit={(event)=> handleReset(event)}>
        <div className="w-full p-4">
          <div className="p-6 bg-white rounded-lg    sm:formHolder mt-12">
            <div className="form-header w-full mb-12">
              <h1 className='font-bold text-4xl'>
                Reset <br />
                Password
              </h1>
            </div>

            <div className="w-full">
              <Input
                  label="New Password"
                  type="password"
                  className='mb-8'
                  onChange={(e) => setNewPass({ new_password: e.target.value })}
              />
              <Input
                  label="Confirm Password"
                  type="password"
                  className='mb-8'
                  onChange={(e) => setNewPass({ confirmpassword: e.target.value })}
              />
            </div>

            <Button
              className="proceed"
              disabled={!(newPass.confirmpassword.length > 0 && newPass.new_password.length > 0)}
              isActive={newPass.confirmpassword.length > 0 && newPass.new_password.length > 0}>
              {loading ?
                <ClipLoader size={22} color={'#ffffff'} loading={loading}/>
                : 'Proceed'
              }
            </Button>
              <div className='flex items-center justify-center'>
                <div className='text-green-600 text-white rounded-full pt-3 px-4 w-full text-right mt-4'>
                  {
                    errors ?
                      'Passwords do not match'
                    : passwordResetError ?
                      'Session expired, Request password reset again'
                    : ''
                  }
                  </div>
              </div>           
          </div>
        </div>
      </form>

      {/*<form className="formHolder setPassword">*/}
      {/*  <div className="header">*/}
      {/*    <h1>*/}
      {/*      Reset <br />*/}
      {/*      Password*/}
      {/*    </h1>*/}
      {/*  </div>*/}
      {/*  <div className="form-group">*/}
      {/*    <Input*/}
      {/*      label="New Password"*/}
      {/*      type="password"*/}
      {/*      onChange={(e) => setNewPass({ new_password: e.target.value })}*/}
      {/*    />*/}
      {/*    <Input*/}
      {/*      label="Confirm Password"*/}
      {/*      type="password"*/}
      {/*      onChange={(e) => setNewPass({ confirmpassword: e.target.value })}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <Button onClick={handleReset} isActive={false}>*/}
      {/*    Proceed*/}
      {/*  </Button>*/}
      {/*</form>*/}

      {successDialog ? (
        <Dialog
          scroll="body"
          onClose={handleClose}
          open={successDialog}
          fullWidth={false}
          maxWidth="sm"
          classes={{
            root: 'rounded-md',
            paper: 'rounded-full',
          }}
          PaperProps={{
            style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
          }}
        >
          <div className="p-8 flex justify-center items-center flex-col">
            <img src={Pulse} />
            <p className="text-2xl font-semibold">Password Reset Successful</p>
          </div>
        </Dialog>
      ) : null}
    </AuthCard>
  );
};

export const ResetSuccessModal = ({ goToReset }: Props): ReactElement => {
  return (
    <div className="resetSuccess">
      <div className="ripple-1">
        <div className="ripple-2">
          <div className="ripple-3">
            <div className="ripple-4">
              <img src={CheckMark} />
            </div>
          </div>
        </div>
      </div>

      <h1>Password Reset Successful</h1>
    </div>
  );
};
