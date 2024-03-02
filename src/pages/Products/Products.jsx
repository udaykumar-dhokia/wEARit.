import React from 'react'
import S_watches from '../../components/Smart Watches/S_watches'
import Analog from '../../components/Analog Watches/Analog'
import Band from '../../components/Fitness Bands/Band'
import Digital from '../../components/Digital Watches/Digital'
import { Footer, Header } from '../../components'

const Products = () => {
  return (
    <div>
        <Header/>
        {/* <Analog value={100}/>
        <Digital value={100}/>
        <Band value={100}/> */}
        <S_watches value={100}/>
        <Footer/>
    </div>
  )
}

export default Products