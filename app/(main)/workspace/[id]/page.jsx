import Chatview from '@/components/custom/Chatview'
import Codeview from '@/components/custom/Codeview'

import React from 'react'

const Workspace = () => {
  return (
    <div className='p-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <Chatview/>
        <div className='col-span-2'>
            <Codeview/>
        </div>
      </div>
    </div>
  )
}

export default Workspace
