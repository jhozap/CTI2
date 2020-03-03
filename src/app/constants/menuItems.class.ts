import { MenuItem } from '../models/interfaces.class';

export const REAL_MENU_ITEMS: MenuItem[] = [   
    {
        title: 'Página principal',
        heigth: 24,
        icon: 'home',
        width: 24,
        link: 'home',
        perfilDenied: 0
    },
    {
        title: 'GRIFT',
        heigth: 24,
        icon: 'playlist_add_check',
        width: 24,
        link: 'investigacion-institucional',
        perfilDenied: 0,
        submenu: [
            {
                link: '/investigacion-institucional',
                title: 'Investigación Institucional'
            },
            {
                link: '/investigacion-implementada',
                title: 'Investigación Implementada'
            },
            {
                link: '/caso-emblematico',
                title: 'Caso emblemático'
            },
            {
                link: '/semilleros-investigacion',
                title: 'Semilleros de investigación'
            },
            {
                link: '/redes-investigacion',
                title: 'Redes de investigación'
            },            
            {
                link: '/grafica-productos',
                title: 'Grafica Producto Investigacion'
            },
            {
                link: '/grafica-investigaciones',
                title: 'Grafica Investigaciones Institucionales'
            },
        ]
    },
    {
        title: 'GREIT',
        heigth: 24,
        icon: 'fingerprint',
        width: 24,
        link: 'propiedad-intelectual',
        perfilDenied: 0,
        submenu: [
            {
                link: 'propiedad-intelectual',
                title: 'Propiedad intelectual'
            },
            {
                link: 'greit-investigcion-institucional',
                title: 'Investigación institucional'
            },
            {
                link: 'greit-investigacion-implementada',
                title: 'Investigación implementada'
            }
        ]
    },
    {
        title: 'GRIND',
        heigth: 24,
        icon: 'local_library',
        width: 24,
        link: 'rlct',
        perfilDenied: 0,
        submenu: [
            {
                title: 'Revistas, logos, ciencia y tecnología',
                link: 'rlct'
            },
            {
                title: 'Investigaciones Policia',
                link: 'https://policia.edu.co/investigacion/',
                external: true
            },
            {
                title: 'Libros resultado de investigación',
                link: 'lri'
            }
        ]
    },
    {
        title: 'Administración',
        heigth: 24,
        icon: 'settings_applications',
        width: 24,
        link: '/administracion',
        perfilDenied: 2
    }
];
