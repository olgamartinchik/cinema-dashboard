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

export const addSubCategory = (categoryId, subCategory) => ({
  type: ActionTypes.ADD_SUBCATEGORY,
  payload: { categoryId, subCategory },
});

export const updateSubCategory = (categoryId, categoryName, subCategory) => ({
  type: ActionTypes.UPDATE_SUBCATEGORY,
  payload: { categoryId, categoryName, subCategory },
});

// export const deleteSubCategory = (categoryId, subCategoryId) => ({
//   type: ActionTypes.DELETE_SUBCATEGORY,
//   payload: { categoryId, subCategoryId },
// });
export const deleteSubCategory = (category, subCategory) => ({
  type: ActionTypes.DELETE_SUBCATEGORY,
  payload: { category, subCategory },
});

export const saveCategories = () => ({
  type: ActionTypes.SAVE_CATEGORIES,
});
