import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { ArrowPathIcon, ChartPieIcon, ChevronDownIcon, CursorArrowRaysIcon, FingerPrintIcon, PhoneIcon, PlayCircleIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Profile = () => {
    const products = [
        { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
        { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
        { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
        { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
        { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    ]
    const callsToAction = [
        { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
        { name: 'Contact sales', href: '#', icon: PhoneIcon },
    ]
    return (
        <PopoverGroup className="relative flex flex-col top-10 right-0 bg-white w-1/2">


            <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Features
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Marketplace
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Company
            </a>
        </PopoverGroup>
    )
}

export default Profile