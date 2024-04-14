import React from 'react'

const Header = () => {
  return (
    <div className='h-16 bg-gray-200 flex flex-row-reverse flex-wrap items-center'>
      <button
        className='py-2 px-7 h-auto rounded-md border-2 border-sky-500 bg-white mr-48 font-bold text-sky-600 shadow-lg'
      >
        Save Changes
      </button>
    </div>
  )
}

export default Header 