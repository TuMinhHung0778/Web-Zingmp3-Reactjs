import React from 'react'
import { Audio } from  'react-loader-spinner'
import { memo } from 'react'

const AudioLoading = () => {
  return (
    <Audio
  height="60"
  width="60"
  color="white"
  ariaLabel="audio-loading"
  wrapperStyle={{display: 'block',border : '1px solid #ffffff',borderRadius : '50%',overflow : 'hidden'}}
  wrapperClass="wrapper-class"
  visible={true}
/>
  )
}

export default memo(AudioLoading)