export type RouteWrapper = {
  routeLabel: string
  routePath: string
  component: React.ComponentType
} & { isAuth: false }