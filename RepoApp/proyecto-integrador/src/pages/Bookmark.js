import React from 'react';
import './Bookmark.css'
import Sidebar from '../components/Sidebar/Sidebar';
import TableComponent from '../components/TableComponent/TableComponent';

const Bookmark = () => {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
  const bookmarkIds = Object.keys(storedBookmarks);
  return (
    <div className='certificados-container'>
      <div className='left-sidebar-cert'>
      <Sidebar/>
      </div>
      <div className='right-sidecert'>
        <div className='right-left-upper'>
          <div className='cert-title'>
            <h1>Bookmark </h1>
            {bookmarkIds.map((bookmarkId) => (
          <p key={bookmarkId}>{bookmarkId}</p>
        ))}
          </div>
        <div className='right-right-upper'>
          <div>   
          </div>
        </div>
        <TableComponent urlCert="http://localhost:5000/get-bookmarks"/>  
        </div>
      </div>
    </div>
  );
};
export default Bookmark;