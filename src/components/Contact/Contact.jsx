import React from 'react'
import "../Contact/Contact.css"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Contact = () => {
    return (
        <div>
            <Header />
            <div class="container h-100 contact">
                <div class="row">
                    <div class="col-md-3">
                        <div class="contact-info">
                            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
                            <h2 className='text-white'>Contact Us</h2>
                            <h4 className='text-white'>We would love to hear from you !</h4>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="contact-form">
                            <div class="form-group mt-2">
                                <label class="control-label col-sm-2" for="fname">First Name</label>
                                <div class="col-sm-10">
                                    <input type="text" required class="form-control" id="fname" placeholder="Enter First Name" name="fname" />
                                </div>
                            </div>
                            <div class="form-group mt-2">
                                <label class="control-label col-sm-2" for="lname">Last Name</label>
                                <div class="col-sm-10">
                                    <input type="text" required class="form-control" id="lname" placeholder="Enter Last Name" name="lname" />
                                </div>
                            </div>
                            <div class="form-group mt-2">
                                <label class="control-label col-sm-2" for="email">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" required class="form-control" id="email" placeholder="Enter email" name="email" />
                                </div>
                            </div>
                            <div class="form-group mt-2">
                                <label class="control-label col-sm-2" for="comment">Comment</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" required rows="3" id="comment"></textarea>
                                </div>
                            </div>
                            <div class="form-group mt-2">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="submit" class="btn">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact