import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '',
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Empleados',
    url: '/empleados',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Grupos',
    url: '/grupos',
    iconComponent: { name: 'cil-user' }
  }
];
