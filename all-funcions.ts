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

export function assert<Policies extends Policy<any>[]>(
    ...policies: Policies
): (data: IntersectPolicies<Policies>) => IntersectPolicies<Policies> {
    return (data: IntersectPolicies<Policies>) => {
        if (all(...policies)(data) === false) {
            throw new Error("Unauthorized");
        }
        return data;
    };
}

export const all = definePolicy(
    <Policies extends Policy<any>[]>(...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            return policies.every((policy) => policy(data) === true);
        };
    },
);

export const atLeast = definePolicy(
    <Policies extends Policy<any>[]>(n: number, ...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            let count = 0;
            for (const policy of policies) {
                if (policy(data) == true) {
                    count++;
                    if (count >= n) return true; // Short-circuit
                }
            }
            return false;
        };
    },
);

export const exactly = definePolicy(
    <Policies extends Policy<any>[]>(n: number, ...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            let count = 0;
            for (const policy of policies) {
                if (policy(data) === true) {
                    count++;
                }
            }
            return count === n;
        };
    },
);

export const ifElse = definePolicy(
    <Policies extends [Policy<any>, Policy<any>, Policy<any>]>(
        condition: Policies[0],
        thenPolicy: Policies[1],
        elsePolicy: Policies[2],
    ) => {
        return (data: IntersectPolicies<Policies>) => {
            return condition(data) === true ? thenPolicy(data) : elsePolicy(data);
        };
    },
);

export const implies = definePolicy(
    <Policies extends [Policy<any>, Policy<any>]>(
        policyA: Policies[0],
        policyB: Policies[1],
    ) => {
        return (data: IntersectPolicies<Policies>) => {
            return !policyA(data) || policyB(data);
        };
    },
);

export const none = definePolicy(
    <Policies extends Policy<any>[]>(...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            return policies.every((policy) => policy(data) === false);
        };
    },
);

export const not = definePolicy(
    <Policies extends [Policy<any>]>(policy: Policies[0]) => {
        return (data: IntersectPolicies<Policies>) => {
            return !policy(data);
        };
    },
);

export const same = definePolicy(
    <Policies extends Policy<any>[]>(...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            if (policies.length === 0) return true;
            const firstResult = policies[0]!(data);
            return policies.every((policy) => policy(data) === firstResult);
        };
    },
);

export const some = definePolicy(
    <Policies extends Policy<any>[]>(...policies: Policies) => {
        return (data: IntersectPolicies<Policies>) => {
            return policies.some((policy) => policy(data) === true);
        };
    },
);


export const xor = definePolicy(
    <Policies extends [Policy<any>, Policy<any>]>(
        policyA: Policies[0],
        policyB: Policies[1],
    ) => {
        return (data: IntersectPolicies<Policies>) => {
            return policyA(data) !== policyB(data);
        };
    },
);