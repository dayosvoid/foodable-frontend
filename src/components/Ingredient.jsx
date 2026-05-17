import React, { forwardRef } from 'react'

const Ingredient = forwardRef((props, ref) => {
  return (
    <div ref={ref} className='theme-bg-card h-80 flex items-center'>
      <div className='container w-11/12 mx-auto py-10'>
        <h2 className='text-center text-3xl font-semibold theme-text-standout'>Monthly Ingredient</h2>
        <p className='text-center font-semibold'>PURCHASE LIST</p>

        <div className='w-full py-5'>
          <h3 className='text-5xl font-bold text-center'>Coming Soon!!!</h3>
        </div>
      </div>
    </div>
  )
})

export default Ingredient