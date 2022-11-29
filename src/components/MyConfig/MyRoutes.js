import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import Blog from '../Blogs/Blog'
import Category from '../categories/Category'
import Product from '../products/Product'
const MyRoutes = (props) => {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/categories' element={<Category/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/blogs' element={<Blog/>} />
      <Route path='/*' element={<div> (404) Not found</div>} />
     </Routes>
    </>
  )
}

export default MyRoutes