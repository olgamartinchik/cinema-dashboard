import { createContext, useContext, useReducer } from 'react';
import { reducer } from '../store/reducer';
import { initialState } from '../store/initialState';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
