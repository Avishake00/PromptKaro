'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';


const PromptCardList = ({data,handleTagClick}) => {
  const {data:session}=useSession();
    return (
      
    ( session && <div className='mt-16 prompt_layout '>
          {data.map((post)=>(
              <PromptCard
              key={post.prompt}
              post={post}
              handleTagClick={handleTagClick}
              />
          ))}
      </div>)
    )
  }

const Feed = () => {
    const [searchText, setsearchText] = useState("");
    const [Posts, setPosts] = useState([]);
    const handleSearchChange=()=>{
       
    }
    useEffect(() => {

        const fetchPosts=async()=>{
            const response=await axios.get('/api/Prompt/get');
            const data=await response.data;
            setPosts(data);
        }
        fetchPosts();
    }, [])
    
  return (
    <section className='feed '>
        <form className='relative w-full flex-center'>
            <input type="text"
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
            />
        </form>
        <PromptCardList
        data={Posts}
        handleTagClick={()=>{}}
        />
    </section>
  )
}

export default Feed