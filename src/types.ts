export type Policy<TData> = (data: TData) => boolean;

export type PolicyDefinition<Args extends any[], TData> = (
  ...args: Args
) => Policy<TData>;

export function definePolicy<Args extends any[], TData>(
  policyDefinition: (...args: Args) => Policy<TData>,
): PolicyDefinition<Args, TData> {
  return policyDefinition;
}

type Builtin =
  // eslint-disable-next-line
  | Function
  | Date
  | Error
  | RegExp
  | Promise<any>
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>
  | symbol;

export type Flatten<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
    ? Array<Flatten<U>>
    : T extends object
      ? { [K in keyof T]: Flatten<T[K]> }
      : T;

export type IntersectPolicies<Policies extends Policy<any>[]> =
  Policies extends [infer First, ...infer Rest]
    ? First extends Policy<infer U>
      ? Rest extends Policy<any>[]
        ? Flatten<U> & IntersectPolicies<Rest>
        : Flatten<U>
      : unknown
    : unknown;
