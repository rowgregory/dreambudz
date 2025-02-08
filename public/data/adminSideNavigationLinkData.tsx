const adminSideNavigationLinkData = (path: any) => [
  {
    linkKey: '/admin/dashboard',
    textKey: 'Dashboard',
    isActive: path === '/admin/dashboard'
  },
  {
    linkKey: '/admin/products',
    textKey: 'Products',

    isActive: path === '/admin/products'
  },
  {
    linkKey: '/admin/code',
    textKey: 'Code',

    isActive: path === '/admin/code'
  },
  {
    linkKey: '/admin/visitors',
    textKey: 'Visitors',

    isActive: path === '/admin/visitors'
  },
  {
    linkKey: '/admin/profile',
    textKey: 'Profile',

    isActive: path === '/admin/profile'
  }
]

export default adminSideNavigationLinkData
