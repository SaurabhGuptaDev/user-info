// src/UserList.js
import React, { useState, useEffect } from 'react';
import './UserList.css';
const UserList = () => {
    const  data =  JSON.parse(localStorage.getItem('pastSearches'))? JSON.parse(localStorage.getItem('pastSearches')) : []
  const [users, setUsers] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const getUserData =()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data =>{
      const userdata =  JSON.parse(localStorage.getItem('pastSearches'))?.length>0? JSON.parse(localStorage.getItem('pastSearches')) : data
     setUsers(userdata)
     localStorage.setItem('currentUser',JSON.stringify(data))
  }

);
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>{
        const userdata =  JSON.parse(localStorage.getItem('pastSearches')).length? JSON.parse(localStorage.getItem('pastSearches')) : data
       setUsers(userdata)
       localStorage.setItem('pastSearches',JSON.stringify(data))
    }

  );
  }, [searchTerm]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('pastSearches'));
    if (storedSearches) {
      setPastSearches(storedSearches);
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
     setSearchTerm(term);
    // if (term) {
    //   const updatedPastSearches = [...new Set([term, ...pastSearches])];
    //   setPastSearches(updatedPastSearches);
    //  ;
    // }
    const filteredUsers = users?.filter(user =>
        user.name?.toLowerCase().includes(term?.toLowerCase())
      );
      localStorage.setItem('pastSearches', JSON.stringify(filteredUsers))
      localStorage.setItem('currentUser',JSON.stringify(filteredUsers))

      setPastSearches(filteredUsers);
      setUsers(filteredUsers)
      console.log(filteredUsers)

 };
 const handleSortOrderToggle = () => {
  setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));

  const sortedUsers = users.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  })
setUsers(sortedUsers)
localStorage.setItem('pastSearches', JSON.stringify(sortedUsers))
}
  const filteredUsers = users?.filter(user =>
    user.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
 
  
  return (
    <div className="user-list-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
        className="search-input"
      />
      <button onClick={handleSortOrderToggle} className="sort-button">
      Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <ul className="user-list">
        {users?.map(user => (
          <li className="user-item" key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div  className="past-searches-container">
        <h3>Past Searches:</h3>
        <ul className="past-searches-list">
          {pastSearches.map((term, index) => (
            <li className="past-search-item" key={index}>{term.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
