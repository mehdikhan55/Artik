import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <section className='header'>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </section>
  );
};

export default Header;
