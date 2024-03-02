import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
import "../Smart Watches/SmartWatches.css"
import { Link } from 'react-router-dom';

const firestore = getFirestore(app);

const Analog = (props) => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

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

    useEffect(() => {

        const getDocuments = async () => {
            const ref = collection(firestore, "products");
            const q = query(ref, limit(props.value), where("cat", "==", "analog"));
            const snap = await getDocs(q);
            const productsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
        }

        getDocuments();
        console.log(products);

    }, []);
    return (
        <div>
            <section class="sw">
                <div class="container px-lg-5 mt-5">
                    <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h2 class="fw-bolder mb-0">Analog Watches</h2>
                        {props.value === 4 && (
                        <a href="#" class="btn btn-outline-dark mt-3 mt-md-0 text-light">Explore</a>
                        )}
                    </div>
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        {products.map(product => (
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-5">
                                <div class="card h-100">
                                    {props.value === 4 && (
                                    <div class="badge bg-dark text-white position-absolute">Sale</div>
                                    )}
                                    <img class="card-img-top pt-1" src={product.image1} alt="..." style={{ height: "250px", objectFit: "cover", borderRadius: "20px" }} />
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <h5 class="fw-bolder">{product.product_name}</h5>
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <div key={index} className={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                ))}
                                                 &nbsp; <p className='text-dark'>
                                                    ({product.no_of_reviews})
                                                </p>
                                            </div>
                                            <span class="text-muted text-decoration-line-through">₹{product.price + 2000} </span>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center">
                                        <Link to={{pathname:"/details"}} state={{data:product}} class="btn btn-outline-dark mt-auto text-light">Details</Link>
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

export default Analog