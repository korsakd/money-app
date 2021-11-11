/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIncomeInput = {
  iconName: string,
  name: string,
  id?: string | null,
  userID: string,
  _version?: number | null,
};

export type ModelIncomeConditionInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelIncomeConditionInput | null > | null,
  or?: Array< ModelIncomeConditionInput | null > | null,
  not?: ModelIncomeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Income = {
  __typename: "Income",
  iconName: string,
  name: string,
  id: string,
  userID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateIncomeInput = {
  iconName?: string | null,
  name?: string | null,
  id: string,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteIncomeInput = {
  id: string,
  _version?: number | null,
};

export type CreateCostsInput = {
  iconName: string,
  name: string,
  id?: string | null,
  userID: string,
  _version?: number | null,
};

export type ModelCostsConditionInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCostsConditionInput | null > | null,
  or?: Array< ModelCostsConditionInput | null > | null,
  not?: ModelCostsConditionInput | null,
};

export type Costs = {
  __typename: "Costs",
  iconName: string,
  name: string,
  id: string,
  userID: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCostsInput = {
  iconName?: string | null,
  name?: string | null,
  id: string,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteCostsInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  firstName: string,
  secondName: string,
  imageUri?: string | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  secondName?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  secondName: string,
  imageUri?: string | null,
  income?: ModelIncomeConnection | null,
  costs?: ModelCostsConnection | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type ModelIncomeConnection = {
  __typename: "ModelIncomeConnection",
  items:  Array<Income >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelCostsConnection = {
  __typename: "ModelCostsConnection",
  items:  Array<Costs >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  secondName?: string | null,
  imageUri?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelIncomeFilterInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelIncomeFilterInput | null > | null,
  or?: Array< ModelIncomeFilterInput | null > | null,
  not?: ModelIncomeFilterInput | null,
};

export type ModelCostsFilterInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCostsFilterInput | null > | null,
  or?: Array< ModelCostsFilterInput | null > | null,
  not?: ModelCostsFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  secondName?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateIncomeMutationVariables = {
  input: CreateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type CreateIncomeMutation = {
  createIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateIncomeMutationVariables = {
  input: UpdateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type UpdateIncomeMutation = {
  updateIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteIncomeMutationVariables = {
  input: DeleteIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type DeleteIncomeMutation = {
  deleteIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCostsMutationVariables = {
  input: CreateCostsInput,
  condition?: ModelCostsConditionInput | null,
};

export type CreateCostsMutation = {
  createCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCostsMutationVariables = {
  input: UpdateCostsInput,
  condition?: ModelCostsConditionInput | null,
};

export type UpdateCostsMutation = {
  updateCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCostsMutationVariables = {
  input: DeleteCostsInput,
  condition?: ModelCostsConditionInput | null,
};

export type DeleteCostsMutation = {
  deleteCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncIncomesQueryVariables = {
  filter?: ModelIncomeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncIncomesQuery = {
  syncIncomes?:  {
    __typename: "ModelIncomeConnection",
    items:  Array< {
      __typename: "Income",
      iconName: string,
      name: string,
      id: string,
      userID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCostsQueryVariables = {
  filter?: ModelCostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCostsQuery = {
  syncCosts?:  {
    __typename: "ModelCostsConnection",
    items:  Array< {
      __typename: "Costs",
      iconName: string,
      name: string,
      id: string,
      userID: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      secondName: string,
      imageUri?: string | null,
      income?:  {
        __typename: "ModelIncomeConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      costs?:  {
        __typename: "ModelCostsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName: string,
      secondName: string,
      imageUri?: string | null,
      income?:  {
        __typename: "ModelIncomeConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      costs?:  {
        __typename: "ModelCostsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateIncomeSubscription = {
  onCreateIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIncomeSubscription = {
  onUpdateIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIncomeSubscription = {
  onDeleteIncome?:  {
    __typename: "Income",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCostsSubscription = {
  onCreateCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCostsSubscription = {
  onUpdateCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCostsSubscription = {
  onDeleteCosts?:  {
    __typename: "Costs",
    iconName: string,
    name: string,
    id: string,
    userID: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    income?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    costs?:  {
      __typename: "ModelCostsConnection",
      items:  Array< {
        __typename: "Costs",
        iconName: string,
        name: string,
        id: string,
        userID: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
