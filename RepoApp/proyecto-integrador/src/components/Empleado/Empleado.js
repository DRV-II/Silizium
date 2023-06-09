import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Empleado.css';
import { UserAvatar, Bookmark, BookmarkFilled } from '@carbon/icons-react';

const Empleado = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const exampleId = '063135781IBM'; 
  const [data, setData] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const certificationsPerPage = 3;
  const [employee, setEmployee] =  useState(["id", "work_location", "org"]);

  const getCertifications = (uid) => {
    axios({
      method: "POST",
      data: {
        employee: uid,
      },
      withCredentials: true,
      url: "http://localhost:5000/certifications",
    }).then((res) => {
      setData(res.data);
      setEmployee([res.data[0]["id"], res.data[0]["work_location"], res.data[0]["org"]]);
    });
  };

  useEffect(() => {
    getCertifications(exampleId);
  }, []);

  const handleBookmarkClick = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastCertification = currentPage * certificationsPerPage;
  const indexOfFirstCertification = indexOfLastCertification - certificationsPerPage;
  const currentCertifications = data.slice(indexOfFirstCertification, indexOfLastCertification);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(data.length / certificationsPerPage);

    return (
      <div className='flechas-container'>
        {currentPage > 1 && (
          <button onClick={prevPage} className="flecha" >&lt;</button>
        )}
        {currentPage < totalPages && (
          <button onClick={nextPage} className="flecha"> &gt;</button>
        )}
      </div>
    );
  };

  return (
    <div className="empleado-container">
      <div className="top-empleado">
        <div className='top-imagen'>
          <UserAvatar size="125" className='avatar' />
        </div>
        <div className="top-textos">
        <h1 className="texto">{employee[0]}</h1>
        <h2 className="texto2">{employee[1]}</h2>
        <h1 className="texto3">Org</h1>
        <h2 className="texto4">{employee[2]}</h2>
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
              {currentCertifications.map(({ id, certification, issue_date, type }) => (
                <tr key={id + certification}>
                  <td>{certification}</td>
                  <td>{issue_date}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default Empleado;
