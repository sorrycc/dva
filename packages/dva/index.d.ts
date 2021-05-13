import {
  Reducer,
  Action,
  AnyAction,
  ReducersMapObject,
  MiddlewareAPI,
  StoreEnhancer,
  bindActionCreators
} from 'redux';

import { History } from "history";

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): Promise<any> | T;
}

export interface onActionFunc {
  (api: MiddlewareAPI<any>): void,
}

export interface ReducerEnhancer {
  (reducer: Reducer<any>): void,
}

export interface Hooks {
  onError?: (e: Error, dispatch: Dispatch<any>) => void,
  onAction?: onActionFunc | onActionFunc[],
  onStateChange?: () => void,
  onReducer?: ReducerEnhancer,
  onEffect?: () => void,
  onHmr?: () => void,
  extraReducers?: ReducersMapObject,
  extraEnhancers?: StoreEnhancer<any>[],
}

export type DvaOption = Hooks & {
  namespacePrefixWarning?: boolean,
  initialState?: Object,
  history?: Object,
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any,
  call: Function,
  select: Function,
  take: Function,
  cancel: Function,
  [key: string]: any,
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle' | 'poll';
export type EffectWithType = [Effect, { type: EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer];

export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType,
}

export interface SubscriptionAPI {
  history: History,
  dispatch: Dispatch<any>,
}

export interface SubscriptionsMapObject {
  [key: string]: Subscription,
}

export interface Model {
  namespace: string,
  state?: any,
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer,
  effects?: EffectsMapObject,
  subscriptions?: SubscriptionsMapObject,
}

export interface RouterAPI {
  history: History,
  app: DvaInstance,
}

export interface Router {
  (api?: RouterAPI): JSX.Element | Object,
}

export interface DvaInstance {
  /**
   * Register an object of hooks on the application.
   *
   * @param hooks
   */
  use: (hooks: Hooks) => void,

  /**
   * Register a model.
   *
   * @param model
   */
  model: (model: Model) => void,

  /**
   * Unregister a model.
   *
   * @param namespace
   */
  unmodel: (namespace: string) => void,

  /**
   * Config router. Takes a function with arguments { history, dispatch },
   * and expects router config. It use the same api as react-router,
   * return jsx elements or JavaScript Object for dynamic routing.
   *
   * @param router
   */
  router: (router: Router) => void,

  /**
   * Start the application. Selector is optional. If no selector
   * arguments, it will return a function that return JSX elements.
   *
   * @param selector
   */
  start: (selector?: HTMLElement | string) => any,
}

export default function dva(opts?: DvaOption): DvaInstance;

export { bindActionCreators };

export {
  connect, connectAdvanced, useSelector, useDispatch, useStore,
  DispatchProp, shallowEqual
} from 'react-redux';

import * as routerRedux from 'connected-react-router';
export { routerRedux };

import * as fetch from 'isomorphic-fetch';
export { fetch };

import * as router from 'react-router-dom';
export { router };
export { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
