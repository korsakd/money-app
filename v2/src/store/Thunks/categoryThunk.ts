import { AppThunk } from '..';
import { v4 as uuid4 } from 'uuid';
import { categoryActions, CategoryType } from '../category';
import firestore from '@react-native-firebase/firestore';

export const addCategoryThunk = (
  type: string,
  name: string,
  iconName: string,
): AppThunk => async (dispatch, getState) => {
  const {
    user: { userID },
  } = getState();
  const data = { name, iconName, id: uuid4() };
  dispatch(categoryActions.addNewCategory(type, data));
};

export const editCategoryThunk = (
  id: string,
  type: string,
  name: string,
  iconName: string,
): AppThunk => async (dispatch, getState) => {
  const { category } = getState();
  const index = category[type].findIndex(e => e.id === id);
  const data = { name, iconName, id };
  dispatch(categoryActions.editCategory(type, index, data));
};

export const deleteCategoryThunk = (
  item: CategoryType,
  type: string,
): AppThunk => async (dispatch, getState) => {
  const {
    user: { userID },
  } = getState();
  dispatch(categoryActions.deleteCategory(item.id, type));
  if (userID) {
    firestore()
      .collection('usersData')
      .doc(userID)
      .update({
        [type]: firestore.FieldValue.arrayRemove(item),
      });
  }
};
