import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
const MyRoutes = (props) => {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/*' element={<div> (404) Not found</div>} />
     </Routes>
    </>
  )
}

export default MyRoutes