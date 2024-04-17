import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { SidebarItem } from './sidebar-item';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

type Props = {
    className?: string;
}

const Sidebar = ({className} : Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-4 flex-col",
            className
        )}>
            <Link href='/learn'>
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/OIG1.png" height={40} width={40} alt="Logo" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label='Learn' href='/learn' iconSrc='/vercel.svg'/>
                <SidebarItem label='Leaderboard' href='/leaderboard' iconSrc='/vercel.svg'/>
                <SidebarItem label='quests' href='/quest' iconSrc='/vercel.svg'/>
                <SidebarItem label='shop' href='/shop' iconSrc='/vercel.svg'/>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl='/'/>
                </ClerkLoaded>
            </div>
        </div>
    )
}

export default Sidebar