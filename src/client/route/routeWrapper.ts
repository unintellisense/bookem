export type RouteWrapper = {
  routeLabel: string
  routePath: string
  component: React.ComponentType
} & { isRedirect: false }