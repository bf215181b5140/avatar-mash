import './style/style.css';
import { Route, Routes } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import Header from './components/header.component';
import MatchPage from './pages/match/match.page';
import RankingsPage from './pages/rankings/rankings.page';

export default function App() {

  return (<>
    <Header />
    <Routes>
      {/* <Route path="/:username" element={<ProfilePage />} /> */}
      <Route path="/rankings" element={<RankingsPage />} />
      <Route path="/profile" element={<p>profile</p>} />
      <Route path="*" element={<MatchPage />} />
    </Routes>
  </>);
}
