import styled from 'styled-components';

export default function LoginMenu() {

  return (<LoginMenuStyled>

    <a href={'/api/login/twitter'} className={'x'}><i className={'ri-twitter-x-line'} />Sign in with X</a>
    <a href={'/api/login/patreon'} className={'patreon'}><i className={'ri-patreon-fill'} />Sign in with Patreon</a>

  </LoginMenuStyled>);
}

const LoginMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding: 0 15px;

  a {
    display: block;
    text-align: center;
    width: 320px;
    max-width: 100%;
    text-decoration: none;
    font-size: 18px;
    color: #ededed;
    border-radius: 5px;
    padding: 10px;
    border: 2px solid transparent;

    > i {
      margin-right: 10px;
    }

    &:hover {
      border-color: #54bbfc;
    }

    &.x {
      background-color: #000000;

      &:hover {
        background-color: #101010;
      }
    }

    &.patreon {
      background-color: #0d0d0d;

      &:hover {
        background-color: #1d1d1d;
      }
    }
  }
`;