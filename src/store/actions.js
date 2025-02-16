import { ActionTypes } from './actionTypes';

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const updateCategory = (category) => ({
  type: ActionTypes.UPDATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (id, name) => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: { id, name },
});

export const deleteSubCategory = (category, subCategory) => ({
  type: ActionTypes.DELETE_SUBCATEGORY,
  payload: { category, subCategory },
});

export const saveCategories = () => ({
  type: ActionTypes.SAVE_CATEGORIES,
});
