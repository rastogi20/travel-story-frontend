import React from 'react';
import logo from '../assests/tracel.png'
import Profile from './Profile';
import { useNavigate } from 'react-router';
import SearchBar from './SearchBar';
const Navbar = ({userInfo,searchQuery,setSearchQuery,onSearchNote,handleclearSearch}) => {
  const istoken=localStorage.getItem('token');
  const navigate=useNavigate();
  const onLogout=()=>{
    localStorage.clear();
    navigate("/login");
  }
 const handleSearch=()=>{
  if(searchQuery){
    onSearchNote(searchQuery);
  }
 }
 const onClearSearch=()=>{
  handleclearSearch();
  setSearchQuery('');
 }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={logo} alt="travel story" className="h-9" />
      {istoken&&(
        <>
        <SearchBar
  value={searchQuery}
  onChange={({ target }) => {
    setSearchQuery(target.value);
  }}
  handleSearch={handleSearch}
  onClearSearch={onClearSearch}
/>
         <Profile userInfo={userInfo} onLogout={onLogout}/>
        </>

      )}
     
    </div>
  );
}

export default Navbar;
