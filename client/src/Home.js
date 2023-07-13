import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [studentList, setStudentList] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) => {
        setStudentList(response.data)
      })
    }, []);
  
    const handleGoToStudentForm = () => {
      navigate('/student-form');
    };

      
    const handleGoToEditForm = (id) => {
        navigate(`/edit-form/${id}`);
    };

    const handleDelete = (id) => {
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        setStudentList(
          studentList.filter((val) => {
            return val.id !== id;
          })
        );
      });
    };
  
    return (
      <div className="Home">
        <button onClick={() => handleGoToStudentForm()} className="button add">Add Student</button>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="gpa-column">GPA</th>
              <th>Manage</th>
            </tr>
          
            {studentList.map((val) => {
              return <tr key={val.id}>
                <td> {val.name} </td>
                <td> {val.email} </td>
                <td className="gpa-column"> {val.gpa.toFixed(2)} </td>
                <td className="actions">
                  <button onClick={() => handleGoToEditForm(val.id)} className="button edit">Edit</button>
                  <div className="divider"/>
                  <button className="button delete" onClick={()=> handleDelete(val.id)}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  };

export default Home;