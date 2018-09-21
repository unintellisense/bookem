export interface IRouteItem {
  getNavBarRender(prefix?: string): JSX.Element | null
  getSwitchRender(prefix?: string): JSX.Element | null
  pullRight: boolean
}
