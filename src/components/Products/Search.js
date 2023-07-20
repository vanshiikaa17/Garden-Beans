import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./search.css";
import { MetaData } from '../layout/MetaData';
export const Search = () => {
    const nav =useNavigate();
    const [keyword, setKeyword]=useState("");
    const submitSearch = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            // console.log(keyword);
            nav(`/plants/${keyword}`);
        }else{
            nav("/plants");
        }
    }
  return (
    <>
    <MetaData title="Search - Garden Beans"/>
        <form className='searchForm' onSubmit={submitSearch}>
            <input className='searchbox'
                    type="text"
                    placeholder="Search here..."
                    onChange={(e)=> setKeyword(e.target.value)}
           />
           <input className='searchbutton' type= "submit" value="Search"/>
        </form>
    </>
  )
}
