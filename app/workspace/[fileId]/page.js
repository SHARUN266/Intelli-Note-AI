"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import PdfViewer from '../_components/PdfViewer';

function Workspace() {
    const {fileId}=useParams();
    const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
        fileId:fileId
    });
    useEffect(()=>{
      console.log(fileInfo)
    },[fileInfo])

  return (
    <div>
        <WorkspaceHeader  />
        <div className='grid grid-cols-1  md:grid-cols-2 gap-5'>
            <div>
                {/* Text Editor  */}
            </div>
            <div>
                {/* PDF Viewer */}
                <PdfViewer  fileUrl={fileInfo?.fileUrl}  />
            </div>
        </div>
    </div>
  )
}

export default Workspace