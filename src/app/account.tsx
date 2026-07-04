import { RIcon } from '@/components/icons'
import { Button, SectionHeading } from '@/components/ui'
import { ScrollView } from 'react-native'

export default function AccountScreen() {
  return (
    <ScrollView contentContainerClassName='gap-4 py-12 px-2'>
      <SectionHeading
        // eyebrow='Overview'
        title='02'
        description='Coordinate reservations, transport, and private rooms.'
        titleClassName='font-semibold'
        trailing={
          <Button size='sm' tone='active' leadingIcon={<RIcon color='#FFFFFF' name='chat' size={18} />}>
            New request
          </Button>
        }
      />
    </ScrollView>
  )
}
