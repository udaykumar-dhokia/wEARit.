import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useLocation } from 'react-router-dom'
import "../Details/Details.css"
import S_watches from '../Smart Watches/S_watches'
import Analog from '../Analog Watches/Analog'
import Digital from '../Digital Watches/Digital'
import Band from '../Fitness Bands/Band'
import Smart from '../Smart/Smart'


const Details = (props) => {
    const location = useLocation();
    console.log(location)
    const { data } = location.state;
    return (
        <div>
            <Header />

            <main class="main mt-5 pt-4">
                <div class="container mt-5">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-6 mb-4">
                            <img src={data.image1} class="img-fluid rounded" alt="" style={{ maxWidth: "100%", height: "auto" }} />
                        </div>

                        <div class="col-md-6 mb-4">
                            <div class="p-4">
                                <div class="mb-3">
                                    <h2 class="fw-bold">{data.product_name}</h2>
                                </div>
                                <p class="lead">
                                    <span class="me-1">
                                        <del style={{ fontSize: "1.5rem" }}>₹{data.price + 2000}</del>
                                    </span>
                                    <span style={{ fontSize: "3rem" }}>₹{data.price}</span>
                                </p>

                                <div class="d-flex align-items-center small text-warning mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className={`bi-star-fill ${index < data.rating ? 'text-warning' : 'text-muted'}`}></div>
                                    ))}
                                    &nbsp;
                                    <p class='text-dark'>({data.no_of_reviews})</p>
                                </div>

                                <strong><p>Description</p></strong>

                                <p>{data.desciption}</p>

                                <form class="d-flex justify-content-left">
                                    <div class="form-outline me-1">
                                        <input type="number" defaultValue={1} class="form-control" />
                                    </div>
                                    <button class="btn btn-primary ms-1">
                                        Add to cart
                                        <i class="fas fa-shopping-cart ms-1"></i>
                                    </button>
                                    <button class="btn btn-primary ms-1" type="">
                                        Buy Now
                                        <i class="fas fa-shopping-cart ms-1"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div class="row">
                        {data.cat === "smart" ? (
                            <Smart/>
                        ) : data.cat === "analog" ? (
                            <Analog />
                        ) : data.cat === "digital" ? (
                            <Digital />
                        ) : (
                            <Band />
                        )
                        }
                    </div>
                </div>
            </main>


            <Footer />
        </div>
    )
}

export default Details