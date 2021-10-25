import { AppThunk } from '..';
import { v4 as uuid4 } from 'uuid';
import { categoryActions } from '../category';

export const addCategoryThunk = (
  type: string,
  name: string,
  iconName: string,
): AppThunk => async (dispatch, _) => {
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
  id: string,
  type: string,
): AppThunk => async (dispatch, _) => {
  dispatch(categoryActions.deleteCategory(id, type));
};
