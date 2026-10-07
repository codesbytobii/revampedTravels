import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout/Layout';
import Header from './Header';
import MainConent from './MainConent';
import {
	buildOfferParams,
	fetchOffers,
	fetchMultiCityOffers,
	buildMultiCityBody,
	normalizeOffers,
} from '../../Landing2/utils/flights';

const FlightList01 = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const initialSearch = state?.search;

	const [search, setSearch] = useState(initialSearch);
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (initialSearch) setSearch(initialSearch);
	}, [initialSearch]);

	useEffect(() => {
		if (!search) return;

		const controller = new AbortController();
		setLoading(true);
		setError('');

		const run = async () => {
			try {
				if (search.tripType === 'multicity') {
					const body = buildMultiCityBody({
						legs: search.legs,
						travelers: search.travelers,
						cabin: search.cabin,
					});
					const res = await fetchMultiCityOffers(body, controller.signal);
					const offers = normalizeOffers(res);

					const title = search.legs
						.map(l => `${l.origin}→${l.destination}`)
						.join(' · ');

					setGroups([{ title, offers }]);
				} else {
					const responses = await Promise.all(
						search.searches.map(s =>
							fetchOffers(
								buildOfferParams({
									...s,
									travelers: search.travelers,
									cabin: search.cabin,
								}),
								controller.signal
							)
						)
					);
					setGroups(responses.map((res, i) => ({
						title: `${search.searches[i].origin} → ${search.searches[i].destination}`,
						offers: normalizeOffers(res),
					})));
				}
				setLoading(false);
			} catch (err) {
				if (err.name === 'AbortError') return;
				setGroups([]);
				setError("Couldn't fetch flights. Please try again.");
				setLoading(false);
			}
		};

		run();
		return () => controller.abort();
	}, [search]);

	const handleSearch = useCallback((nextSearch) => {
		setSearch(nextSearch);
		navigate('/flights', { state: { search: nextSearch }, replace: true });
	}, [navigate]);

	const handleSelect = (offer) => {
		console.log('Selected offer:', offer.raw);
	};

	return (
		<Layout>
			<Header search={search} onSearch={handleSearch} />
			<MainConent
				groups={groups}
				loading={loading}
				error={error}
				hasSearch={!!search}
				onSelect={handleSelect}
				travelers={search?.travelers}
			/>
		</Layout>
	);
};

export default FlightList01;