import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
import S_watches from '../../components/Smart Watches/S_watches';
import { Footer } from '../../components';
import Band from '../../components/Fitness Bands/Band';
import Analog from '../../components/Analog Watches/Analog';
import Digital from '../../components/Digital Watches/Digital';

const firestore = getFirestore(app);

const Homepage = () => {
    const limit = 4;
    return (
        <div>
            <Header />
            <section className="Head py-5">
                <div className="container px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6 images">
                            {/* <img className="card-img-top mb-5 mb-md-0" src={img} alt="..." /> */}
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1" style={{ fontSize: "1rem", fontWeight: "bold" }}>wEAR<span className='dot'>it.</span></div>
                            <h1 className="display-5 fw-bolder text-uppercase">Wear your confidence.</h1>
                            <div className="fs-5 mb-5">
                                {/* <span className="text-decoration-line-through">$45.00</span>
                                    <span>$40.00</span> */}
                            </div>
                            <p className="lead" style={{ textAlign: "justify" }}>Welcome to our watch emporium, where time isn't just a measurement but a canvas for style and sophistication. Dive into a world where every tick echoes elegance and precision craftsmanship. </p>
                            <div className="d-flex">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SmartWatches */}
            <S_watches value = {limit}/>

            {/* Analog Watches */}
            {/* <Analog  value = {limit}/> */}

            {/* Digital Watches */}
            {/* <Digital  value = {limit}/> */}

            {/* Fitness Bands */}
            {/* <Band  value = {limit}/> */}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Homepage
