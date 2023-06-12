// import React, { useState } from 'react';
// import './SearchBar.css';
// import { Search } from '@carbon/icons-react';
// import axios from 'axios';

// function SearchBar(props) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [data, setData] = useState([{}]); // Lista de JSON resultado de busqueda
// /*
//   With this format:
//   [
//     {
//         "id": "Y9G6AN820IBM",
//         "name": "Juan García Mendez",
//         "org": "Finance and Operations",
//         "work_location": "Wroclaw, DS , Poland",
//         "certification": "Cognitive Practitioner",
//         "issue_date": "1899-11-30T06:36:36.000Z",
//         "type": "badge",
//         "bookmarked": 0
//     },
//     {
//         "id": "Y9G6AN820IBM",
//         "name": "Juan García Mendez",
//         "org": "Finance and Operations",
//         "work_location": "Wroclaw, DS , Poland",
//         "certification": "IBM Agile Explorer",
//         "issue_date": "1899-11-30T06:36:36.000Z",
//         "type": "badge",
//         "bookmarked": 0
//     },
//     {
//         "id": "Y9G6AN820IBM",
//         "name": "Juan García Mendez",
//         "org": "Finance and Operations",
//         "work_location": "Wroclaw, DS , Poland",
//         "certification": "IBM Cloud Essentials",
//         "issue_date": "1899-11-30T06:36:36.000Z",
//         "type": "badge",
//         "bookmarked": 0
//     }
//   ]
//   */

//   const search = () => {
//     axios
//       .post("http://localhost:5000/search", {
//         searchText: searchTerm,
//       })
//       .then((res) => {
//         setData(res.data);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     search();
//   };

//   return (
//     <form className="search-form" onSubmit={handleSubmit}>
//       <div className="search-container">
//         <button type="submit" className="search-button">
//           <Search className="search-icon" />
//         </button>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           placeholder="Search employee or certification"
//           className="search-input"
//         />
//         <div className="search-line"></div>
//       </div>
//     </form>
//   );
// }

// export default SearchBar;