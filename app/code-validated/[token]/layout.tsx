'use client'

import PublicHeader from '@/app/components/PublicHeader';
import React, { Fragment, ReactNode } from 'react';

const ItemsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <PublicHeader />
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
    </Fragment>
  );
};

export default ItemsLayout;