import React from "react";
import Layout from '../../../components/Layout/Layout';
import MainConent from "./MainConent";
import SimilarFlights from "./SimilarFlights";

const FlightDetails = () => {
    return (
        <Layout footerMode="dark">
            <MainConent />
            <SimilarFlights />
        </Layout>
    )
}

export default FlightDetails;