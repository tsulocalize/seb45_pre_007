import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import logo1 from '../../assert/logo1.png';
import logo2 from '../../assert/logo2.png';
import { Link } from 'react-router-dom';
import Products from './Products.jsx';
import Search from './Search.jsx';
import Hamburger from './Hamburger.jsx';
import Nav from '../Nav.jsx';

export const Header = () => {
  // 수정했습니다~
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
      // setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <HeaderBox>
      <HeaderList>
        <HeaderLeftBox>
          <HeaderHamburgerBox
            ref={containerRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Hamburger isOpen={isOpen} />
          </HeaderHamburgerBox>

          {isOpen ? (
            <div
              style={{ position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Nav />
            </div>
          ) : null}

          <HeaderLogoBox to="/">
            <HeaderLogoItem>
              <HeaderLogo1 />
              <HeaderLogo2 />
            </HeaderLogoItem>
          </HeaderLogoBox>

          <ButtonBox>
            <ButtonItem>
              <About>About</About>
              <Products />
              <ForTeams>For Teams</ForTeams>
            </ButtonItem>
          </ButtonBox>
        </HeaderLeftBox>

        <Search />

        <AuthBox>
          <AuthItem>
            <Login to="/login">Log in</Login>
            <SignUp>Sign up</SignUp>
          </AuthItem>
        </AuthBox>
      </HeaderList>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 3px solid #f48026;
  border-bottom: 1px solid hsl(210, 8%, 85%);
  height: 56px;

  z-index: 9999;
`;

const HeaderList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // 큰화면으로 갔을때 줄어들 수 있게 구현하기
  width: 98%;
  height: 100%;
`;

const HeaderLeftBox = styled.div`
  display: flex;
  /* width: 437.5px; */
  height: 100%;
`;

const HeaderHamburgerBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 100%;

  padding: 0 16px;

  &:hover {
    background-color: #e4e6e8;
  }
`;

// logo
const HeaderLogoBox = styled(Link)`
  cursor: pointer;
  display: flex;
  padding: 0 8px;

  &:hover {
    background-color: #e4e6e8;
    height: 100%;
  }
`;

const HeaderLogoItem = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo1 = styled.img.attrs({
  src: `${logo1}`,
})`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const HeaderLogo2 = styled.img.attrs({
  src: `${logo2}`,
})`
  cursor: pointer;
  width: 120px;
  height: 15px;

  margin: 2px 0 0 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

// button
const ButtonBox = styled.div``;

const ButtonItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 250px;
  height: 100%;

  @media (max-width: 816px) {
    width: 85px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: hsl(210, 8%, 35%);
  font-size: 13px;

  /* height: 29px; */

  border-radius: 35px;
  padding: 8px 15px;

  &:hover {
    background-color: #e4e6e8;
  }

  @media (max-width: 816px) {
    display: none;
  }
`;

const About = styled(Button)``;
const ForTeams = styled(Button)`
  margin: 0 5px 0 0;
`;

// auth
const AuthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 10px 0 0;
`;

const AuthItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Login = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 13.5px;
  color: hsl(205, 47%, 42%);
  background-color: hsl(205, 46%, 92%);
  border-radius: 6px;

  width: 63px;
  height: 33px;

  &:hover {
    background-color: #b3d3ea;
  }
`;

const SignUp = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 13.5px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(206, 100%, 52%);
  border-radius: 6px;

  width: 68px;
  height: 33px;

  &:hover {
    background-color: #0174cd;
  }
`;
