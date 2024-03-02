import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
import "../Smart Watches/SmartWatches.css"
import { Link } from 'react-router-dom';

const firestore = getFirestore(app);

const S_watches = (props) => {
    const [sproducts, setsProducts] = useState([]);
    const [dproducts, setdProducts] = useState([]);
    const [aproducts, setaProducts] = useState([]);
    const [fproducts, setfProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const getDocuments = async () => {
            const ref = collection(firestore, "products");
            const q = query(ref, limit(props.value), where("cat", "==", "smart"));
            const q2 = query(ref, limit(props.value), where("cat", "==", "digital"));
            const q3 = query(ref, limit(props.value), where("cat", "==", "fitness"));
            const q4 = query(ref, limit(props.value), where("cat", "==", "analog"));
            const snap = await getDocs(q);
            const snap2 = await getDocs(q2);
            const snap3 = await getDocs(q3);
            const snap4 = await getDocs(q4);
            const productsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const productsData2 = snap2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const productsData3 = snap3.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const productsData4 = snap4.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setsProducts(productsData);
            setaProducts(productsData4);
            setdProducts(productsData2);
            setfProducts(productsData3);
        }

        getDocuments();

    }, []);


    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart([...cart, item]);
        console.log(cart);
    };

    const [addedProducts, setAddedProducts] = useState([]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProducts([...addedProducts, product.id]);
    };

    return (
        <div>
            <section className="sw">
                <div className="container px-lg-5 mt-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h2 className="fw-bolder mb-0">Smart Watches</h2>
                        {props.value === 4 && (
                            <Link to={{pathname:"/explore"}} state={{data: "smart"}} className="btn btn-outline-dark mt-3 mt-md-0 text-light">Explore</Link>
                            )}
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        {sproducts.map(product => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={product.id}>
                                <div className="card h-100">
                                {props.value === 4 && (
                                    <div class="badge bg-dark text-white position-absolute">Sale</div>
                                    )}
                                    <img className="card-img-top pt-2" src={product.image1} alt="..." style={{ height: "250px", objectFit: "cover", borderRadius: "20px" }} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.product_name}</h5>
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <div key={index} className={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                ))}
                                                 &nbsp; <p className='text-dark'>
                                                    ({product.no_of_reviews})
                                                </p>
                                            </div>
                                            <span className="text-muted text-decoration-line-through">₹{product.price + 2000} </span>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            {/* <a className="btn btn-outline-dark mt-auto text-light" href="">Details</a> */}
                                            <Link to={{pathname: "/details"}} state={{data: product}} className="btn btn-outline-dark mt-auto text-light">Details</Link>
                                            &nbsp;&nbsp;
                                            {addedProducts.includes(product.id) ? (
                                                <button className="btn btn-outline-dark mt-auto text-light">Added</button>
                                            ) : (
                                                <button className="btn btn-outline-dark mt-auto text-light" type='button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sw">
                <div className="container px-lg-5 mt-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h2 className="fw-bolder mb-0">Analog Watches</h2>
                        {props.value === 4 && (
                            <Link to={{pathname:"/explore"}} state={{data: "analog"}} className="btn btn-outline-dark mt-3 mt-md-0 text-light">Explore</Link>
                            )}
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        {aproducts.map(product => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={product.id}>
                                <div className="card h-100">
                                {props.value === 4 && (
                                    <div class="badge bg-dark text-white position-absolute">Sale</div>
                                    )}
                                    <img className="card-img-top pt-2" src={product.image1} alt="..." style={{ height: "250px", objectFit: "cover", borderRadius: "20px" }} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.product_name}</h5>
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <div key={index} className={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                ))}
                                                 &nbsp; <p className='text-dark'>
                                                    ({product.no_of_reviews})
                                                </p>
                                            </div>
                                            <span className="text-muted text-decoration-line-through">₹{product.price + 2000} </span>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            {/* <a className="btn btn-outline-dark mt-auto text-light" href="">Details</a> */}
                                            <Link to={{pathname: "/details"}} state={{data: product}} className="btn btn-outline-dark mt-auto text-light">Details</Link>
                                            &nbsp;&nbsp;
                                            {addedProducts.includes(product.id) ? (
                                                <button className="btn btn-outline-dark mt-auto text-light">Added</button>
                                            ) : (
                                                <button className="btn btn-outline-dark mt-auto text-light" type='button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sw">
                <div className="container px-lg-5 mt-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h2 className="fw-bolder mb-0">Digital Watches</h2>
                        {props.value === 4 && (
                            <Link to={{pathname:"/explore"}} state={{data: "digital"}} className="btn btn-outline-dark mt-3 mt-md-0 text-light">Explore</Link>
                            )}
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        {dproducts.map(product => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={product.id}>
                                <div className="card h-100">
                                {props.value === 4 && (
                                    <div class="badge bg-dark text-white position-absolute">Sale</div>
                                    )}
                                    <img className="card-img-top pt-2" src={product.image1} alt="..." style={{ height: "250px", objectFit: "cover", borderRadius: "20px" }} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.product_name}</h5>
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <div key={index} className={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                ))}
                                                 &nbsp; <p className='text-dark'>
                                                    ({product.no_of_reviews})
                                                </p>
                                            </div>
                                            <span className="text-muted text-decoration-line-through">₹{product.price + 2000} </span>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            {/* <a className="btn btn-outline-dark mt-auto text-light" href="">Details</a> */}
                                            <Link to={{pathname: "/details"}} state={{data: product}} className="btn btn-outline-dark mt-auto text-light">Details</Link>
                                            &nbsp;&nbsp;
                                            {addedProducts.includes(product.id) ? (
                                                <button className="btn btn-outline-dark mt-auto text-light">Added</button>
                                            ) : (
                                                <button className="btn btn-outline-dark mt-auto text-light" type='button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sw">
                <div className="container px-lg-5 mt-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h2 className="fw-bolder mb-0">Fitness Bands</h2>
                        {props.value === 4 && (
                            <Link to={{pathname:"/explore"}} state={{data: "fitness"}} className="btn btn-outline-dark mt-3 mt-md-0 text-light">Explore</Link>
                            )}
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        {fproducts.map(product => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={product.id}>
                                <div className="card h-100">
                                {props.value === 4 && (
                                    <div class="badge bg-dark text-white position-absolute">Sale</div>
                                    )}
                                    <img className="card-img-top pt-2" src={product.image1} alt="..." style={{ height: "250px", objectFit: "cover", borderRadius: "20px" }} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.product_name}</h5>
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <div key={index} className={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                ))}
                                                 &nbsp; <p className='text-dark'>
                                                    ({product.no_of_reviews})
                                                </p>
                                            </div>
                                            <span className="text-muted text-decoration-line-through">₹{product.price + 2000} </span>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            {/* <a className="btn btn-outline-dark mt-auto text-light" href="">Details</a> */}
                                            <Link to={{pathname: "/details"}} state={{data: product}} className="btn btn-outline-dark mt-auto text-light">Details</Link>
                                            &nbsp;&nbsp;
                                            {addedProducts.includes(product.id) ? (
                                                <button className="btn btn-outline-dark mt-auto text-light">Added</button>
                                            ) : (
                                                <button className="btn btn-outline-dark mt-auto text-light" type='button' onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default S_watches