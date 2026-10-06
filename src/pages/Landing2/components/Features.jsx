import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { offers } from './offers';

// Loop mode needs enough slides to rotate smoothly when several are visible.
const slides = offers.length >= 6 ? offers : [...offers, ...offers].map((o, i) => ({ ...o, key: `${o.id}-${i}` }));

const prefersReducedMotion =
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Icon = ({ d }) => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		{d}
	</svg>
);

const icons = {
	trip: <Icon d={<><path d="M17 3l4 4-4 4" /><path d="M3 11V9a2 2 0 0 1 2-2h16" /><path d="M7 21l-4-4 4-4" /><path d="M21 13v2a2 2 0 0 1-2 2H3" /></>} />,
	time: <Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />,
	people: <Icon d={<><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.2a3 3 0 0 1 0 5.6" /><path d="M21 20c0-2.6-1.6-4.8-4-5.6" /></>} />,
};

function Features() {
	return (
		<section className="ofr-section">
			<Container>
				<div className="ofr-head">
					<div>
						<h2 className="ofr-title">Offers worth packing for</h2>
						<p className="ofr-sub">Hand-picked trips with limited-time savings. Book early, prices move quickly.</p>
					</div>
					<div className="ofr-nav" role="group" aria-label="Offer slider controls">
						<button type="button" className="ofr-prev" aria-label="Previous offers">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
						</button>
						<button type="button" className="ofr-next" aria-label="Next offers">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
						</button>
					</div>
				</div>

				<Swiper
					modules={[Autoplay, Navigation, A11y]}
					loop
					speed={900}
					spaceBetween={20}
					slidesPerView={1.15}
					grabCursor
					autoplay={
						prefersReducedMotion
							? false
							: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
					}
					navigation={{ prevEl: '.ofr-prev', nextEl: '.ofr-next' }}
					breakpoints={{
						576: { slidesPerView: 1.6, spaceBetween: 20 },
						768: { slidesPerView: 2, spaceBetween: 24 },
					}}
					className="ofr-swiper"
				>
					{slides.map((offer) => (
						<SwiperSlide key={offer.key || offer.id}>
							<Link to={`/destination-detail/${offer.slug}`} className="ofr-card" aria-label={`${offer.city}, ${offer.discount}, from ${offer.price}`}>
								<img src={offer.img} alt="" className="ofr-img" loading="lazy" />
								<span className="ofr-shade" aria-hidden="true" />

								<span className="ofr-badge">{offer.discount}</span>

								<div className="ofr-panel">
									<h3 className="ofr-city">{offer.city}</h3>

									<ul className="ofr-meta">
										<li>{icons.trip}{offer.trip}</li>
										<li>{icons.time}{offer.duration}</li>
										<li>{icons.people}{offer.persons}</li>
									</ul>

									<div className="ofr-foot">
										<div className="ofr-price">
											<span className="ofr-from">From</span>
											<span className="ofr-amount">{offer.price}</span>
										</div>
										<span className="ofr-go" aria-hidden="true">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
										</span>
									</div>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</Container>
		</section>
	);
}

export default Features;