import { ActionTypes } from './actionTypes';

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        newCategories: [
          ...state.newCategories,
          {
            ...action.payload,
            id: null,
            subCategories: action.payload.subCategories.map((subCategory) => ({
              ...subCategory,
              id: null,
              filmIds: subCategory.filmIds || [],
            })),
          },
        ],
      };
    case ActionTypes.UPDATE_CATEGORY:
      const { subCategories, ...rest } = action.payload;
      if (action.payload.id === null) {
        const categoryNameLower = action.payload.name;
        return {
          ...state,
          newCategories: state.newCategories.map((cat) =>
            cat.name === categoryNameLower ? { ...cat, ...action.payload } : cat
          ),
        };
      } else {
        return {
          ...state,

          updatedCategories: state.updatedCategories.some(
            (cat) => cat.id === action.payload.id
          )
            ? state.updatedCategories.map((cat) =>
                cat.id === action.payload.id
                  ? { ...cat, ...rest, updatedSubCategories: subCategories }
                  : cat
              )
            : [
                ...state.updatedCategories,
                {
                  ...rest,
                  updatedSubCategories: subCategories || [],
                },
              ],
          categories: state.categories.map((cat) =>
            cat.id === action.payload.id
              ? {
                  ...cat,
                  ...action.payload,
                }
              : cat
          ),
        };
      }

    case ActionTypes.DELETE_CATEGORY:
      if (action.payload.id === null) {
        return {
          ...state,
          newCategories: state.newCategories.filter(
            (cat) => cat.name !== action.payload.name
          ),
        };
      } else {
        return {
          ...state,
          categories: state.categories.filter(
            (cat) => cat.id !== action.payload.id
          ),
          updatedCategories: state.updatedCategories.filter(
            (cat) => cat.id !== action.payload.id
          ),
          deletedCategories: [
            ...state.deletedCategories,
            { id: action.payload.id },
          ],
        };
      }

    case ActionTypes.DELETE_SUBCATEGORY: {
      const { category, subCategory } = action.payload;

      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === category.id || c.name === category.name
            ? {
                ...c,
                subCategories: c.subCategories.filter(
                  (s) =>
                    !(s.id === subCategory.id || s.name === subCategory.name)
                ),
              }
            : c
        ),

        newCategories: state.newCategories.map((c) =>
          c.name === category.name
            ? {
                ...c,
                subCategories: c.subCategories.filter(
                  (s) => s.name !== subCategory.name
                ),
              }
            : c
        ),

        updatedCategories: state.updatedCategories.map((c) =>
          c.id === category.id || c.name === category.name
            ? {
                ...c,
                updatedSubCategories: (c.updatedSubCategories || []).filter(
                  (s) =>
                    !(s.id === subCategory.id || s.name === subCategory.name)
                ),
                deletedSubCategories: subCategory.id
                  ? [...(c.deletedSubCategories || []), { id: subCategory.id }]
                  : c.deletedSubCategories,
              }
            : c
        ),
      };
    }

    case ActionTypes.SAVE_CATEGORIES:
      console.log({
        newCategories: state.newCategories,
        updatedCategories: state.updatedCategories,
        deletedCategories: state.deletedCategories,
      });
      return state;

    default:
      return state;
  }
};
