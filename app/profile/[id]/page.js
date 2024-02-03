"use client";
import Profile from "@components/Profile";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
	const [posts, setPosts] = useState([]);
	const router = useRouter();
	const searchParams = useSearchParams();
	const username = searchParams.get("name");

	//to fetch all the posts
	useEffect(() => {
		console.log(params?.id);

		const fetchPosts = async () => {
			console.log(params.id);
			const response = await axios.get(`/api/user/${params.id}/post`);
			const data = response.data;
			console.log(data);
			setPosts(data);
		};

		if (params?.id) fetchPosts();
	}, [params.id]);

	return (
		<div>
			<Profile
				name={username}
				desc = {`Welcome to ${username}'s personalized profile page`}
				data={posts}
			/>
		</div>
	);
};

export default UserProfile;
