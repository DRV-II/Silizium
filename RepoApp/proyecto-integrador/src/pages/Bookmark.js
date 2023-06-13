import React, { useState, useEffect } from 'react';
import './Bookmark.css';
import Sidebar from '../components/Sidebar/Sidebar';
import TableComponent from '../components/TableComponent/TableComponent';
import axios from 'axios';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "https://edgarc.me/get-bookmarks",
    }).then((res) => {
      setBookmarks(res.data);
    });
  }, []);

  return (
    <div className='certificados-container'>
      <div className='left-sidebar-cert'>
        <Sidebar />
      </div>
      <div className='right-sidecert'>
        <div className='right-left-upper'>
          <div className='cert-title'>
            <h1>Bookmark</h1>
          </div>
          <div className='right-right-upper'>
            <div></div>
          </div>
          <TableComponent urlCert="https://edgarc.me/get-bookmarks" bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
