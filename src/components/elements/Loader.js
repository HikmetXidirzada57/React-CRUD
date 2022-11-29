import React from 'react'
import { Spin } from 'antd'
const Loader = () => {
  return (
    <div className='spinner'>
        <Spin delay={3} size="large"/>
    </div>
  )
}

export default Loader