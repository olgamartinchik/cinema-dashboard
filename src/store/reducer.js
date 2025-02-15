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
            subCategories: [],
          },
        ],
      };

    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id ? { ...cat, ...action.payload } : cat
        ),
        updatedCategories: state.updatedCategories.some(
          (cat) => cat.id === action.payload.id
        )
          ? state.updatedCategories.map((cat) =>
              cat.id === action.payload.id ? { ...cat, ...action.payload } : cat
            )
          : [
              ...state.updatedCategories,
              {
                ...action.payload,
                updatedSubCategories: [],
                deletedSubCategories: [],
              },
            ],
      };

    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.id !== action.payload.id
        ),
        deletedCategories:
          action.payload.id !== null
            ? [...state.deletedCategories, { id: action.payload.id }]
            : state.deletedCategories,
        newCategories: state.newCategories.filter(
          (cat) => cat.id !== action.payload.id
        ),
      };

    case ActionTypes.ADD_SUBCATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                subCategories: [
                  ...cat.subCategories,
                  { ...action.payload.subCategory, id: null, filmIds: [] },
                ],
              }
            : cat
        ),
        newCategories: state.newCategories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                subCategories: [
                  ...cat.subCategories,
                  { ...action.payload.subCategory, id: null, filmIds: [] },
                ],
              }
            : cat
        ),
        updatedCategories: state.updatedCategories.map((cat) =>
          cat.id === action.payload.categoryId && cat.id !== null
            ? {
                ...cat,
                updatedSubCategories: [
                  ...cat.updatedSubCategories,
                  { ...action.payload.subCategory, id: null, filmIds: [] },
                ],
              }
            : cat
        ),
      };

    case ActionTypes.DELETE_SUBCATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.filter(
                  (sub) => sub.id !== action.payload.subCategoryId
                ),
              }
            : cat
        ),
        updatedCategories: state.updatedCategories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                deletedSubCategories:
                  action.payload.subCategoryId !== null
                    ? [
                        ...cat.deletedSubCategories,
                        { id: action.payload.subCategoryId },
                      ]
                    : cat.deletedSubCategories,
              }
            : cat
        ),
        newCategories: state.newCategories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.filter(
                  (sub) => sub.id !== action.payload.subCategoryId
                ),
              }
            : cat
        ),
      };

    case ActionTypes.UPDATE_SUBCATEGORY_FILMS:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.map((sub) =>
                  sub.id === action.payload.subCategoryId
                    ? { ...sub, filmIds: action.payload.filmIds }
                    : sub
                ),
              }
            : cat
        ),
        updatedCategories: state.updatedCategories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                updatedSubCategories: cat.updatedSubCategories.some(
                  (sub) => sub.id === action.payload.subCategoryId
                )
                  ? cat.updatedSubCategories.map((sub) =>
                      sub.id === action.payload.subCategoryId
                        ? { ...sub, filmIds: action.payload.filmIds }
                        : sub
                    )
                  : action.payload.subCategoryId !== null
                  ? [
                      ...cat.updatedSubCategories,
                      {
                        id: action.payload.subCategoryId,
                        filmIds: action.payload.filmIds,
                      },
                    ]
                  : cat.updatedSubCategories,
              }
            : cat
        ),
      };

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
