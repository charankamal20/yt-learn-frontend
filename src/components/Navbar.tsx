import { GraduationCap, MountainIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <header className="fixed z-20 top-0 left-0 backdrop-blur-lg bg-background/10 px-4 lg:px-6 w-full h-14 flex items-center">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <GraduationCap />
        <span className="sr-only">Acme Online Courses</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/course"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Courses
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar