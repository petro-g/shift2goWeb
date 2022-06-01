import React from 'react';
import { connect } from 'react-redux';
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
import { Login as LoginComponent } from './components';

export const index = () => {
  return (
    <LoginContainer
      className="w-full overflow-hidden
         h-full grid grid-cols-5"
    >
      <div
        className="flex flex-col p-5 col-span-2 left bg-lightBlue 
            h-full w-full"
      >
        <img src={Logo} className="w-32 h-32 logo" />
        <h1 className="heroTitle">
          Find Skilled <strong>Professionals</strong> to <br /> Work in your
          Hotel
          <img src={UnderLine} />
        </h1>
        <div
          className="w-full h-full 
                flex flex-col relative heroImages"
        >
          <img className="ellipse-1" src={Ellipse1Image} />
          <img className="ellipse-2" src={Ellipse2Image} />
          <img className="ellipse-3" src={Ellipse3Image} />
          <img className="ellipse-4" src={Ellipse4Image} />
          <img className="ellipse-5" src={Ellipse5Image} />
          <img className="ellipse-6" src={Ellipse6Image} />
          <div className="ellipse-7">
            <img src={Ellipse7Image} />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-center
       items-center col-span-3 bg-white"
      >
        <LoginComponent />
      </div>
    </LoginContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
