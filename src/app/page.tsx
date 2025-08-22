'use client'

import { useState, useEffect } from 'react'
import { FileText, Book, Users, Building, Star, Download, ArrowRight, Menu, X } from 'lucide-react'

const announcements = [
  {
    title: "Poster-testing", 
    date: "22 Aug 2025",
    driveShare: "https://drive.google.com/file/d/1PT6Pm8bVXpHwVeCKJ5ltbUXkGwA3j6Kf/view?usp=sharing",
    type: "poster"
  },
  {
    title: "Circulars",
    date: "21 Aug 2025",
    driveShare: "https://drive.google.com/file/d/1AbcDEF234567890fakeId1/view?usp=sharing",
    type: "circulars"
  },
  {
    title: "Bootkit",
    date: "20 Aug 2025", 
    driveShare: "https://drive.google.com/file/d/1XyzGHI234567890fakeId2/view?usp=sharing",
    type: "bootkit"
  },
  {
    title: "Counselor Details",
    date: "19 Aug 2025",
    driveShare: "https://drive.google.com/open?id=1QwePQR234567890fakeId3",
    type: "counselors"
  },
  {
    title: "Venues",
    date: "18 Aug 2025",
    driveShare: "https://drive.google.com/file/d/1MnoSTU234567890fakeId4/view?usp=sharing",
    type: "venues"
  },
  {
    title: "Club Showcasing", 
    date: "17 Aug 2025",
    driveShare: "https://drive.google.com/uc?id=1VwxYZA234567890fakeId5&export=download",
    type: "clubs"
  }
];

const iconMap: { [key: string]: React.ReactNode } = {
  poster: <FileText className="w-8 h-8 text-primary" />,
  circulars: <FileText className="w-8 h-8 text-primary" />,
  bootkit: <Book className="w-8 h-8 text-primary" />,
  counselors: <Users className="w-8 h-8 text-primary" />,
  venues: <Building className="w-8 h-8 text-primary" />,
  clubs: <Star className="w-8 h-8 text-primary" />,
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-lg sticky top-0 z-30 border-b border-gray-200/80">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Star className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">SIP Announcements</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <a href="#" className="hover:text-primary transition-colors">Home</a>
          <a href="#announcements" className="hover:text-primary transition-colors">Announcements</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col items-center gap-4 text-gray-600 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Home</a>
            <a href="#announcements" className="hover:text-primary transition-colors">Announcements</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}

const HeroSection = () => (
  <section className="py-24 sm:py-40 text-center bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl sm:text-7xl font-black text-gray-900 leading-tight tracking-tighter">
        <span className="text-primary">SIP</span> Announcements
      </h2>
      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
        Your central hub for all official announcements and updates for the Student Induction Programme 2025. Never miss an important update again.
      </p>
      <div className="mt-10">
        <a href="#announcements" className="bg-primary text-white font-bold py-4 px-8 rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40">
          View Announcements
        </a>
      </div>
    </div>
  </section>
)

const AnnouncementCard = ({ announcement }: { announcement: typeof announcements[0] }) => (
  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden group">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
          {iconMap[announcement.type] || <FileText className="w-6 h-6 text-primary" />}
        </div>
        <div>
          <p className="text-sm text-gray-500 group-hover:text-primary transition-colors">{announcement.date}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 flex-grow">{announcement.title}</h3>
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
        <a
          href={announcement.driveShare}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </a>
        <a
          href={announcement.driveShare}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
        >
          View Online
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  </div>
)

const Announcements = () => (
  <section id="announcements" className="py-20 sm:py-32 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Latest Announcements</h2>
        <p className="text-lg text-gray-600 mt-2">Stay up-to-date with the latest news and updates.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.title} announcement={announcement} />
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2025 Student Induction Programme. All Rights Reserved.</p>
      <p className="mt-2 text-gray-400">Designed & Developed with ❤️</p>
    </div>
  </footer>
)

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <HeroSection />
      <Announcements />
      <Footer />
    </div>
  )
}
