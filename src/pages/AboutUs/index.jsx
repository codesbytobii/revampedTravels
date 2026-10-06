import React from "react";
import Layout from '../../components/Layout/Layout';
import Hero from "./Hero";
import Mission from "./Mission";
import VideoSection from "./VideoSection";
import Facts from "./Facts";
import Articles from "../Landing2/components/Articles";
import NewsletterCTA from "../Landing2/components/NewsletterCTA";

const AboutUs = () => {
    return (
        <Layout footerMode="dark">
            <Hero />
            <Mission />
            <VideoSection />
            <Facts />
            <Articles />
            <NewsletterCTA />
        </Layout>
    )
}

export default AboutUs;