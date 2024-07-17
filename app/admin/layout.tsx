'use client'

import React, { ReactNode, useState } from 'react';
import AdminSideNavigation from '../redux/features/dashboard/components/AdminSideNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AdminMobileNavigation from '../redux/features/dashboard/components/AdminMobileNavigation';
import PrivateRoute from '../components/common/PrivateRoute';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const close = () => setToggleMobileMenu(false);
  return (
    <PrivateRoute>
      <div className="flex min-h-screen">
        <FontAwesomeIcon onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
          icon={faBars}
          className="block lg:hidden fa-solid text-lime-500 col-span-2 py-2 pl-2 pr-3 w-fit duration-200 hover:text-lime-400 absolute top-2 right-2 cursor-pointer z-20"
        />
        <AdminMobileNavigation
          toggleMobileMenu={toggleMobileMenu}
          close={close}
        />
        <aside className="hidden lg:block lg:w-[240px] bg-zinc-900">
          <AdminSideNavigation />
        </aside>
        <main className="max-w-screen-xl w-full mx-auto">{children}</main>
      </div>
    </PrivateRoute>
  );
};

export default AdminLayout;
