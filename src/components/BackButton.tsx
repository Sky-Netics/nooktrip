"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
    const router = useRouter();
  return (
    <Button variant="link" className='text-primary-foreground px-0 mb-4' onClick={()=>router.back()}>
        <ChevronLeft className='w-4 h-4' />
        <span className='text-sm'>Back</span>
    </Button>
  )
}
