import { lazy } from 'react'
// ** Document title
const TemplateTitle = ''

// ** Default Route
const DefaultRoute = '/home'
// ** Merge Routes
const Routes = [
  {
    path: '/signin',
    component: lazy(() => import('../../views/SignIn/index')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/ForgotPassword')),
    meta: {
      authRoute: true
    } 
  },
  {
    path: '/signup/registration',
    component: lazy(() => import('../../views/Registration')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/signup/registrationform',
    component: lazy(() => import('../../views/RegistrationForm')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/choosetype',
    component: lazy(() => import('../../views/ChooseTypeStart')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/choosemovies',
    component: lazy(() => import('../../views/OnboardingMovies')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/movies/:idGenre',
    component: lazy(() => import('../../views/MoviesPage')),
    exact: true,
  },
  {
    path: '/playlist',
    component: lazy(() => import('../../views/MyPlaylistPage')),
    exact: true,
  },
  {
    path: '/popular',
    component: lazy(() => import('../../views/PopularPage')),
    exact: true,
  },
  {
    path: '/home',
    component: lazy(() => import('../../views/Homepage')),
    exact: true,
  },
  {
    path: '/detail/:idMovie',
    component: lazy(() => import('../../views/DetailPage')),
    exact: true,
  },
  {
    path: '/search',
    component: lazy(() => import('../../views/SearchPage')),
    exact: true,
  },
  {
    path: '/watch/:idMovie',
    component: lazy(() => import('../../views/VideoPlayer')),
    exact: true,
  },
  {
    path: '/watchgroup/:idgroup',
    component: lazy(() => import('../../views/GroupStreaming')),
    exact: true,
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/AccountProfile')),
    
  },
  {
    path: '/contactus',
    component: lazy(() => import('../../views/FooterPage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },  
  {
    path: '/termsofuse',
    component: lazy(() => import('../../views/FooterPage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },  
  {
    path: '/privacy',
    component: lazy(() => import('../../views/FooterPage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },  
  {
    path: '/cookieprefer',
    component: lazy(() => import('../../views/FooterPage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },  
  {
    path: '/corpinfo',
    component: lazy(() => import('../../views/FooterPage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },
  {
    path: '/maintenance',
    component: lazy(() => import('../../views/MaintenancePage')),
    exact: true,
    meta: {
      authRoute: false
    }
  },
]
export { DefaultRoute, TemplateTitle, Routes }
