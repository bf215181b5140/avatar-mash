import './style/style.css';
import { Route, Routes } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import Header from './components/header.component';

export default function App() {

  return (<>
    <Header />
    <Routes>
      {/* <Route path="/:username" element={<ProfilePage />} /> */}
      <Route path="/rankings" element={<p>rankings</p>} />
      <Route path="/profile" element={<p>profile</p>} />
      <Route path="*" element={<p>match</p>} />
    </Routes>
  </>);
}
