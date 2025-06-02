import React from "react";

const posts = [
	{
		title: "How to Find the Perfect Rental Home",
		date: "2025-05-20",
		summary:
			"Tips and tricks for finding a rental property that fits your needs and budget.",
		link: "#",
		image:
			"https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVudGFsJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
	},
	{
		title: "Understanding Your Lease Agreement",
		date: "2025-05-10",
		summary:
			"A guide to the most important clauses and what to look out for before signing.",
		link: "#",
		image:
			"https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVudGFsJTIwY29udHJhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
	},
	{
		title: "Landlord Tips: Attracting Quality Tenants",
		date: "2025-04-28",
		summary: "Best practices for landlords to find and keep great tenants.",
		link: "#",
		image:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZGxvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
	},
];

const Blog = () => (
	<section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-2 flex items-center justify-center">
		<div className="container mx-auto max-w-5xl bg-white/95 rounded-2xl shadow-xl p-6 border border-gray-200 backdrop-blur">
			<h2 className="text-3xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500 drop-shadow tracking-tight font-serif">
				Blog
			</h2>
			<div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-blue-200 to-blue-600 rounded-full mb-6" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
				{posts.map((post, idx) => (
					<article
						key={idx}
						className="bg-gray-50 rounded-xl p-5 shadow border border-gray-100 w-full flex flex-col hover:shadow-2xl hover:border-blue-300 transition-shadow duration-300 relative"
					>
						<div className="relative rounded-lg overflow-hidden mb-3 w-full h-40 sm:h-48">
							<img
								src={post.image}
								alt={post.title}
								loading="lazy"
								className="rounded-lg w-full h-full object-cover hover:scale-105 transition-transform duration-300"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-lg" />
						</div>
						<h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500 font-serif mb-1">
							{post.title}
						</h3>
						<time className="text-blue-500 text-sm mb-2 block font-medium">
							{new Date(post.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
						<p className="text-blue-900 mb-2 flex-grow">{post.summary}</p>
						<a
							href={post.link}
							className="text-blue-600 font-semibold hover:underline mt-4 inline-flex items-center gap-1"
						>
							Read more
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</a>
					</article>
				))}
			</div>
		</div>
	</section>
);

export default Blog;
