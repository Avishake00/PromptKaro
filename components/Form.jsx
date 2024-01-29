import Link from "next/link";
import React from "react";

const Form = ({ type, Post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and Share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform.
			</p>

			<form
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={handleSubmit}
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>
					<textarea
						value={Post.prompt}
						onChange={(e) => setPost({ ...Post, prompt: e.target.value })}
						required
						className="form_textarea"
						placeholder="Write your prompt here..."
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag{` `}
						<span className="font-normal">
							(#product,#webdevelopment,#idea,...)
						</span>
					</span>
					<input
						value={Post.tag}
						onChange={(e) => setPost({ ...Post, tag: e.target.value })}
						required
						className="form_input"
						placeholder="#tag"
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href={"/"} className="text-gray-500 text-sm">
						Cancel
					</Link>
					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;