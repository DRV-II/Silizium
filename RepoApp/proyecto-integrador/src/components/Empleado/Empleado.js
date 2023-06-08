import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './Empleado.css';
import { UserAvatar, Bookmark, BookmarkFilled } from '@carbon/icons-react';

const Empleado = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const exampleId = '000134781IBM'; 
  // Here the data (list of certifications)
  const [data, setData] = useState([{}]);

  /*
  With this format:
  [
    {
        "id": "000134781IBM",
        "name": "Juan García Mendez",
        "org": "Finance and Operations",
        "work_location": "Guadalajara, JAL, Mexico",
        "certification": "Big Data Foundations - Level 1",
        "issue_date": "2020-09-02",
        "type": "badge",
        "bookmarked": 1
    },
    {
        "id": "000134781IBM",
        "name": "Juan García Mendez",
        "org": "Finance and Operations",
        "work_location": "Guadalajara, JAL, Mexico",
        "certification": "Big Data Foundations - Level 2",
        "issue_date": "2020-09-02",
        "type": "badge",
        "bookmarked": 0
    }
  ]
  */

  // Get certifications from employee
  const getCertifications = (uid) => {
    axios({
      method: "GET",
      data: {
        employee: uid
      },
      withCredentials: true,
      url: "http://localhost:5000/certifications",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getCertifications(exampleId);
  }, []);
  // Call this wherever you want
  // New Bookmark
  const newBookmark = (id, certification) => {
    axios({
      method: "POST",
      data: {
        employee: id,
        certificate: certification,
      },
      withCredentials: true,
      url: "http://localhost:5000/check",
    }).then((res) => {
      //setData(res.data);
      console.log(res.data);
    });
  };

  // Delete Bookmark

  const deleteBookmark = (id, certification) => {
    axios({
      method: "DELETE",
      data: {
        employee: id,
        certificate: certification,
      },
      withCredentials: true,
      url: "http://localhost:5000/unbook",
    }).then((res) => {
      //setData(res.data);
      console.log(res.data);
    });
  };


  const handleBookmarkClick = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div className="empleado-container">
      <div className="top-empleado">
        <div className='top-imagen'>
          <UserAvatar size="125" className='avatar' />
        </div>
        <div className="top-textos">
          <h1 className="texto">000306781IBM</h1>
          <h2 className="texto2">Guadalajara, JAL.<br /> México</h2>
          <h1 className="texto3">Org</h1>
          <h2 className="texto4">Finance and Operations</h2>
          <td className="bookmark" onClick={() => handleBookmarkClick('example-id')}>
            {bookmarks.includes('example-id') ? (
              <BookmarkFilled size="40" fill="#F1C21B" />
            ) : (
              <Bookmark size="40" />
            )}
          </td>
        </div>
      </div>
      <div className="bottom-empleado">
        <div className="table-1">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="col">
                  Certification
                </th>
                <th scope="col" className="col">
                  Date
                </th>
                <th scope="col" className="col">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, certification, issue_date, type }) => (
                <tr key={id}>
                  <td>{certification}</td>
                  <td>{issue_date}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Empleado;
