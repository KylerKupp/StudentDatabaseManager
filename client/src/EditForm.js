import React, { useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams(); // Access the ID parameter from the URL
  const [student, setStudent] = useState({
    name: '',
    email: '',
    gpa: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:3001/update/${id}`, student).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="EditForm">
      <h2>Edit Student</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={student.name}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={student.email}
        onChange={handleInputChange}
      />

      <label htmlFor="gpa">GPA:</label>
      <input
        type="number"
        id="gpa"
        name="gpa"
        step="0.01"
        value={student.gpa}
        onChange={handleInputChange}
      />

      <button onClick={handleUpdate} className="button update">Update</button>
    </div>
  );
};

export default EditForm;