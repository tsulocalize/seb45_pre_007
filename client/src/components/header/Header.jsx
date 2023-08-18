import React, { useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import logo1 from '../../assert/logo1.png';
import logo2 from '../../assert/logo2.png';
import { Link } from 'react-router-dom';
import Products from './Products.jsx';
import Search from './Search.jsx';
import Hamburger from './Hamburger.jsx';
import Nav from '../Nav.jsx';
import { useSelector } from 'react-redux';
import HeaderNav from './HeaderNav.jsx';

export const Header = () => {
  const loginData = useSelector((state) => state.login);
  const successedUser = loginData.isSuccessed;
  const [isOpen, setIsOpen] = useState(false);
  //! test -> successedUser를 사용해야 함
  const [test, setTest] = useState(true);

  //Todo: Ask 페이지에서는 햄버거 보여질 수 있게 구현하기

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

  // console.log(successedUser);

  return (
    <HeaderBox>
      <HeaderList>
        <HeaderLeftBox>
          {/* 로그인 시 햄버거 및 nav 숨김 */}
          <HeaderHamburgerBox
            ref={containerRef}
            onClick={() => setIsOpen(!isOpen)}
            successedUser={test}
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
            <HeaderLogoItem successedUser={test}>
              <HeaderLogo1 />
              <HeaderLogo2 />
            </HeaderLogoItem>
          </HeaderLogoBox>

          <ButtonBox>
            <ButtonItem successedUser={test}>
              <About successedUser={test}>About</About>
              <Products />
              <ForTeams successedUser={test}>For Teams</ForTeams>
            </ButtonItem>
          </ButtonBox>
        </HeaderLeftBox>
        <Search />
        <AuthBox successedUser={test}>
          <AuthItem>
            <Login to="/login">Log in</Login>
            <SignUp to="/signup">Sign up</SignUp>
          </AuthItem>
        </AuthBox>
        {test === null && <HeaderNav />}
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
  width: 99%;
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

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      display: none;
    `}
`;

// logo
const HeaderLogoBox = styled(Link)`
  cursor: pointer;
  display: flex;

  &:hover {
    background-color: #e4e6e8;
    height: 100%;
  }

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      width: 164px;
      padding: 0px;

      &:hover {
        background-color: #e4e6e8;
      }
    `}
`;

const HeaderLogoItem = styled.div`
  display: flex;
  align-items: center;

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      width: 166px;
      padding: 0px 4px 0 0;

      &:hover {
        background-color: #e4e6e8;
      }
    `}
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

  margin: 2px 0 0;

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

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      width: 85px;
    `}
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

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      display: none;
    `}
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

  ${({ successedUser }) =>
    successedUser === null &&
    css`
      display: none;
    `}
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

const SignUp = styled(Link)`
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
