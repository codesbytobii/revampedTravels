import Layout from '../../components/Layout/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import Reviews from './components/Reviews';
import Articles from './components/Articles';
import NewsletterCTA from './components/NewsletterCTA';
import Offers from './components/Offers.jsx';

function Landing2() {
	return (
		<Layout footerMode="dark">
			<Hero />
			<Features />
			<Offers />
			<VideoSection />
			<Reviews />
			<Articles />
			<NewsletterCTA />
		</Layout>
	);
}

export default Landing2;


