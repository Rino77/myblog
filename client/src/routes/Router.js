import React, { Fragment } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"

const MyRouter = (params) => {
    return (
        < Fragment >
            <Header/>
                <h1>hello my body</h1>
            <Footer />
        </Fragment >
    )
}

export default MyRouter;