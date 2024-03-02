import React, { useEffect, useState } from 'react';
import "../Header/Header.css";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';

const firestore = getFirestore(app);

const Header = () => {
    const [len, setLen] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([]);

    // Function to update cart length
    const updateCartLength = () => {
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        setLen(carts.length);
    };

    // Function to add item to cart
    const addToCart = (item) => {
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        carts.push(item);
        localStorage.setItem('cart', JSON.stringify(carts));
        updateCartLength(); // Update cart length immediately after adding an item
    };

    useEffect(() => {
        updateCartLength(); // Initial update
        window.addEventListener('storage', updateCartLength); // Listen for changes in local storage
        return () => {
            window.removeEventListener('storage', updateCartLength);
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            const productsCollection = collection(firestore, 'products');
            const data = await getDocs(productsCollection);
            const productsArray = data.docs.map(doc => doc.data().product_name);
            setProducts(productsArray);
            const filtered = productsArray.filter(product =>
                product.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const ref = collection(firestore, 'products');
            const q = query(ref, where("product", "in", filtered));
            const snapshot = await getDocs(q);
            const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg animate__animated animate__fadeInDown">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="/">wEAR<span className='dot'>it</span><span className="dot">.</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className=""><i className="bi bi-stack"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/contact' aria-disabled="true">Contact</a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" required placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button className="search btn" type="submit"><i className="bi bi-search text-white"></i></button>&nbsp;
                        </form>
                        <a className="btn" href='/cart'><i className="bi bi-bag-fill text-white"></i></a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;
