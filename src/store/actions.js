import { ActionTypes } from './actionTypes';

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const updateCategory = (category) => ({
  type: ActionTypes.UPDATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (categoryId) => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: { id: categoryId },
});

export const addSubCategory = (categoryId, subCategory) => ({
  type: ActionTypes.ADD_SUBCATEGORY,
  payload: { categoryId, subCategory },
});

export const deleteSubCategory = (categoryId, subCategoryId) => ({
  type: ActionTypes.DELETE_SUBCATEGORY,
  payload: { categoryId, subCategoryId },
});

export const updateSubCategoryFilms = (categoryId, subCategoryId, filmIds) => ({
  type: ActionTypes.UPDATE_SUBCATEGORY_FILMS,
  payload: { categoryId, subCategoryId, filmIds },
});

export const saveCategories = () => ({
  type: ActionTypes.SAVE_CATEGORIES,
});
