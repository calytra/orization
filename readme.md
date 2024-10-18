# @calytra/orization

**Orization** is a TypeScript library that allows you to define reusable, human-readable policies and evaluate them against your data.

- **Reusable Policies**: Define once, reuse across multiple parts of your application.
- **Human-Readable**: Policies are easy to read and understand, even as they get more complex.

This purpose of this package is to the base logic underneath a Nuxt Module coming soon to help make it easier to build and manage complex authorization rules in your application.

## Installation

You can install the package using npm, pnpm, or yarn:

```bash
pnpm add @calytra/orization
```

## Example

When defining policies that will be reused or saved to variables, always use `definePolicy`. Here’s a basic example of defining and using a policy with **Orization**:

```ts
import { definePolicy, all } from '@calytra/orization';

// Define a simple policy that checks if a user is active
export const isActive = definePolicy(() => (user: { status: string }) => user.status === 'active');

// Define another policy to check if the user's email is verified
export const isVerified = definePolicy(() => (user: { emailVerified: boolean }) => user.emailVerified === true);

// Define a policy using other policyes using 'all' or any other logical operator
export const isAppUser = definePolicy(() => all(isActive(), isVerified()));

// Evaluate the policies
const user = { status: 'active', emailVerified: true };
console.log(isAppUser()(user)); // true
```

## Logical Operators

The following logical operators are available to combine multiple policies and evaluate them:

| Operator   | Parameters                                   | Logic                                                                                              | Evaluation                                                                                                  |
|------------|----------------------------------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **all**    | `...policies: Policies[]`                    | Checks if **all** policies return `true`.                                                          | Evaluates to `true` if every policy in the list returns `true` for the given data. Otherwise, returns `false`.|
| **atLeast**| `n: number, ...policies: Policies[]`         | Checks if **at least** `n` policies return `true`.                                                  | Evaluates to `true` if at least `n` policies return `true`. Otherwise, returns `false`.                      |
| **exactly**| `n: number, ...policies: Policies[]`         | Checks if **exactly** `n` policies return `true`.                                                   | Evaluates to `true` if exactly `n` policies return `true`. Otherwise, returns `false`.                       |
| **ifElse** | `condition: Policy, thenPolicy: Policy, elsePolicy: Policy` | If `condition` is `true`, evaluates `thenPolicy`, otherwise evaluates `elsePolicy`.                 | Evaluates `thenPolicy` if `condition` is `true`; otherwise, evaluates `elsePolicy`.                          |
| **implies**| `policyA: Policy, policyB: Policy`           | If `policyA` is `true`, then checks `policyB`. If `policyA` is `false`, it short-circuits to `true`. | Evaluates to `true` if either `policyA` is `false` or both `policyA` and `policyB` are `true`.               |
| **none**   | `...policies: Policies[]`                    | Checks if **none** of the policies return `true`.                                                   | Evaluates to `true` if all policies return `false`. Otherwise, returns `false`.                              |
| **not**    | `policy: Policy`                             | Negates the result of the policy, i.e., checks if the policy returns `false`.                       | Evaluates to `true` if the policy returns `false`, and `false` if the policy returns `true`.                 |
| **same**   | `...policies: Policies[]`                    | Checks if **all policies** return the same result (either all `true` or all `false`).               | Evaluates to `true` if all policies return the same value. Otherwise, returns `false`.                       |
| **some**   | `...policies: Policies[]`                    | Checks if **at least one** policy returns `true`.                                                   | Evaluates to `true` if at least one policy returns `true`. Otherwise, returns `false`.                       |
| **xor**    | `policyA: Policy, policyB: Policy`           | Returns `true` if **exactly one** of the two policies returns `true`.                               | Evaluates to `true` if one policy returns `true` and the other returns `false`. Otherwise, returns `false`.   |


