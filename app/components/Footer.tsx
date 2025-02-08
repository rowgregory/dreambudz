'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="bg-onyx pt-20 px-4 pb-14 w-full">
        <div className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl grid grid-cols-12">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <h1 className="font-bold text-white text-4xl mb-5">DB.</h1>
            <h2 className="text-ash leading-relaxed">
              Where quality meets care, enjoy a range of premium wellness options, available in formats like capsules, lozenges, tinctures,
              and dermal patches—designed to suit your personal needs.
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-charcoal text-white py-5 px-4">
        <h3 className="text-sm mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl">
          Copyright &copy; {new Date().getFullYear()}
        </h3>
      </div>
    </footer>
  )
}

export default Footer
