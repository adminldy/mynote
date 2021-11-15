import { Dictionary } from 'vue-router/types/router'
import Router,{RoutePath} from '../router'

export type BaseRouteType = Dictionary<string>

export interface IndexParam extends BaseRouteType {
  name: string
}

export interface AboutParam extends BaseRouteType {
  testName: string
}

export interface ParmasMap {
  [RoutePath.Index]: IndexParam,
  [RoutePath.About]: AboutParam
}

export class RouterHelper {
  public static replace<T extends RoutePath>(path: T, params: ParmasMap[T]) {
    Router.replace({
      path,
      params
    })
  }
  public static push<T extends RoutePath>(path: T, params: ParmasMap[T]) {
    Router.push({
      path,
      params
    })
  }
}