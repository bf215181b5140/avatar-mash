import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Header() {

  return (<HeaderStyled>
    <div className={'logo'}>
      <img aria-hidden src="/logo.png" alt="AvatarMash!" />
    </div>
    <Link to={'/'} className={'match'}>
      Mash!
      <img aria-hidden src="/match.png" alt="Match" width={20} height={20} />
    </Link>
    <Link to={'/rankings'} className={'rankings'}>
      Rankings
      <img aria-hidden src="/crown.png" alt="Rankings" width={24} height={24} />
    </Link>
    <Link to={'/profile'} className={'profile'}>
      Your profile
      <div><i className={'ri-user-fill'} /></div>
    </Link>
  </HeaderStyled>);
}

const HeaderStyled = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: relative;

  .match {
    order: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .rankings {
    order: 3;

    > img {
      position: absolute;
      top: -8px;
      right: -12px;
      rotate: 20deg;
    }
  }

  .profile {
    order: 4;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    padding: 5px 5px 5px 12px;
    border-radius: 50px;
    background: #333333;
    border: 2px solid transparent;

    &:hover {
      color: #ededed;
      border-color: #54bbfc;
    }

    > div {
      display: inline-block;
      margin-left: 10px;
      background: linear-gradient(0, #2f84fe 10%, #54bbfc 100%);
      border-radius: 50%;
      overflow: hidden;
      width: 32px;
      height: 32px;
      text-align: center;

      > i {
        font-size: 30px;
        position: relative;
        bottom: -3px;
      }
    }
  }

  .logo {
    order: 2;

    > img {
      width: ${543 / 1.5}px;
      min-width: 200px;
      max-width: 100%;
      height: auto;
    }
  }

  a {
    text-decoration: none;
    position: relative;
    font-size: 22px;
    color: #ededed;

    &:hover {
      color: #54bbfc;
    }
  }

  img {
    pointer-events: none;
  }

  @media (max-width: 750px) {
    .match {
      order: 2;
    }

    .logo {
      order: 1;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }

    .profile {
      position: initial;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
  }
`;