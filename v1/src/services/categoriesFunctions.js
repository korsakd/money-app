import {
  addCategory,
  removeCategory,
  replaceCategory,
  sortCategories,
} from '../redux/reducers/categoriesReducer';
import {
  setUserCategoryData,
  removeUserCategoryData,
  replaceUserCategoryData,
  sortUserCategoryData,
} from '../services/firebase';

export const setCategoryDb = (category, type) => {
  return (dispatch, getState) => {
    dispatch(addCategory(category, type));
    const state = getState();
    const idCategory = category.id;
    if (state.userReducer.user) {
      setUserCategoryData(state.userReducer.user, category, type, idCategory);
    }
  };
};

export const removeCategoryDb = (index, type, id) => {
  return (dispatch, getState) => {
    dispatch(removeCategory(index, type));
    const state = getState();
    if (state.userReducer.user) {
      removeUserCategoryData(state.userReducer.user, type, id);
    }
  };
};

export const replaceCategoryDb = (element, index, type) => {
  return (dispatch, getState) => {
    dispatch(replaceCategory(element, index, type));
    const state = getState();
    const id = element.id;
    if (state.userReducer.user) {
      replaceUserCategoryData(state.userReducer.user, type, element, id);
    }
  };
};

export const sortCategoryDb = (category, type) => {
  return (dispatch, getState) => {
    dispatch(sortCategories(category, type));
    const state = getState();
    if (state.userReducer.user) {
      sortUserCategoryData(
        state.categoriesReducer,
        type,
        state.userReducer.user,
      );
    }
  };
};
