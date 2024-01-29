"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";

const Navbar = () => {
    const {data:session}=useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, settoggleDropdown] = useState(false);
	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};

		fetchProviders();
	}, []);
	return (
		<nav className="flex-between w-full mb-8 md:mb-16 pt-3">
			<Link href={"/"} className="flex gap-2 flex-center">
				<Image
					src="/images/logo.svg"
					alt="Promtopia Logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* for desktop application */}
			<div className="hidden sm:flex gap-3 md:gap-5">
				{session?.user  ? (
					<>
						<Link href={"/createPost"} className="black_btn">
							Create Post
						</Link>
						<button type="button" className="outline_btn" onClick={signOut}>
							Sign Out
						</button>
						<Link href={"/profile"}>
  <div className="rounded-full overflow-hidden ">
    <Image
      src={session?.user?.image}
      alt="Profile Logo"
      width={37}
      height={37}
      className="object-cover w-full h-full"
    />
  </div>
</Link>

					</>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn()}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* for mobile application */}
			<div className="flex sm:hidden relative">
            {session?.user ? (
					<>
                    <div className="rounded-full overflow-hidden">

						<Image
							src={session.user.image}
							alt="Profile Logo"
							width={37}
							height={37}
							className="object-contain cursor-pointer"
							onClick={() => {
                                settoggleDropdown((prev) => !prev);
							}}
                            />
                     </div>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									className="dropdown_link"
									onClick={() => settoggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href={"/createPost"}
									className="dropdown_link"
									onClick={() => settoggleDropdown(false)}
								>
									Create Post
								</Link>
								<button
									type="button"
									className="mt-5 w-full black_btn"
									onClick={() => {
										settoggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn()}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
