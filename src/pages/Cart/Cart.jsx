import React, { useEffect, useState } from 'react'
import "../Cart/Cart.css"
import { Footer, Header } from '../../components'

const Cart = () => {
    // const carts = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const handleQuantityChange = (index, event) => {
        const newCart = [...cart];
        newCart[index].quantity = parseInt(event.target.value);
        localStorage.setItem('cart', JSON.stringify(newCart));
        updateTotal(newCart);
    };

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = savedCart.map(item => {
            return { ...item, quantity: item.quantity || 1 };
        });
        setCart(updatedCart);
        updateTotal(updatedCart);
    }, []);

    const updateTotal = (cart) => {
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(totalPrice);
    };
    return (
        <div>
            <Header />
            <section className="mt-5 cart">
    <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <p>
                    <span className="h2">Your Cart </span>
                    <span className="h4">({cart.length} item{cart.length !== 1 ? 's' : ''} in your cart)</span>
                </p>

                {cart.map((item, index) => (
                    <div className="card mb-4" key={index}>
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                                <div className="col-md-2">
                                    <img src={item.image1} className="img-fluid" alt="Generic placeholder image" style={{ height: "100px", objectFit: "cover", borderRadius: "20px" }} />
                                </div>
                                <div className="col-md-2 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Name</p>
                                        <p className="lead fw-normal mb-0">{item.product_name}</p>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Color</p>
                                        <p className="lead fw-normal mb-0">
                                            <i className="fas fa-circle me-2"></i>{item.color}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-1 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Quantity</p>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e)}
                                            min="1"
                                            max={item.available_quantity} // Added max attribute
                                        />
                                        {item.quantity > item.available_quantity && (
                                            <p className="text-danger">Exceeds stock!</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-1 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Stock</p>
                                        <p className="lead fw-normal mb-0">{item.available_quantity}</p>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Price</p>
                                        <p className="lead fw-normal mb-0">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-center">
                                    <div>
                                        <p className="small text-muted mb-4 pb-2">Total</p>
                                        <p className="lead fw-normal mb-0">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="card mb-5">
                    <div className="card-body p-4">
                        <div className="float-end">
                            <p className="mb-0 me-5 d-flex align-items-center">
                                <span className="small text-muted me-2">Order total:</span>
                                <span className="lead fw-normal">₹{total}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary btn-lg">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</section>

            
            {/* <Footer /> */}
        </div>
    )
}

export default Cart