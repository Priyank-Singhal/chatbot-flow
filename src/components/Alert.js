import React from 'react'

const Alert = ({text}) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative left-0" role="alert">
            <strong className="font-bold">{text}</strong>
        </div>
    )
}

export default Alert