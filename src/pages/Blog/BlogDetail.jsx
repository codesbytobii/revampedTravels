import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import NewsletterCTA from '../Landing2/components/NewsletterCTA';
import { fetchBlogBySlug } from '../../utils/blogs';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1488646952444-1cb53e4e0cbe?auto=format&fit=crop&w=1600&q=70';

const BlogDetail = () => {
	const { slug } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError('');
			try {
				const found = await fetchBlogBySlug(slug);
				if (!cancelled) {
					if (found) setBlog(found);
					else setError('Article not found.');
				}
			} catch (err) {
				console.error(err);
				if (!cancelled) setError('Could not load this article.');
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		run();
		return () => { cancelled = true; };
	}, [slug]);

	return (
		<Layout footerMode="dark">
			<section className="p-0">
				<div className="thumb-wrap">
					<img
						src={blog?.image || FALLBACK_IMG}
						className="img-fluid full-width ht-500 object-fit"
						alt={blog?.title || ''}
						onError={e => { e.currentTarget.src = FALLBACK_IMG; }}
					/>
				</div>
			</section>

			<section className="p-0 position-relative mt-n6">
				<div className="container">
					<div className="row g-4">
						<div className="col-11 col-lg-10 mx-auto">
							<div className="bg-white shadow rounded-4 p-4">
								{loading ? (
									<div className="text-center py-4">
										<div className="spinner-border text-primary" role="status" />
									</div>
								) : !blog ? (
									<p className="text-muted mb-0">{error || 'Article not found.'}</p>
								) : (
									<>
										{blog.tags[0] && (
											<div className="d-inline-flex mb-2">
												<span className="label text-success bg-light-success">{blog.tags[0]}</span>
											</div>
										)}

										<h1 className="fs-3">{blog.title}</h1>
										<p className="mb-2">{blog.excerpt}</p>

										<ul className="nav nav-divider align-items-center p-0">
											<li className="nav-item ps-0">
												<div className="nav-link">
													<div className="d-flex align-items-center">
														<div className="ms-2">
															<p className="mb-0">
																<span>{blog.date}</span>
																<span className="text-muted-2 mx-2">.</span>
																<span>{blog.readTime}</span>
															</p>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-10 mx-auto">
							{loading ? null : !blog ? null : (
								<>
									{/* The API returns HTML — render it inside the typography wrapper */}
									<div
										className="blog-content"
										dangerouslySetInnerHTML={{ __html: blog.content }}
									/>

									{blog.tags.length > 1 && (
										<div className="d-lg-flex justify-content-lg-between mt-4">
											<div className="align-items-center">
												<h6 className="d-inline-block mb-2 me-4">Popular Tags:</h6>
												<ul className="list-inline mb-0">
													{blog.tags.map(t => (
														<li key={t} className="list-inline-item">
															<span className="btn btn-light btn-sm mb-xl-0">{t}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</section>

			<NewsletterCTA />
		</Layout>
	);
};

export default BlogDetail;