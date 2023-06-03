import Image from 'next/image'
import NavBar from './components/Nav'
import Intro from './components/Intro'

export default function Home() {
  return (
    <div className='container mx-auto px-6 py-16 text-center'>
      <Intro />
    </div>
  )
}
