import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Save } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WorkspaceHeader({fileName}) {
  return (
    <div className='p-4 flex justify-between shadow-md'>
      <Link href={'/dashboard'}>
        <Image src={'/logo.svg'} alt='logo' width={140} height={100} />
        </Link>
        <h2>{fileName}</h2>
        {/* <div>
          <Button>
            Save
            <Save/>
          </Button>
        </div> */}
        <UserButton/>

    </div>
  )
}

export default WorkspaceHeader