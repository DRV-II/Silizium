import React from 'react';
import '../Sidebar/Sidebar.css';
import { Logout } from '@carbon/icons-react';
import axios from 'axios'; 
const LogOut = () => {
    /*const handleClick = () => {
        axios.post('http://localhost:5000/logout')
        .then((response) =>{
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        }); 
    }*/

    const handleClick = () => {
        axios({
          method: "POST",
          withCredentials: true,
          url: "http://localhost:5000/logout",
        }).then((res) => {
          //setData(res.data);
          console.log(res.data);
        });
      };

  return (
        <Logout onClick={handleClick} size='56' className='logout'/>
  );
};

export default LogOut;