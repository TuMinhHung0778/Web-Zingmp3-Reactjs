import React from 'react'
import {Oval} from 'react-loader-spinner'
const Loading = () => {
  return (
    <Oval
  height={80}
  width={80}
  color="#905be5"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#231b2e"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
  )
}

export default Loading