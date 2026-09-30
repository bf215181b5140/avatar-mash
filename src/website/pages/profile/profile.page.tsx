import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import LoginMenu from '../../components/loginMenu.component';
import styled from 'styled-components';

export default function ProfilePage() {
  const { isLoading, isLoggedIn, user } = useContext(UserContext);

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn) return <LoginMenu />;

  return (<ProfilePageStyled>

    <div style={{ width: '100%', border: '1px solid black' }}>
      {user?.avatars?.map(avatar => <img key={avatar.id} src={`https://file.avatarmash.com/${avatar.filename}`} alt={avatar.filename} width={'250px'} />)}
    </div>

    <aside style={{ width: '200px', border: '1px solid black' }}>
      <p>Side menu</p>
      <a href={'/api/logout'}>Log out</a>
    </aside>

    <main style={{ width: '500px', maxWidth: '100%', border: '1px solid black' }}>
      Main content
    </main>

  </ProfilePageStyled>);
}

const ProfilePageStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;