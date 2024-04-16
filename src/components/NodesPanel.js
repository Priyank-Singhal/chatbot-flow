import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSelectedNode, updateSelectedNodeText } from '../utils/appSlice';

const NodesPanel = () => {
    const dispatch = useDispatch();
    const handleInputChange = ((e) => {
        dispatch(updateSelectedNodeText(e.target.value));
    })
    return (
        <div>
            <div className="flex justify-between w-7/12 p-2">
                <span className='cursor-pointer' onClick={() => dispatch(updateSelectedNode(undefined))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </span>
                <h1>Message</h1>
            </div>
            <div className='h-60 border-gray-300 border-y-2 p-5'>
                <p className='py-3'>Text</p>
                <textarea
                    className='w-full h-32 p-2 border-2 border-gray'
                    onChange={handleInputChange}
                    placeholder='type here...'
                />
            </div>
        </div>
    )
}

export default NodesPanel