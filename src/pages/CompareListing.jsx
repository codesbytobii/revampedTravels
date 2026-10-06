import React from "react";
import Layout from '../components/Layout/Layout';

//import images
import hotel1 from "assets/img/hotel/hotel-1.jpg";
import hotel2 from "assets/img/hotel/hotel-2.jpg";
import hotel3 from "assets/img/hotel/hotel-3.jpg";
import hotel4 from "assets/img/hotel/hotel-4.jpg";
import { getImgUrl } from "./Landing2/utils/asset";
import NewsletterCTA from "./Landing2/components/NewsletterCTA";
import { Link } from "react-router-dom";
const CompareListing = () => {
    return (
        <Layout footerMode="dark">
		<section className="bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }} data-overlay="5">
			<div className="container">
				<div className="row align-items-center justify-content-center">
					<div className="col-xl-7 col-lg-9 col-md-12">

						<div className="fpc-capstion text-center my-4">
							<div className="fpc-captions">
								<h1 className="xl-heading text-light">Compare Your Hotels</h1>
								<p className="text-light">Cicero famously orated against his political opponent Lucius Sergius Catilina.
									Occasionally the first Oration against Catiline is taken for type specimens</p>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div className="fpc-banner"></div>
		</section>
		<section>
			<div className="container">

				<div className="row gx-4 gy-4">
					<div className="col-lg-3 col-md-4 col-sm-12 text-center">
						<div className="comp-property">
							<Link to="#">
								<div className="clp-img">
									<img src={hotel1} className="img-fluid rounded" alt="" />
									<span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
								</div>

								<div className="clp-title">
									<h4>Roojika Apartments</h4>
									<span>$50,999</span>
								</div>
							</Link>
							<ul>
								<li>
									1750 sq ft
									<span className="show-mb"></span>
								</li>
								<li>
									3
									<span className="show-mb">Rooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bedrooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bathrooms</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Air Conditioning</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb"> No Swimming Pool</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Laundry Room</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb">No Window Covering</span>
								</li>
								<li className="inactive">
									1 - 5 Year
									<span className="show-mb">Age</span>
								</li>
								<li className="inactive">
									<div className="checkmark"></div>
									<span className="show-mb">Alarm</span>
								</li>
								<li className="inactive">
									Forced Air
									<span className="show-mb">Forced Air</span>
								</li>
								<li className="inactive">
									<div className="checkmark"></div>
									<span className="show-mb">Parking</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-12 text-center">
						<div className="comp-property">
							<Link to="#">
								<div className="clp-img">
									<img src={hotel2} className="img-fluid rounded" alt="" />
									<span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
								</div>

								<div className="clp-title">
									<h4>Green Susmita Estae</h4>
									<span>$67,500</span>
								</div>
							</Link>
							<ul>
								<li>
									1750 sq ft
									<span className="show-mb"></span>
								</li>
								<li>
									3
									<span className="show-mb">Rooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bedrooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bathrooms</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Air Conditioning</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb"> No Swimming Pool</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Laundry Room</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb">No Window Covering</span>
								</li>
								<li>
									1 - 5 Year
									<span className="show-mb">Age</span>
								</li>
								<li className="inactive">
									<div className="checkmark"></div>
									<span className="show-mb">Alarm</span>
								</li>
								<li className="inactive">
									Forced Air
									<span className="show-mb">Forced Air</span>
								</li>
								<li className="inactive">
									<div className="checkmark"></div>
									<span className="show-mb">Parking</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-12 text-center pricing--emphasise">
						<div className="comp-property">
							<Link to="#">
								<div className="clp-img">
									<img src={hotel3} className="img-fluid rounded" alt="" />
									<span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
								</div>

								<div className="clp-title">
									<h4>Avada Real Setate</h4>
									<span>$90,780</span>
								</div>
							</Link>
							<ul>
								<li>
									1750 sq ft
									<span className="show-mb">Area</span>
								</li>
								<li>
									3
									<span className="show-mb">Rooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bedrooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bathrooms</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Air Conditioning</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb"> No Swimming Pool</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Laundry Room</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb">No Window Covering</span>
								</li>
								<li>
									1 - 5 Year
									<span className="show-mb">Age</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Alarm</span>
								</li>
								<li className="inactive">
									Gas
									<span className="show-mb">Gas Heating</span>
								</li>
								<li className="inactive">
									<div className="checkmark"></div>
									<span className="show-mb">Parking</span>
								</li>
							</ul>
						</div>
					</div>
					
					<div className="col-lg-3 col-md-4 col-sm-12 text-center">
						<div className="comp-property">
							<Link to="#">
								<div className="clp-img">
									<img src={hotel4} className="img-fluid rounded" alt="" />
									<span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
								</div>

								<div className="clp-title">
									<h4>Sujata Real Estate</h4>
									<span>$87,599</span>
								</div>
							</Link>
							<ul>
								<li>
									1750 sq ft
									<span className="show-mb">Area</span>
								</li>
								<li>
									3
									<span className="show-mb">Rooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bedrooms</span>
								</li>
								<li>
									2
									<span className="show-mb">Bathrooms</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Air Conditioning</span>
								</li>
								<li>
									<div className="crossmark"></div>
									<span className="show-mb"> No Swimming Pool</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Laundry Room</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Window Covering</span>
								</li>
								<li>
									1 - 5 Year
									<span className="show-mb">Age</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Alarm</span>
								</li>
								<li>
									Forced Air
									<span className="show-mb">Forced Air</span>
								</li>
								<li>
									<div className="checkmark"></div>
									<span className="show-mb">Parking</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

			</div>
		</section>
        <NewsletterCTA />
        </Layout>
    )
}

export default CompareListing;