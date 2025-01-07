"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'

function Workspace() {
    const {fileId}=useParams();
const GetFileInfo=()=>{

    }
  return (
    <div>
        <WorkspaceHeader/>
        <div className='flex justify-between items-center'>
            <div>
                {/* Text Editor  */}
            </div>
            <div>
                {/* PDF Viewer */}

            </div>
        </div>
    </div>
  )
}

export default Workspace