/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type createCategoriesInput = {
  iconName: string,
  name: string,
  id: string,
  type: string,
  userID: string,
};

export type Categories = {
  __typename: "Categories",
  iconName: string,
  name: string,
  id: string,
  type: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
};

export type CreateUserInput = {
  id?: string | null,
  firstName: string,
  secondName: string,
  imageUri?: string | null,
};

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  secondName?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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

export type User = {
  __typename: "User",
  id: string,
  firstName: string,
  secondName: string,
  imageUri?: string | null,
  categories?: ModelCategoriesConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCategoriesConnection = {
  __typename: "ModelCategoriesConnection",
  items:  Array<Categories >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  secondName?: string | null,
  imageUri?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCategoriesInput = {
  iconName: string,
  name: string,
  id?: string | null,
  type: string,
  userID: string,
};

export type ModelCategoriesConditionInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCategoriesConditionInput | null > | null,
  or?: Array< ModelCategoriesConditionInput | null > | null,
  not?: ModelCategoriesConditionInput | null,
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

export type UpdateCategoriesInput = {
  iconName?: string | null,
  name?: string | null,
  id: string,
  type?: string | null,
  userID?: string | null,
};

export type DeleteCategoriesInput = {
  id: string,
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
};

export type ModelCategoriesFilterInput = {
  iconName?: ModelStringInput | null,
  name?: ModelStringInput | null,
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelCategoriesFilterInput | null > | null,
  or?: Array< ModelCategoriesFilterInput | null > | null,
  not?: ModelCategoriesFilterInput | null,
};

export type BatchCreateCategoriesMutationVariables = {
  categories: Array< createCategoriesInput | null >,
};

export type BatchCreateCategoriesMutation = {
  batchCreateCategories?:  Array< {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null > | null,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoriesMutationVariables = {
  input: CreateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type CreateCategoriesMutation = {
  createCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoriesMutationVariables = {
  input: UpdateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type UpdateCategoriesMutation = {
  updateCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoriesMutationVariables = {
  input: DeleteCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type DeleteCategoriesMutation = {
  deleteCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
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
      categories?:  {
        __typename: "ModelCategoriesConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoriesQueryVariables = {
  id: string,
};

export type GetCategoriesQuery = {
  getCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriessQueryVariables = {
  filter?: ModelCategoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriessQuery = {
  listCategoriess?:  {
    __typename: "ModelCategoriesConnection",
    items:  Array< {
      __typename: "Categories",
      iconName: string,
      name: string,
      id: string,
      type: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName: string,
    secondName: string,
    imageUri?: string | null,
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
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
    categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        iconName: string,
        name: string,
        id: string,
        type: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategoriesSubscription = {
  onCreateCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategoriesSubscription = {
  onUpdateCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategoriesSubscription = {
  onDeleteCategories?:  {
    __typename: "Categories",
    iconName: string,
    name: string,
    id: string,
    type: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
