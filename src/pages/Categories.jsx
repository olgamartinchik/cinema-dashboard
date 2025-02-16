import { Page } from './Page.styled';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { CategoryItem } from '../components/Category/CategoryItem';
import { useCategoryContext } from '../context/CategoryContext';
import { useState, useEffect } from 'react';

export const Categories = () => {
  const { state } = useCategoryContext();
  const [categories, setCategories] = useState(state.categories);

  useEffect(() => {
    setCategories([...state.categories, ...state.newCategories]);
  }, [state.categories, state.newCategories]);
  return (
    <Page>
      <Link to='/categories/new'>
        <Button variant='contained' color='primary'>
          Add new category
        </Button>
      </Link>
      {categories.length &&
        categories.map((category, ind) => (
          <CategoryItem key={ind} category={category} />
        ))}
    </Page>
  );
};
