import React, { Fragment } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppNavbar from "../components/AppNavbar"
const MyRouter = (params) => {
    return (
        < Fragment >
            <AppNavbar/>
            <Header/>
                <h1>hello Body</h1>
            <Footer />
        </Fragment >
    )
}

export default MyRouter;