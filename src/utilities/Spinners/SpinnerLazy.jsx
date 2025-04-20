import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';


const SpinnerLazy = () => {
  return (
    <div>
        <div className="flex align-items-center justify-content-center h-screen">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
        </div>
    </div>
  )
}

export default SpinnerLazy