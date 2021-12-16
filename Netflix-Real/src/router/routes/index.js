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
    
  },
  {
    path: '/signup/registration',
    component: lazy(() => import('../../views/Registration'))
  },
  {
    path: '/signup/registrationform',
    component: lazy(() => import('../../views/RegistrationForm'))
  },
  {
    path: '/choosetype',
    component: lazy(() => import('../../views/ChooseTypeStart'))
  },
  {
    path: '/choosemovies',
    component: lazy(() => import('../../views/OnboardingMovies')),
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
    path: '/watch',
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
    exact: true,
  },
 
]

export { DefaultRoute, TemplateTitle, Routes }