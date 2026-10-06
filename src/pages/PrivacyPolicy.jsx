import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';
import { getImgUrl } from './Landing22/utils/asset';
// import NewsletterCTA from './Landing2/components/NewsletterCTA';


function PrivacyPolicy() {
    return (
        <Layout footerMode="dark">
            {/* <section className="bg-cover position-relative" style={{ background: `url(${getImgUrl('bg-title.jpg')}) no-repeat` }} data-overlay="5">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col xl={7} lg={9} md={12}>

                            <div className="fpc-capstion text-center my-4">
                                <div className="fpc-captions">
                                    <h1 className="xl-heading text-light">Privacy & Policy</h1>
                                    <p className="text-light">Cicero famously orated against his political opponent Lucius Sergius Catilina.
                                        Occasionally the first Oration against Catiline is taken for type specimens</p>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>
                <div className="fpc-banner"></div>
            </section> */}

            <section>
                <Container>
                    <Row className="justify-content-center g-4">
                        <Col xl={12} lg={12} md={12}>
                            <h2>Privacy & Policy</h2>
                            <p>When ordering or registering on our Site you may be asked to enter your name, member name, email address,
                                mailing address, country, billing information or other details to help you with your experience. These
                                information are collected in purpose of providing services described on it, like to verify your identity
                                when you sign in to website, to process your transactions made on site, to respond to support tickets and
                                offer customer services, for administrative and accounting needs that we required to provide to
                                government. When you submit a support question we collect your first name, last name and your email
                                address so that we can correspond with you.</p>
                            <h3 className="fs-4">Google Analytics</h3>
                            <p>In a professional context it often happens that private or corporate clients corder a publication to be
                                made and presented with the actual content still not being ready. Think of a news blog that's filled with
                                content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible
                                content, say, a random text copied from a newspaper or the internet. </p>
                            <h3 className="fs-4">Who we share your data with</h3>
                            <p>In a professional context it often happens that private or corporate clients corder a publication to be
                                made and presented with the actual content still not being ready. Think of a news blog that's filled with
                                content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible
                                content, say, a random text copied from a newspaper or the internet. </p>
                            <h3 className="fs-4">Embedded content from other websites</h3>
                            <p>In a professional context it often happens that private or corporate clients corder a publication to be
                                made and presented with the actual content still not being ready. Think of a news blog that's filled with
                                content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible
                                content, say, a random text copied from a newspaper or the internet. </p>
                            <h3 className="fs-4">How long we retain your data</h3>
                            <p>In a professional context it often happens that private or corporate clients corder a publication to be
                                made and presented with the actual content still not being ready. Think of a news blog that's filled with
                                content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible
                                content, say, a random text copied from a newspaper or the internet. </p>
                            <h3 className="fs-4">Changes to this privacy policy</h3>
                            <p>In a professional context it often happens that private or corporate clients corder a publication to be
                                made and presented with the actual content still not being ready. Think of a news blog that's filled with
                                content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible
                                content, say, a random text copied from a newspaper or the internet. </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <NewsletterCTA /> */}
        </Layout>
    );
}

export default PrivacyPolicy;

