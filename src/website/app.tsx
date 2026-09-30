import './style/style.css';
import { Route, Routes } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import Header from './components/header.component';
import MatchPage from './pages/match/match.page';
import RankingsPage from './pages/rankings/rankings.page';
import Context from './context/context.component';
import ProfilePage from './pages/profile/profile.page';

export default function App() {

  return (<Context>
    <Header />
    <Routes>
      {/* <Route path="/:username" element={<ProfilePage />} /> */}
      <Route path="/rankings" element={<RankingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<MatchPage />} />
    </Routes>
  </Context>);
}
