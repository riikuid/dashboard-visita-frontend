/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated/route'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as authSignInImport } from './routes/(auth)/sign-in'

// Create Virtual Routes

const errors404LazyImport = createFileRoute('/(errors)/404')()
const authSignUpLazyImport = createFileRoute('/(auth)/sign-up')()
const authForgotPasswordLazyImport = createFileRoute(
  '/(auth)/forgot-password',
)()
const AuthenticatedSettingsRouteLazyImport = createFileRoute(
  '/_authenticated/settings',
)()
const AuthenticatedTasksIndexLazyImport = createFileRoute(
  '/_authenticated/tasks/',
)()
const AuthenticatedSettingsIndexLazyImport = createFileRoute(
  '/_authenticated/settings/',
)()
const AuthenticatedHelpCenterIndexLazyImport = createFileRoute(
  '/_authenticated/help-center/',
)()
const AuthenticatedDepartmentsIndexLazyImport = createFileRoute(
  '/_authenticated/departments/',
)()
const AuthenticatedAppsIndexLazyImport = createFileRoute(
  '/_authenticated/apps/',
)()
const AuthenticatedAccessControlsIndexLazyImport = createFileRoute(
  '/_authenticated/access-controls/',
)()
const AuthenticatedSettingsAccountLazyImport = createFileRoute(
  '/_authenticated/settings/account',
)()
const AuthenticatedVisitorManagementVisitorsIndexLazyImport = createFileRoute(
  '/_authenticated/visitor-management/visitors/',
)()
const AuthenticatedVisitorManagementCompaniesIndexLazyImport = createFileRoute(
  '/_authenticated/visitor-management/companies/',
)()
const AuthenticatedVisitorManagementVisitorsVisitorIdLazyImport =
  createFileRoute('/_authenticated/visitor-management/visitors/$visitorId')()

