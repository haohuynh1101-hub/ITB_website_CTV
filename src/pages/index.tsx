import Link from 'next/link';

import { menusHome } from '@/constants/menus-home';
export default function Home() {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{ background: '#fafafa' }}
    >
      {menusHome.map((menu, index) => (
        <Link key={index} href={menu.href}>
          <a className="flex flex-col items-center justify-center w-40 h-40 text-xl font-medium shadow-md cursor-pointer transition-all hover:bg-primary-100 space-y-4 bg-primary-50 rounded-md">
            {menu.icon}
            <span>{menu.name}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}
