import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
import { Link, useLocation } from 'react-router-dom';
import Smart from '../../components/Smart/Smart';
import Analog from '../../components/Analog Watches/Analog';
import Digital from '../../components/Digital Watches/Digital';
import Band from '../../components/Fitness Bands/Band';
import { Footer } from '../../components';

const Explore = (porps) => {
    const location = useLocation();
    console.log(location)
    const { data } = location.state;
    return (
        <div>
            <Header/>
            <div>
                {data === "smart" ? (
                    <Smart/>
                ) : data === "analog" ? (
                    <Analog />
                ) : data === "digital" ? (
                    <Digital />
                ) : (
                    <Band />
                )
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Explore