import Layout from '../../components/Layout/Layout';
import NewsletterCTA from "../Landing2/components/NewsletterCTA";
import { getImgUrl } from "../Landing2/utils/asset";

const Faq = () => {
    return (
        <Layout footerMode="dark">
            <section className="bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }} data-overlay="5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-9 col-md-12">

                            <div className="fpc-capstion text-center my-4">
                                <div className="fpc-captions">
                                    <h1 className="xl-heading text-light">FAQ's Section</h1>
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
                    <div className="row align-items-start g-4">

                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="card p-4 rounded-4 border br-dashed text-center">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i className="fa-solid fa-briefcase"></i>
                                </div>
                                <div className="crds-desc">
                                    <h5>Head Office</h5>
                                    <p className="text-md lh-2 mb-0">#202 Kumbhriwa Town Road,<br />Rishikesh Denver, QHC21545
                                        CANADA<br />pay@payments.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="card p-4 rounded-4 border br-dashed text-center">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i className="fa-solid fa-headset"></i>
                                </div>
                                <div className="crds-desc">
                                    <h5>Singapore Office</h5>
                                    <p className="text-md lh-2 mb-0">#202 Kumbhriwa Town Road,<br />Rishikesh Denver, QHC21545
                                        CANADA<br />pay@payments.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4">
                            <div className="card p-4 rounded-4 border br-dashed text-center">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-primary fs-2"><i
                                    className="fa-solid fa-envelope-open-text"></i></div>
                                <div className="crds-desc">
                                    <h5>India Office</h5>
                                    <p className="text-md lh-2 mb-0">#202 Kumbhriwa Town Road,<br />Rishikesh Denver, QHC21545
                                        CANADA<br />pay@payments.com</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row align-items-start">
                        <div className="col-xl-12 col-lg-12 col-md-12 mt-4">

                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item border">
                                    <h2 className="accordion-header rounded-2">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            How To Book A resort with Booer.com?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">In a professional context it often happens that private or corporate
                                            clients corder a publication to be made and presented with the actual content still not being ready.
                                            Think of a news blog that's filled with content hourly on the day of going live. However, reviewers
                                            tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the
                                            internet. The are likely to focus on the text, disregarding the layout and its elements.</div>
                                    </div>
                                </div>
                                <div className="accordion-item border rounded-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Can We Pay After Check-out?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">In a professional context it often happens that private or corporate
                                            clients corder a publication to be made and presented with the actual content still not being ready.
                                            Think of a news blog that's filled with content hourly on the day of going live. However, reviewers
                                            tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the
                                            internet. The are likely to focus on the text, disregarding the layout and its elements.</div>
                                    </div>
                                </div>
                                <div className="accordion-item border rounded-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Is This Collaborate with Oyo?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">In a professional context it often happens that private or corporate
                                            clients corder a publication to be made and presented with the actual content still not being ready.
                                            Think of a news blog that's filled with content hourly on the day of going live. However, reviewers
                                            tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the
                                            internet. The are likely to focus on the text, disregarding the layout and its elements.</div>
                                    </div>
                                </div>
                                <div className="accordion-item border rounded-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            Can We get Any Transport For Walk?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">In a professional context it often happens that private or corporate
                                            clients corder a publication to be made and presented with the actual content still not being ready.
                                            Think of a news blog that's filled with content hourly on the day of going live. However, reviewers
                                            tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the
                                            internet. The are likely to focus on the text, disregarding the layout and its elements.</div>
                                    </div>
                                </div>
                                <div className="accordion-item border rounded-2">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                            Can We Get Any Extra Services?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFive" className="accordion-collapse collapse"
                                        data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">In a professional context it often happens that private or corporate
                                            clients corder a publication to be made and presented with the actual content still not being ready.
                                            Think of a news blog that's filled with content hourly on the day of going live. However, reviewers
                                            tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the
                                            internet. The are likely to focus on the text, disregarding the layout and its elements.</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <NewsletterCTA />
        </Layout>
    )
}

export default Faq;