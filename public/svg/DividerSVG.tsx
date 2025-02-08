'use client'

import React from 'react'

const DividerSVG = ({ fill }: { fill?: string }) => {
  return (
    <div className="bg-transparent absolute  left-0 right-0 rotate-180" style={{ bottom: 0 }}>
      <svg
        style={{ transform: 'rotateX(180deg)' }}
        className="w-full h-[100px]"
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill || '#1b1b1c'} d="m0 6v-6h1000v100z"></path>
      </svg>
    </div>
  )
}

export default DividerSVG
