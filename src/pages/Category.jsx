import { Page } from './Page.styled';

import { useCategoryContext } from '../context/CategoryContext';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryForm } from '../components/Category/CategoryForm';

import { Button } from '@mui/material';

export const Category = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { state } = useCategoryContext();

  const category = name
    ? [...state.categories, ...state.newCategories].find(
        (category) => category.name.trim() === name
      )
    : null;

  const onAction = () => {
    navigate('/categories');
  };

  return (
    <Page>
      <Button variant='outlined' onClick={() => navigate('/categories')}>
        Back Home
      </Button>
      <CategoryForm
        films={state.films}
        category={category}
        onAction={onAction}
      />
    </Page>
  );
};
