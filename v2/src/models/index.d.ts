import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IncomeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CostsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly imageUri?: string;
  readonly income?: (Income | null)[];
  readonly costs?: (Costs | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Income {
  readonly id: string;
  readonly iconName: string;
  readonly name: string;
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Income, IncomeMetaData>);
  static copyOf(source: Income, mutator: (draft: MutableModel<Income, IncomeMetaData>) => MutableModel<Income, IncomeMetaData> | void): Income;
}

export declare class Costs {
  readonly id: string;
  readonly iconName: string;
  readonly name: string;
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Costs, CostsMetaData>);
  static copyOf(source: Costs, mutator: (draft: MutableModel<Costs, CostsMetaData>) => MutableModel<Costs, CostsMetaData> | void): Costs;
}