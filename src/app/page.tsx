'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Book, Users, Building, Star, Download, ArrowRight, Menu, X } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import DisclaimerModal from '@/components/DisclaimerModal';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/80">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/RVCE Corner Logo BLACK-2 line.png"
            alt="RVCE Corner Logo"
            width={180}
            height={50}
            priority
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <Link href="#" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#announcements" className="hover:text-primary transition-colors">Announcements</Link>
        </nav>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-700 hover:text-primary transition-colors p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden mt-4 animate-fade-in">
          <nav className="flex flex-col items-center gap-4 text-gray-600 font-medium py-4">
            <Link href="#" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#announcements" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Announcements</Link>
          </nav>
        </div>
      )}
    </header>
  );
};



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
        <h2 className="text-4xl font-bold text-gray-900">Student Induction Programme 2025</h2>
        <p className="text-lg text-gray-600 mt-2">Stay up-to-date with the latest updates.</p>
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
      <p>&copy; 2025 RVCE, Bengaluru. All Rights Reserved.</p>
      <p className="mt-2 text-gray-400">Student Induction Programme (SIP) Announcements</p>
    </div>
  </footer>
)

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const disclaimerShown = sessionStorage.getItem('disclaimerShown');
    if (!disclaimerShown) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDisclaimerClose = () => {
    sessionStorage.setItem('disclaimerShown', 'true');
    setShowDisclaimer(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {showDisclaimer && <DisclaimerModal onClose={handleDisclaimerClose} />}
      <Header />
      <HeroSection />
      <Announcements />
      <Footer />
    </div>
  )
}
