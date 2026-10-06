import { getImgUrl } from "../Landing2/utils/asset";
import { Card, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import NewsletterCTA from "../Landing2/components/NewsletterCTA";

//import images
import banner02 from "../../assets/img/banner-02.jpg";
import team1 from "../../assets/img/team-1.jpg";
import { Link } from "react-router-dom";

const BlogDetail = () => {
    return (
        <>
            <Layout footerMode="dark">
                <section className="p-0">
                    <div className="thumb-wrap">
                        <img src={banner02} className="img-fluid full-width ht-500 object-fit" alt="" />
                    </div>
                </section>

                <section className="p-0 position-relative mt-n6">
                    <div className="container">
                        <div className="row g-4">

                            <div className="col-11 col-lg-10 mx-auto">
                                <div className="bg-white shadow rounded-4 p-4">

                                    <div className="d-inline-flex mb-2"><span className="label text-success bg-light-success">Software & Tools</span></div>

                                    <h1 className="fs-3">Top 20 AI Tools To Make Your Website More Attractive</h1>
                                    <p className="mb-2">Commercial publishing platforms and conten Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder.</p>


                                    <ul className="nav nav-divider align-items-center p-0">
                                        <li className="nav-item ps-0">
                                            <div className="nav-link">
                                                <div className="d-flex align-items-center">

                                                    <div className="avatar avatar-lg">
                                                        <img className="avatar-img circle" src={team1} alt="avatar" />
                                                    </div>

                                                    <div className="ms-2">
                                                        <h6 className="mb-0"><Link to="#">Adam Wisdom</Link></h6>
                                                        <p className="mb-0"><span>10 Sep 2023</span><span className="text-muted-2 mx-2">.</span><span>2 min read</span></p>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="nav-item text-muted text-md"></li>
                                        <li className="nav-item text-muted text-md"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-10 mx-auto">
                                <p><span className="square--60 rounded fs-4 bg-light-primary d-inline-flex me-2 fw-bold text-primary">I</span> n a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text</p>
                                <h5 className="my-4">There are some important tools for AI</h5>
                                <div className="row g-4">

                                    <div className="col-md-12 col-lg-12">
                                        <p>Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken for type specimens: Quo usque tandem abutere, Catilina, patientia nostra? Quam diu etiam furor iste tuus nos eludet? (How long, O Catiline, will you abuse our patience? And for how long will that madness</p>
                                        <ul className="simple-list">
                                            <li>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem</li>
                                            <li>The Latin scholar H. Rackham translated the above in 1914</li>
                                            <li>But I must explain to you how all this mistaken idea of denouncing</li>
                                            <li>Pleasure and praising pain was born and I will give you a complete</li>
                                            <li>Pain was born and I will give you a complete</li>
                                        </ul>
                                    </div>
                                </div>

                                <p className="pb-0 pt-3">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.</p>


                                <blockquote className="bg-light-primary rounded text-center p-3 p-md-4 my-4">
                                    <h6 className="fw-normal"><i className="fa-solid fa-quote-left me-2"></i>Asking the client to pay no attention Lorem Ipsum isn't hard as it doesn’t make sense in the first place, that will limit any initial interest soon enough. Try telling a client to ignore draft copy however, and you're up to something you can't win.<i className="fa-solid fa-quote-right ms-2"></i></h6>
                                    <div className="blockquote-footer mb-0 fs-6 mt-3 text-primary fw-medium">
                                        Rouze M. Alhatri
                                    </div>
                                </blockquote>

                                <p className="mt-3">In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.</p>
                                <p>The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread? Design comps, layouts, wireframes—will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever.</p>


                                <div className="bg-mode border rounded p-4">

                                    <div className="d-flex">

                                        <Link to="#">
                                            <div className="avatar avatar-lg me-2 me-md-4">
                                                <img className="avatar-img rounded-circle" src={team1} alt="avatar" />
                                            </div>
                                        </Link>

                                        <div>
                                            <Link className="m-0"><a to="#">Adam Wisdom</a></Link>
                                            <small>Ffsd Travels Senior Writer</small>
                                        </div>
                                    </div>


                                    <p className="my-3">Using dummy content or fake elegant design can quickly begin to bloat with unexpected content information in the Web design process can result in products with unrealistic assumptions and potentially serious design flaws. A seemingly.</p>


                                    <div className="d-flex align-items-center justify-content-between">

                                        <ul className="nav">
                                            <li className="nav-item">
                                                <a className="nav-link ps-0 pe-2 fs-5" href="#"><i className="fa-brands fa-facebook"></i></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-twitter"></i></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-google-plus"></i></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link px-2 fs-5" href="#"><i className="fa-brands fa-linkedin"></i></a>
                                            </li>
                                        </ul>
                                        <Link to="#" className="btn btn-md btn-primary mb-0">Contact Author</Link>
                                    </div>
                                </div>

                                <div className="bg-light rounded d-md-flex justify-content-between align-items-center text-center p-3 mt-4">

                                    <h6 className="mb-0">Was this article helpful?</h6>
                                    <small className="py-3 p-md-0 d-block">40 out of 84 found this helpful</small>

                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" />
                                        <label className="btn btn-outline-secondary btn-sm mb-0" for="btnradio1"><i className="fa-regular fa-thumbs-up me-1"></i> Yes</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" />
                                        <label className="btn btn-outline-secondary btn-sm mb-0" for="btnradio2"> No <i className="fa-regular fa-thumbs-down ms-1"></i></label>
                                    </div>
                                </div>
                                <div className="d-lg-flex justify-content-lg-between mt-4">
                                    <div className="align-items-center mb-3 mb-lg-0">
                                        <h6 className="d-inline-block mb-2 me-4">Share This:</h6>
                                        <ul className="list-inline hstack flex-wrap gap-3 h6 fw-normal mb-0">
                                            <li className="list-inline-item"> <a className="text-facebook" href="#"><i className="fa-brands fa-facebook-square"></i> Facebook</a> </li>
                                            <li className="list-inline-item"> <a className="text-instagram-gradient" href="#"><i className="fa-brands fa-instagram-square"></i> Instagram</a> </li>
                                            <li className="list-inline-item"> <a className="text-twitter" href="#"><i className="fa-brands fa-twitter-square"></i> Twitter</a> </li>
                                        </ul>
                                    </div>
                                    <div className="align-items-center">
                                        <h6 className="d-inline-block mb-2 me-4">Popular Tags:</h6>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item"> <a className="btn btn-light btn-sm mb-xl-0" href="#">Article</a> </li>
                                            <li className="list-inline-item"> <a className="btn btn-light btn-sm mb-xl-0" href="#">Holiday</a> </li>
                                            <li className="list-inline-item"> <a className="btn btn-light btn-sm mb-xl-0" href="#">Destination</a> </li>
                                            <li className="list-inline-item"> <a className="btn btn-light btn-sm mb-xl-0" href="#">Ffsd Travels</a> </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <NewsletterCTA />
            </Layout>
        </>
    )
}

export default BlogDetail;