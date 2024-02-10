"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";


const Test = ({ data }) => {
  // Split the data into words
  const words = data.split(' ');

  // Take the first two words
  const firstTwoWords = words.slice(0, 6).join(' ');

  // Concatenate "..." to the first two words
  const truncatedData = `${firstTwoWords} ...`;

  return (
    <div dangerouslySetInnerHTML={{ __html: truncatedData }}></div>
  );
};

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        toast.success("Copied to Clipboard");
        setTimeout(() => setCopied(""), 3000);
    };

    const handleImageOnclick = () => {
        if (session?.user.id === post.creator._id) return router.push('/profile');
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    };

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-1">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        onClick={handleImageOnclick}
                        src={post?.creator?.image}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900 overflow-hidden">
                            {post?.creator?.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500 overflow-hidden">
                            {post?.creator?.email}
                        </p>
                    </div>
                </div>

                {session?.user.id === post.creator._id && pathname === "/profile" && (
                    <>
                        <div className="flex gap-2 mt-1.5">
                            <button onClick={handleEdit}>
                                <FaRegEdit size={16} className="text-blue-500" />
                            </button>
                            <button onClick={handleDelete}>
                                <MdOutlineDeleteOutline size={16} className="text-teal-500" />
                            </button>
                        </div>
                    </>
                )}

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
                        alt="Copy button"
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <div className="my-4 font-satoshi text-sm text-gray-700 overflow-hidden">
                <Test data={post.prompt} />
            </div>

            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{` `}
                {post.tag}
            </p>
        </div>
    );
};

export default PromptCard;
