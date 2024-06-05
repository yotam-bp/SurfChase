"use client"
import { headerLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItemsProps {
  onClose: () => void;
}

const NavItems: React.FC<NavItemsProps> = ({ onClose }) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? 'text-primary-500' : ''
            } flex-center p-medium-16 whitespace-nowrap cursor-pointer`}
            onClick={onClose}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
