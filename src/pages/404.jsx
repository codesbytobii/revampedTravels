import Layout from '../components/Layout/Layout';

import notfound from '../assets/img/404.png';

function NotFound() {
    return (
        <Layout footerMode="dark">
            <section className="position-relative">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-9 col-md-12">

                            <div className="404-capstion text-center my-4">
                                <div className="404-captions">
                                    <img src={notfound} className="img-fluid mb-3" alt="" />
                                        <h1 className="display-1 fw-bold mb-0">404</h1>
                                        <h2>Ohhh ho, something went wrong!</h2>
                                        <p className="fs-6">Cicero famously orated against his political opponent.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default NotFound;

