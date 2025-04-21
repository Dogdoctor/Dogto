import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RespondentPortal from './components/RespondentPortal';
import SurveyorPortal from './components/SurveyorPortal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RespondentPortal />} />
        <Route path="surveyor" element={<SurveyorPortal />} />
      </Route>
    </Routes>
  );
}

export default App;