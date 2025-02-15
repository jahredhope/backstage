## API Report File for "@backstage/plugin-permission-node"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { AuthorizeDecision } from '@backstage/plugin-permission-common';
import { AuthorizeQuery } from '@backstage/plugin-permission-common';
import { AuthorizeRequestOptions } from '@backstage/plugin-permission-common';
import { AuthorizeResult } from '@backstage/plugin-permission-common';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-backend';
import { Config } from '@backstage/config';
import express from 'express';
import { Identified } from '@backstage/plugin-permission-common';
import { PermissionAuthorizer } from '@backstage/plugin-permission-common';
import { PermissionCondition } from '@backstage/plugin-permission-common';
import { PermissionCriteria } from '@backstage/plugin-permission-common';
import { PluginEndpointDiscovery } from '@backstage/backend-common';
import { TokenManager } from '@backstage/backend-common';

// @public
export type ApplyConditionsRequest = {
  items: ApplyConditionsRequestEntry[];
};

// @public
export type ApplyConditionsRequestEntry = Identified<{
  resourceRef: string;
  resourceType: string;
  conditions: PermissionCriteria<PermissionCondition>;
}>;

// @public
export type ApplyConditionsResponse = {
  items: ApplyConditionsResponseEntry[];
};

// @public
export type ApplyConditionsResponseEntry = Identified<DefinitivePolicyDecision>;

// @public
export type Condition<TRule> = TRule extends PermissionRule<
  any,
  any,
  infer TParams
>
  ? (...params: TParams) => PermissionCondition<TParams>
  : never;

// @public
export type ConditionalPolicyDecision = {
  result: AuthorizeResult.CONDITIONAL;
  pluginId: string;
  resourceType: string;
  conditions: PermissionCriteria<PermissionCondition>;
};

// @public
export type Conditions<
  TRules extends Record<string, PermissionRule<any, any>>,
> = {
  [Name in keyof TRules]: Condition<TRules[Name]>;
};

// @public
export type ConditionTransformer<TQuery> = (
  conditions: PermissionCriteria<PermissionCondition>,
) => PermissionCriteria<TQuery>;

// @public
export const createConditionExports: <
  TResource,
  TRules extends Record<string, PermissionRule<TResource, any, unknown[]>>,
>(options: {
  pluginId: string;
  resourceType: string;
  rules: TRules;
}) => {
  conditions: Conditions<TRules>;
  createPolicyDecision: (
    conditions: PermissionCriteria<PermissionCondition>,
  ) => ConditionalPolicyDecision;
};

// @public
export const createConditionFactory: <TParams extends any[]>(
  rule: PermissionRule<unknown, unknown, TParams>,
) => (...params: TParams) => {
  rule: string;
  params: TParams;
};

// @public
export const createConditionTransformer: <
  TQuery,
  TRules extends PermissionRule<any, TQuery, unknown[]>[],
>(
  permissionRules: [...TRules],
) => ConditionTransformer<TQuery>;

// @public
export const createPermissionIntegrationRouter: <TResource>(options: {
  resourceType: string;
  rules: PermissionRule<TResource, any, unknown[]>[];
  getResources: (resourceRefs: string[]) => Promise<(TResource | undefined)[]>;
}) => express.Router;

// @public
export const createPermissionRule: <
  TResource,
  TQuery,
  TParams extends unknown[],
>(
  rule: PermissionRule<TResource, TQuery, TParams>,
) => PermissionRule<TResource, TQuery, TParams>;

// @public
export type DefinitivePolicyDecision = {
  result: AuthorizeResult.ALLOW | AuthorizeResult.DENY;
};

// @public
export const makeCreatePermissionRule: <TResource, TQuery>() => <
  TParams extends unknown[],
>(
  rule: PermissionRule<TResource, TQuery, TParams>,
) => PermissionRule<TResource, TQuery, TParams>;

// @public
export interface PermissionPolicy {
  // (undocumented)
  handle(
    request: PolicyAuthorizeQuery,
    user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision>;
}

// @public
export type PermissionRule<
  TResource,
  TQuery,
  TParams extends unknown[] = unknown[],
> = {
  name: string;
  description: string;
  apply(resource: TResource, ...params: TParams): boolean;
  toQuery(...params: TParams): PermissionCriteria<TQuery>;
};

// @public
export type PolicyAuthorizeQuery = Omit<AuthorizeQuery, 'resourceRef'>;

// @public
export type PolicyDecision =
  | DefinitivePolicyDecision
  | ConditionalPolicyDecision;

// @public
export class ServerPermissionClient implements PermissionAuthorizer {
  // (undocumented)
  authorize(
    queries: AuthorizeQuery[],
    options?: AuthorizeRequestOptions,
  ): Promise<AuthorizeDecision[]>;
  // (undocumented)
  static fromConfig(
    config: Config,
    options: {
      discovery: PluginEndpointDiscovery;
      tokenManager: TokenManager;
    },
  ): ServerPermissionClient;
}
```
