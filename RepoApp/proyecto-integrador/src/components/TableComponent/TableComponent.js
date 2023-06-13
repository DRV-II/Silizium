import React, { useState, useEffect } from 'react';
import './TableComponent.css';
import { Bookmark, BookmarkFilled, Search } from '@carbon/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TableComponent = ({ urlCert }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [bookmarks, setBookmarks] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searching, setSearching] = useState(false);

  const getCertificationsTable = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: urlCert,
    })
      .then((res) => {
        setCertifications(res.data);
        setFilteredData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const newBookmark = (id, certification) => {
    axios({
      method: 'POST',
      data: {
        employee: id,
        certificate: certification,
      },
      withCredentials: true,
      url: 'https://edgarc.me/check',
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteBookmark = (id, certification) => {
    axios({
      method: 'DELETE',
      data: {
        employee: id,
        certificate: certification,
      },
      withCredentials: true,
      url: 'https://edgarc.me/unbook',
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearching(true);
  };

  const handleRowClick = (id) => {
    navigate(`/Employee/${id}`);
  };

  const handleBookmarkClick = (event, id, certification) => {
    event.stopPropagation();

    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = { ...prevBookmarks };

      if (updatedBookmarks[`${id}-${certification}`]) {
        deleteBookmark(id, certification);
        delete updatedBookmarks[`${id}-${certification}`];
      } else {
        newBookmark(id, certification);
        updatedBookmarks[`${id}-${certification}`] = true;
      }

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      return updatedBookmarks;
    });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const search = () => {
    const searchTerms = searchTerm.toLowerCase().split(" ");
  
    const filtered = certifications.filter((certification) =>
      searchTerms.every((term) => {
        return (
          certification.certification.toLowerCase().includes(term) ||
          certification.id.toLowerCase().includes(term) ||
          certification.work_location.toLowerCase().includes(term) ||
          certification.org.toLowerCase().includes(term) ||
          certification.type.toLowerCase().includes(term) ||
          certification.issue_date.toLowerCase().includes(term)
        );
      })
    );
  
    setFilteredData(filtered);
  };
  

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    getCertificationsTable();
  }, []);

  useEffect(() => {
    if (searching) {
      search();
      setSearching(false);
    }
  }, [searchTerm]);

  return (
    <div className="tablecomponent-container">
      <div className="search-container">
        <button
          type="button"
          className="search-button"
          onClick={() => setSearching(true)}
        >
          <Search className="search-icon" />
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search employee or certification"
          className="search-input"
        />
        <div className="search-line"></div>
      </div>
      {searching && <p>Searching...</p>}
      {!searching && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Org</th>
                <th>Work Location</th>
                <th>Certification</th>
                <th>Issue Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(startIndex, endIndex).map(({ id, org, work_location, certification, issue_date, type }) => (
                <tr key={id} onClick={() => handleRowClick(id)}>
                  <td>
                    <span onClick={(event) => handleBookmarkClick(event, id, certification)}>
                      {bookmarks[`${id}-${certification}`] ? (
                        <BookmarkFilled size="20" fill="#F1C21B" />
                      ) : (
                        <Bookmark size="20" />
                      )}
                    </span>
                  </td>
                  <td>{id}</td>
                  <td>{org}</td>
                  <td>{work_location}</td>
                  <td>{certification}</td>
                  <td>{issue_date}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="pagination">
        <div className="page-info">
          Page {currentPage} of {totalPages} pages | Showing {startIndex + 1}-{endIndex} of {filteredData.length} IDs
        </div>
        <div className="page-dropdown">
          <select value={currentPage} onChange={(e) => handlePageChange(parseInt(e.target.value))}>
            {pageNumbers.map((pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                Page {pageNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="items-per-page-dropdown">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="10">10 items per page</option>
            <option value="50">50 items per page</option>
            <option value="100">100 items per page</option>
            <option value={filteredData.length}>All items</option>
          </select>
        </div>
        <div className="page-arrows">
          <button
            className="arrow-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
          <button
            className="arrow-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
