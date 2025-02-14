import { Routes, Route, Navigate } from 'react-router-dom';
import { Category } from '../pages';
import { Categories } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='categories' />} />
      <Route path='/categories' element={<Categories />} />

      <Route path='/categories/:id' element={<Category />} />

      <Route path='/categories/new' element={<Category />} />
    </Routes>
  );
};
