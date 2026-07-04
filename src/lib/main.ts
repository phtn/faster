import type { MainListing } from '@/components/main/listing-card'

import driverJaneImage from '../../assets/images/main/driver-jane.webp'
import driverJeromeImage from '../../assets/images/main/driver-jerome.webp'
import porscheImage from '../../assets/images/main/porsche-taycan.webp'

export type MainCategorySlug = 'mobile' | 'auto' | 'travel' | 'pa'

export type MainCategory = {
  description: string
  label: string
  slug: MainCategorySlug
}

export type MainCategoryService = MainListing & {
  detail: string
  id: string
  title: string
}

export const mainCategories: MainCategory[] = [
  {
    description: 'Coverage for phones and connected devices.',
    label: 'Mobile',
    slug: 'mobile'
  },
  {
    description: 'Motor cover, roadside help, and driver protection.',
    label: 'Auto',
    slug: 'auto'
  },
  {
    description: 'Trip protection, emergency assistance, and support.',
    label: 'Travel',
    slug: 'travel'
  },
  {
    description: 'Personal accident plans for everyday protection.',
    label: 'PA',
    slug: 'pa'
  }
]

export const mainCategoryServices: Record<MainCategorySlug, MainCategoryService[]> = {
  mobile: [
    {
      car: 'Device Protection',
      carImage: porscheImage,
      driver: 'Mobile Care',
      driverImage: driverJeromeImage,
      id: 'screen-cover',
      rate: '$9/mo',
      rating: 'Fast device claims',
      time: '10 mins',
      title: 'Device Protection',
      detail: 'Repairs and replacement support for accidental damage.'
    },
    {
      car: 'Device Assist',
      carImage: porscheImage,
      driver: 'Support Desk',
      driverImage: driverJaneImage,
      id: 'device-assist',
      rate: '$6/mo',
      rating: 'Priority triage',
      time: '8 mins',
      title: 'Device assist',
      detail: 'Fast claim triage for phones, tablets, and wearables.'
    }
  ],
  auto: [
    {
      car: 'Roadside Support',
      carImage: porscheImage,
      driver: 'Auto Crew',
      driverImage: driverJeromeImage,
      id: 'roadside',
      rate: '$15/mo',
      rating: '24/7 assistance',
      time: '25 mins',
      title: 'Roadside support',
      detail: 'Help for breakdowns, towing, battery, and lockout incidents.'
    },
    {
      car: 'Driver Cover',
      carImage: porscheImage,
      driver: 'Claims Team',
      driverImage: driverJaneImage,
      id: 'driver-cover',
      rate: '$18/mo',
      rating: 'Driver protection',
      time: '18 mins',
      title: 'Driver cover',
      detail: 'Protection options for drivers and booked rides.'
    }
  ],
  travel: [
    {
      car: 'Trip Delay',
      carImage: porscheImage,
      driver: 'Travel Desk',
      driverImage: driverJeromeImage,
      id: 'trip-delay',
      rate: '$12/trip',
      rating: 'Delay support',
      time: '12 mins',
      title: 'Trip delay',
      detail: 'Support when travel plans change unexpectedly.'
    },
    {
      car: 'Emergency Assist',
      carImage: porscheImage,
      driver: 'Global Care',
      driverImage: driverJaneImage,
      id: 'medical-assist',
      rate: '$22/trip',
      rating: 'Urgent guidance',
      time: '15 mins',
      title: 'Emergency assist',
      detail: 'Guidance for urgent travel and medical events.'
    }
  ],
  pa: [
    {
      car: 'Daily Protection',
      carImage: porscheImage,
      driver: 'PA Advisor',
      driverImage: driverJeromeImage,
      id: 'daily-cover',
      rate: '$5/mo',
      rating: 'Everyday cover',
      time: '5 mins',
      title: 'Daily protection',
      detail: 'Personal accident cover for routine activities.'
    },
    {
      car: 'Family Add-ons',
      carImage: porscheImage,
      driver: 'Family Desk',
      driverImage: driverJaneImage,
      id: 'family-cover',
      rate: '$11/mo',
      rating: 'Family options',
      time: '9 mins',
      title: 'Family add-ons',
      detail: 'Extend protection to eligible family members.'
    }
  ]
}

export function getMainCategory(slug: string | undefined) {
  return mainCategories.find((category) => category.slug === slug)
}
