"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick }) => {
	const { data: session } = useSession();
	return (
		
			<div className="mt-16 prompt_layout ">
				{data.map((post) => (
					<PromptCard
						key={post.prompt}
						post={post}
						handleTagClick={handleTagClick}
					/>
				))}
			</div>
		
	);
};

const Feed = () => {
	const [searchText, setsearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get("/api/Prompt/get");
			const data = await response.data;
			setPosts(data);
		};
		fetchPosts();
	}, []);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, "i");
		return Posts.filter(
			(item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.creator.email) || regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setsearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchedResults = filterPrompts(e.target.value);
				setSearchedResults(searchedResults);
			},300)
		);
	};

	const handleTagClick = (tagname) => {
		setsearchText(tagname);

		const tagresult = filterPrompts(tagname);
		setSearchedResults(tagresult);
	};
	return (
		<section className="feed ">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText && (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			)}

			{!searchText && (
				<PromptCardList data={Posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
