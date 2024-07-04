import { faBoxesPacking, faChartColumn, faCode } from '@fortawesome/free-solid-svg-icons';

const adminSideNavigationLinkData = (params: any) => [
  {
    linkKey: '/admin/dashboard',
    textKey: 'Dashboard',
    icon: faChartColumn,
    isActive: params === 'dashboard',
  },
  {
    linkKey: '/admin/products',
    textKey: 'Products',
    icon: faBoxesPacking,
    isActive: params === 'products',
  },
  {
    linkKey: '/admin/code',
    textKey: 'Code',
    icon: faCode,
    isActive: params === 'code',
  },
];

export default adminSideNavigationLinkData;
