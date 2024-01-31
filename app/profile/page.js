'use client'
import Profile from '@components/Profile'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState([]);
    const router=useRouter();

    useEffect(() => {
      console.log(session?.user.id);
        const fetchPosts = async () => {
            if (status === 'authenticated' && session?.user.id) {
                try {
                    const response = await axios.get(`api/user/${session.user.id}/post`);
                    const data = response.data;
                    console.log(data);
                    setPosts(data);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        }

        fetchPosts();
    }, [session, status]);

    const handleEdit=()=>{
        router.push('/update-prompt')

    }

    const handleDelete=()=>{
        
    }

    return (
        <div>
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default MyProfile;
