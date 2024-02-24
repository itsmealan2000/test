import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDeleteComment = (id) => {
    const newComments = comments.filter(comment => comment.id !== id);
    setComments(newComments);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComments = comments.filter(comment => {
    return comment.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className='container-fluid  bg-body-secondary'>
        <div className="container-fluid">
            <div className=''>
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name" className="form-control" />
            </div>      
    <ul className="list-group">
            {filteredComments.map(comment => (
              <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{comment.name}</h5>
                  <p>{comment.body}</p>
                </div>
                <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;
