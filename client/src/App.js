import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './StudentForm';
import Home from './Home';
import EditForm from './EditForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/edit-form/:id" element={<EditForm />} />
      </Routes>
    </Router>
  );
};

export default App;