// Create/Update Routes

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const errors404LazyRoute = errors404LazyImport
  .update({
    id: '/(errors)/404',
    path: '/404',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/404.lazy').then((d) => d.Route))

const authSignUpLazyRoute = authSignUpLazyImport
  .update({
    id: '/(auth)/sign-up',
    path: '/sign-up',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/sign-up.lazy').then((d) => d.Route))

const authForgotPasswordLazyRoute = authForgotPasswordLazyImport
  .update({
    id: '/(auth)/forgot-password',
    path: '/forgot-password',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() =>
    import('./routes/(auth)/forgot-password.lazy').then((d) => d.Route),
  )

const AuthenticatedSettingsRouteLazyRoute =
  AuthenticatedSettingsRouteLazyImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/route.lazy').then((d) => d.Route),
  )

const authSignInRoute = authSignInImport.update({
  id: '/(auth)/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedTasksIndexLazyRoute =
  AuthenticatedTasksIndexLazyImport.update({
    id: '/tasks/',
    path: '/tasks/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/tasks/index.lazy').then((d) => d.Route),
  )

const AuthenticatedSettingsIndexLazyRoute =
  AuthenticatedSettingsIndexLazyImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/index.lazy').then((d) => d.Route),
  )

const AuthenticatedHelpCenterIndexLazyRoute =
  AuthenticatedHelpCenterIndexLazyImport.update({
    id: '/help-center/',
    path: '/help-center/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/help-center/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedDepartmentsIndexLazyRoute =
  AuthenticatedDepartmentsIndexLazyImport.update({
    id: '/departments/',
    path: '/departments/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/departments/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedAppsIndexLazyRoute = AuthenticatedAppsIndexLazyImport.update(
  {
    id: '/apps/',
    path: '/apps/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/apps/index.lazy').then((d) => d.Route),
)

const AuthenticatedAccessControlsIndexLazyRoute =
  AuthenticatedAccessControlsIndexLazyImport.update({
    id: '/access-controls/',
    path: '/access-controls/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/access-controls/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedSettingsAccountLazyRoute =
  AuthenticatedSettingsAccountLazyImport.update({
    id: '/account',
    path: '/account',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/account.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedVisitorManagementVisitorsIndexLazyRoute =
  AuthenticatedVisitorManagementVisitorsIndexLazyImport.update({
    id: '/visitor-management/visitors/',
    path: '/visitor-management/visitors/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import(
      './routes/_authenticated/visitor-management/visitors/index.lazy'
    ).then((d) => d.Route),
  )

const AuthenticatedVisitorManagementCompaniesIndexLazyRoute =
  AuthenticatedVisitorManagementCompaniesIndexLazyImport.update({
    id: '/visitor-management/companies/',
    path: '/visitor-management/companies/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import(
      './routes/_authenticated/visitor-management/companies/index.lazy'
    ).then((d) => d.Route),
  )

const AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute =
  AuthenticatedVisitorManagementVisitorsVisitorIdLazyImport.update({
    id: '/visitor-management/visitors/$visitorId',
    path: '/visitor-management/visitors/$visitorId',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import(
      './routes/_authenticated/visitor-management/visitors/$visitorId.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/sign-in': {
      id: '/(auth)/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof authSignInImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/settings': {
      id: '/_authenticated/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsRouteLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/(auth)/forgot-password': {
      id: '/(auth)/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof authForgotPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/sign-up': {
      id: '/(auth)/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof authSignUpLazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/404': {
      id: '/(errors)/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof errors404LazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/settings/account': {
      id: '/_authenticated/settings/account'
      path: '/account'
      fullPath: '/settings/account'
      preLoaderRoute: typeof AuthenticatedSettingsAccountLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/access-controls/': {
      id: '/_authenticated/access-controls/'
      path: '/access-controls'
      fullPath: '/access-controls'
      preLoaderRoute: typeof AuthenticatedAccessControlsIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/apps/': {
      id: '/_authenticated/apps/'
      path: '/apps'
      fullPath: '/apps'
      preLoaderRoute: typeof AuthenticatedAppsIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/departments/': {
      id: '/_authenticated/departments/'
      path: '/departments'
      fullPath: '/departments'
      preLoaderRoute: typeof AuthenticatedDepartmentsIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/help-center/': {
      id: '/_authenticated/help-center/'
      path: '/help-center'
      fullPath: '/help-center'
      preLoaderRoute: typeof AuthenticatedHelpCenterIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/settings/': {
      id: '/_authenticated/settings/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof AuthenticatedSettingsIndexLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/tasks/': {
      id: '/_authenticated/tasks/'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof AuthenticatedTasksIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/visitor-management/visitors/$visitorId': {
      id: '/_authenticated/visitor-management/visitors/$visitorId'
      path: '/visitor-management/visitors/$visitorId'
      fullPath: '/visitor-management/visitors/$visitorId'
      preLoaderRoute: typeof AuthenticatedVisitorManagementVisitorsVisitorIdLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/visitor-management/companies/': {
      id: '/_authenticated/visitor-management/companies/'
      path: '/visitor-management/companies'
      fullPath: '/visitor-management/companies'
      preLoaderRoute: typeof AuthenticatedVisitorManagementCompaniesIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/visitor-management/visitors/': {
      id: '/_authenticated/visitor-management/visitors/'
      path: '/visitor-management/visitors'
      fullPath: '/visitor-management/visitors'
      preLoaderRoute: typeof AuthenticatedVisitorManagementVisitorsIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedSettingsRouteLazyRouteChildren {
  AuthenticatedSettingsAccountLazyRoute: typeof AuthenticatedSettingsAccountLazyRoute
  AuthenticatedSettingsIndexLazyRoute: typeof AuthenticatedSettingsIndexLazyRoute
}

const AuthenticatedSettingsRouteLazyRouteChildren: AuthenticatedSettingsRouteLazyRouteChildren =
  {
    AuthenticatedSettingsAccountLazyRoute:
      AuthenticatedSettingsAccountLazyRoute,
    AuthenticatedSettingsIndexLazyRoute: AuthenticatedSettingsIndexLazyRoute,
  }

const AuthenticatedSettingsRouteLazyRouteWithChildren =
  AuthenticatedSettingsRouteLazyRoute._addFileChildren(
    AuthenticatedSettingsRouteLazyRouteChildren,
  )

interface AuthenticatedRouteRouteChildren {
  AuthenticatedSettingsRouteLazyRoute: typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedAccessControlsIndexLazyRoute: typeof AuthenticatedAccessControlsIndexLazyRoute
  AuthenticatedAppsIndexLazyRoute: typeof AuthenticatedAppsIndexLazyRoute
  AuthenticatedDepartmentsIndexLazyRoute: typeof AuthenticatedDepartmentsIndexLazyRoute
  AuthenticatedHelpCenterIndexLazyRoute: typeof AuthenticatedHelpCenterIndexLazyRoute
  AuthenticatedTasksIndexLazyRoute: typeof AuthenticatedTasksIndexLazyRoute
  AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute: typeof AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute
  AuthenticatedVisitorManagementCompaniesIndexLazyRoute: typeof AuthenticatedVisitorManagementCompaniesIndexLazyRoute
  AuthenticatedVisitorManagementVisitorsIndexLazyRoute: typeof AuthenticatedVisitorManagementVisitorsIndexLazyRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedSettingsRouteLazyRoute:
    AuthenticatedSettingsRouteLazyRouteWithChildren,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedAccessControlsIndexLazyRoute:
    AuthenticatedAccessControlsIndexLazyRoute,
  AuthenticatedAppsIndexLazyRoute: AuthenticatedAppsIndexLazyRoute,
  AuthenticatedDepartmentsIndexLazyRoute:
    AuthenticatedDepartmentsIndexLazyRoute,
  AuthenticatedHelpCenterIndexLazyRoute: AuthenticatedHelpCenterIndexLazyRoute,
  AuthenticatedTasksIndexLazyRoute: AuthenticatedTasksIndexLazyRoute,
  AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute:
    AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute,
  AuthenticatedVisitorManagementCompaniesIndexLazyRoute:
    AuthenticatedVisitorManagementCompaniesIndexLazyRoute,
  AuthenticatedVisitorManagementVisitorsIndexLazyRoute:
    AuthenticatedVisitorManagementVisitorsIndexLazyRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteRouteWithChildren
  '/sign-in': typeof authSignInRoute
  '/settings': typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  '/forgot-password': typeof authForgotPasswordLazyRoute
  '/sign-up': typeof authSignUpLazyRoute
  '/404': typeof errors404LazyRoute
  '/': typeof AuthenticatedIndexRoute
  '/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/access-controls': typeof AuthenticatedAccessControlsIndexLazyRoute
  '/apps': typeof AuthenticatedAppsIndexLazyRoute
  '/departments': typeof AuthenticatedDepartmentsIndexLazyRoute
  '/help-center': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/settings/': typeof AuthenticatedSettingsIndexLazyRoute
  '/tasks': typeof AuthenticatedTasksIndexLazyRoute
  '/visitor-management/visitors/$visitorId': typeof AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute
  '/visitor-management/companies': typeof AuthenticatedVisitorManagementCompaniesIndexLazyRoute
  '/visitor-management/visitors': typeof AuthenticatedVisitorManagementVisitorsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/sign-in': typeof authSignInRoute
  '/forgot-password': typeof authForgotPasswordLazyRoute
  '/sign-up': typeof authSignUpLazyRoute
  '/404': typeof errors404LazyRoute
  '/': typeof AuthenticatedIndexRoute
  '/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/access-controls': typeof AuthenticatedAccessControlsIndexLazyRoute
  '/apps': typeof AuthenticatedAppsIndexLazyRoute
  '/departments': typeof AuthenticatedDepartmentsIndexLazyRoute
  '/help-center': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/settings': typeof AuthenticatedSettingsIndexLazyRoute
  '/tasks': typeof AuthenticatedTasksIndexLazyRoute
  '/visitor-management/visitors/$visitorId': typeof AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute
  '/visitor-management/companies': typeof AuthenticatedVisitorManagementCompaniesIndexLazyRoute
  '/visitor-management/visitors': typeof AuthenticatedVisitorManagementVisitorsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/(auth)/sign-in': typeof authSignInRoute
  '/_authenticated/settings': typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  '/(auth)/forgot-password': typeof authForgotPasswordLazyRoute
  '/(auth)/sign-up': typeof authSignUpLazyRoute
  '/(errors)/404': typeof errors404LazyRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/_authenticated/access-controls/': typeof AuthenticatedAccessControlsIndexLazyRoute
  '/_authenticated/apps/': typeof AuthenticatedAppsIndexLazyRoute
  '/_authenticated/departments/': typeof AuthenticatedDepartmentsIndexLazyRoute
  '/_authenticated/help-center/': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/_authenticated/settings/': typeof AuthenticatedSettingsIndexLazyRoute
  '/_authenticated/tasks/': typeof AuthenticatedTasksIndexLazyRoute
  '/_authenticated/visitor-management/visitors/$visitorId': typeof AuthenticatedVisitorManagementVisitorsVisitorIdLazyRoute
  '/_authenticated/visitor-management/companies/': typeof AuthenticatedVisitorManagementCompaniesIndexLazyRoute
  '/_authenticated/visitor-management/visitors/': typeof AuthenticatedVisitorManagementVisitorsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/sign-in'
    | '/settings'
    | '/forgot-password'
    | '/sign-up'
    | '/404'
    | '/'
    | '/settings/account'
    | '/access-controls'
    | '/apps'
    | '/departments'
    | '/help-center'
    | '/settings/'
    | '/tasks'
    | '/visitor-management/visitors/$visitorId'
    | '/visitor-management/companies'
    | '/visitor-management/visitors'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/sign-in'
    | '/forgot-password'
    | '/sign-up'
    | '/404'
    | '/'
    | '/settings/account'
    | '/access-controls'
    | '/apps'
    | '/departments'
    | '/help-center'
    | '/settings'
    | '/tasks'
    | '/visitor-management/visitors/$visitorId'
    | '/visitor-management/companies'
    | '/visitor-management/visitors'
  id:
    | '__root__'
    | '/_authenticated'
    | '/(auth)/sign-in'
    | '/_authenticated/settings'
    | '/(auth)/forgot-password'
    | '/(auth)/sign-up'
    | '/(errors)/404'
    | '/_authenticated/'
    | '/_authenticated/settings/account'
    | '/_authenticated/access-controls/'
    | '/_authenticated/apps/'
    | '/_authenticated/departments/'
    | '/_authenticated/help-center/'
    | '/_authenticated/settings/'
    | '/_authenticated/tasks/'
    | '/_authenticated/visitor-management/visitors/$visitorId'
    | '/_authenticated/visitor-management/companies/'
    | '/_authenticated/visitor-management/visitors/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
  authSignInRoute: typeof authSignInRoute
  authForgotPasswordLazyRoute: typeof authForgotPasswordLazyRoute
  authSignUpLazyRoute: typeof authSignUpLazyRoute
  errors404LazyRoute: typeof errors404LazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  authSignInRoute: authSignInRoute,
  authForgotPasswordLazyRoute: authForgotPasswordLazyRoute,
  authSignUpLazyRoute: authSignUpLazyRoute,
  errors404LazyRoute: errors404LazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/(auth)/sign-in",
        "/(auth)/forgot-password",
        "/(auth)/sign-up",
        "/(errors)/404"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated/route.tsx",
      "children": [
        "/_authenticated/settings",
        "/_authenticated/",
        "/_authenticated/access-controls/",
        "/_authenticated/apps/",
        "/_authenticated/departments/",
        "/_authenticated/help-center/",
        "/_authenticated/tasks/",
        "/_authenticated/visitor-management/visitors/$visitorId",
        "/_authenticated/visitor-management/companies/",
        "/_authenticated/visitor-management/visitors/"
      ]
    },
    "/(auth)/sign-in": {
      "filePath": "(auth)/sign-in.tsx"
    },
    "/_authenticated/settings": {
      "filePath": "_authenticated/settings/route.lazy.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/settings/account",
        "/_authenticated/settings/"
      ]
    },
    "/(auth)/forgot-password": {
      "filePath": "(auth)/forgot-password.lazy.tsx"
    },
    "/(auth)/sign-up": {
      "filePath": "(auth)/sign-up.lazy.tsx"
    },
    "/(errors)/404": {
      "filePath": "(errors)/404.lazy.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings/account": {
      "filePath": "_authenticated/settings/account.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/access-controls/": {
      "filePath": "_authenticated/access-controls/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/apps/": {
      "filePath": "_authenticated/apps/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/departments/": {
      "filePath": "_authenticated/departments/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/help-center/": {
      "filePath": "_authenticated/help-center/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings/": {
      "filePath": "_authenticated/settings/index.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/tasks/": {
      "filePath": "_authenticated/tasks/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/visitor-management/visitors/$visitorId": {
      "filePath": "_authenticated/visitor-management/visitors/$visitorId.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/visitor-management/companies/": {
      "filePath": "_authenticated/visitor-management/companies/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/visitor-management/visitors/": {
      "filePath": "_authenticated/visitor-management/visitors/index.lazy.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
