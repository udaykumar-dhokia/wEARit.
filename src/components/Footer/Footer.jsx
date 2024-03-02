import React from 'react'
import "../Footer/Footer.css"

const Footer = () => {
    return (
        <div>
            <footer class="footer text-center text-lg-start">
                <section class="py-3">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="fw-bold mb-4">
                                    wEARit.
                                </h6>
                                <p style={{textAlign:"justify"}}>
                                    Discover our curated collection of watches – each one a masterpiece of style and precision. From timeless classics to modern marvels, find the perfect statement piece for any occasion.
                                </p>
                            </div>

                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p>
                                    <a href="/products" class="text-reset">Smart</a>
                                </p>
                                <p>
                                    <a href="/products" class="text-reset">Fitness</a>
                                </p>
                                <p>
                                    <a href="/products" class="text-reset">Analog</a>
                                </p>
                                <p>
                                    <a href="/products" class="text-reset">Digital</a>
                                </p>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Stores</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">About</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Help</a>
                                </p>
                            </div>

                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i class="bi bi-geo-alt-fill"></i>wEARit. LTD, 204-210 , Third eye vision, Opp. Shivalik Plaza, Ambawadi., near AMA, Ahmedabad, Gujarat, India, Gujarat 380006, India</p>
                                <p>
                                <i class="bi bi-envelope-fill"></i> info@example.com
                                </p>
                                <p><i class="bi bi-telephone-fill"></i> +91 9537527143</p>
                                <p><i class="bi bi-telephone-fill"></i> +91 9574326060</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="text-center p-4" >
                    © 2024 Copyright: 
                    <a class="text-reset fw-bold" href=""> wEARit.netlify.app</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer