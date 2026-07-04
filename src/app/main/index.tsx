import { MainListingCard, type MainListing } from '@/components/main/listing-card'
import { ScrollView, View } from 'react-native'
import driverJaneImage from '../../../assets/images/main/driver-jane.webp'
import driverJeromeImage from '../../../assets/images/main/driver-jerome.webp'
import porscheImage from '../../../assets/images/main/porsche-taycan.webp'

const listings: MainListing[] = [
  {
    car: 'Porsche Taycan',
    carImage: porscheImage,
    driver: 'Jerome Bell',
    driverImage: driverJeromeImage,
    rating: '95% Smooth Ride',
    rate: '$25/h',
    time: '25 mins'
  },
  {
    car: 'Tesla Model 3',
    carImage: porscheImage,
    driver: 'Jane Cooper',
    driverImage: driverJaneImage,
    rating: '87% Smooth Ride',
    rate: '$23/h',
    time: '18 mins'
  }
]

export default function MainIndex() {
  return (
    <ScrollView>
      <View className='gap-4 px-0'>
        {listings.map((listing, index) => (
          <MainListingCard compact={index === 1} key={listing.driver} listing={listing} />
        ))}
      </View>
    </ScrollView>
  )
}
