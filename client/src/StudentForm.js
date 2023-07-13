import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gpa, setGpa] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Process and add student data to the database
      Axios.post("http://localhost:3001/api/insert", {name: name, email: email, gpa: gpa}).then(()=> {
  
      });
      // Reset form fields
      setName('');
      setEmail('');
      setGpa('');
      // Navigate back to the home page after adding the data
      navigate('/');
    };
    return (
      <div className="student-form">
        <h2>Add Student To Database</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              GPA:
              <input type="text" value={gpa} onChange={(e) => setGpa(e.target.value)} />
            </label>
          </div>
          <button type="submit" className="button">Add Student</button>
        </form>
      </div>
    );
  };

export default StudentForm;