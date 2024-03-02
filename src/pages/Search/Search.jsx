import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { app } from '../../../firebase';
import { Header } from '../../components';
import "../Search/Search.css";

const firestore = getFirestore(app);

const Search = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchColor, setSearchColor] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [final, setFinal] = useState([]);
    const [sortByPriceLH, setSortByPriceLH] = useState(false);
    const [sortByPriceHL, setSortByPriceHL] = useState(false);
    const [sortByRateLH, setSortByRateLH] = useState(false);
    const [sortByRateHL, setSortByRateHL] = useState(false);
    const [sizeCriteria, setSizeCriteria] = useState('');
    const [qualityCriteria, setQualityCriteria] = useState('');


    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(firestore, 'products');
            const data = await getDocs(productsCollection);
            const productsArray = data.docs.map(doc => doc.data());
            setProducts(productsArray);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const applyFilters = async () => {
            let filtered = [...products];

            if (searchQuery !== '') {
                filtered = filtered.filter(product =>
                    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (searchColor !== '') {
                filtered = filtered.filter(product =>
                    product.color.toLowerCase().includes(searchColor.toLowerCase())
                );
            }

            if (qualityCriteria === 'low') {
                filtered = filtered.filter(product => product.quality === 'low');
            } else if (qualityCriteria === 'med') {
                filtered = filtered.filter(product => product.quality === 'med');
            } else if (qualityCriteria === 'high') {
                filtered = filtered.filter(product => product.quality === 'high');
            }

            if (sizeCriteria === 'lt35') {
                filtered = filtered.filter(product => product.size < 35);
            } else if (sizeCriteria === 'lt45') {
                filtered = filtered.filter(product => product.size < 45);
            } else if (sizeCriteria === 'gt45') {
                filtered = filtered.filter(product => product.size > 45);
            }

            if (categoryFilter !== '') {
                filtered = filtered.filter(product => product.cat === categoryFilter);
            }

            setFilteredProducts(filtered);

            let sortedFiltered = [...filtered];

            if (sortByPriceLH) {
                sortedFiltered.sort((a, b) => a.price - b.price);
            }
            if (sortByPriceHL) {
                sortedFiltered.sort((a, b) => b.price - a.price);
            }

            if (sortByRateLH) {
                sortedFiltered.sort((a, b) => a.price - b.price);
            }
            if (sortByRateHL) {
                sortedFiltered.sort((a, b) => b.price - a.price);
            }

            setFinal(sortedFiltered);
        };

        applyFilters();
    }, [searchQuery, searchColor, categoryFilter, sortByPriceLH, sortByPriceHL, sortByRateLH, sortByRateHL, products, sizeCriteria, qualityCriteria]);

    const handleSearch = e => {
        setSearchQuery(e.target.value);
    };

    const handleColorSearch = e => {
        setSearchColor(e.target.value);
    };

    const handleSortChange = e => {
        // Implement your sorting logic here
    };
    const handleSizeChange = e => {
        setSizeCriteria(e.target.value);
    };

    const handleQualityChange = e => {
        setQualityCriteria(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="search-container mt-3">
                <form className="search-form d-flex flex-wrap" role="search" onSubmit={handleSearch}>
                    <div className="input-group mb-2">
                        <input
                            className="form-control search-input"
                            type="search"
                            required
                            defaultValue={''}
                            placeholder="Search Product"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            <i className="bi bi-search text-white"></i>
                        </button>
                    </div>
                    
                    <div className="input-group">
                        <select className='form-select sort-dropdown' onChange={handleSortChange}>
                            <option value="">Price</option>
                            <option value="lh">Price: Low to High</option>
                            <option value="hl">Price: High to Low</option>
                        </select>
                        <select className='form-select sort-dropdown' onChange={handleSortChange}>
                            <option value="">Rating</option>
                            <option value="rlh">Rating: Low to High</option>
                            <option value="rhl">Rating: High to Low</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <select value={qualityCriteria}  className='form-select sort-dropdown'  onChange={handleQualityChange}>
                                <option value="">All Qualities</option>
                                <option value="low">Low Quality</option>
                                <option value="med">Medium Quality</option>
                                <option value="high">High Quality</option>
                            </select>
                    </div>
                    <div className="input-group">
                        <input
                            className="form-control search-input"
                            type="search"
                            required
                            defaultValue={''}
                            placeholder="Search Color"
                            aria-label="Search"
                            value={searchColor}
                            onChange={e => setSearchColor(e.target.value)}
                        />
                        <select value={sizeCriteria} onChange={handleSizeChange}>
                            <option value="">All Sizes</option>
                            <option value="lt35">Size &lt; 35mm</option>
                            <option value="lt45">Size &lt; 45mm</option>
                            <option value="gt45">Size &gt; 45mm</option>
                        </select>
                    </div>
                    <div className="category-filter">
                        <label className="category-label">Category:</label>
                        <label className='me-2'>
                            <input
                                type="radio"
                                name="category"
                                value=""
                                checked={categoryFilter === ''}
                                onChange={() => setCategoryFilter('')}
                            />
                            All
                        </label>
                        <label className='me-2'>
                            <input
                                type="radio"
                                name="category"
                                value="analog"
                                checked={categoryFilter === 'analog'}
                                onChange={() => setCategoryFilter('analog')}
                            />
                            Analog
                        </label>
                        <label className='me-2'>
                            <input
                                type="radio"
                                name="category"
                                value="digital"
                                checked={categoryFilter === 'digital'}
                                onChange={() => setCategoryFilter('digital')}
                            />
                            Digital
                        </label>
                        <label className='me-2'>
                            <input
                                type="radio"
                                name="category"
                                value="fitness"
                                checked={categoryFilter === 'fitness'}
                                onChange={() => setCategoryFilter('fitness')}
                            />
                            Fitness
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="smart"
                                checked={categoryFilter === 'smart'}
                                onChange={() => setCategoryFilter('smart')}
                            />
                            Smart
                        </label>
                    </div>
                </form>

                {/* Display filtered products */}
                <div className="search-results">
                    {filteredProducts.length > 0 && (
                        <div>
                            <ul className="list-unstyled">
                                {final.map((product, index) => (
                                    <div className="card mb-4" key={index}>
                                        <div className="card-body p-4">
                                            <div className="row align-items-center">
                                                <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
                                                    <img src={product.image1} className="img-fluid rounded product-image" alt="Product Image" />
                                                </div>
                                                {/* Render other product details */}                                              <div class="col-md-3 col-lg-2">
                                                    <div>
                                                        <p class="small text-muted mb-2">Name</p>
                                                        <p class="lead fw-normal mb-0">{product.product_name}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-lg-2">
                                                    <div>
                                                        <p class="small text-muted mb-2">Color</p>
                                                        <p class="lead fw-normal mb-0">
                                                            <i class="fas fa-circle me-1"></i>{product.color}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-md-1 col-lg-1">
                                                    <div>
                                                        <p class="small text-muted mb-2">Size</p>
                                                        <p class="lead fw-normal mb-0">{product.size}mm</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-lg-1">
                                                    <div>
                                                        <p class="small text-muted mb-2">Price</p>
                                                        <p class="lead fw-normal mb-0">₹{product.price}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-lg-2">
                                                    <div>
                                                        <p class="small text-muted mb-2">Rating</p>
                                                        <div class="d-flex align-items-center">
                                                            {[...Array(5)].map((_, index) => (
                                                                <div key={index} class={`bi-star-fill ${index < product.rating ? 'text-warning' : 'text-muted'}`}></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-lg-2">
                                                    <div>
                                                        <p class="small text-muted mb-2">Description</p>
                                                        <p class="fw-normal mb-0">{product.desciption}</p>
                                                    </div>
                                                </div>                                          </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
