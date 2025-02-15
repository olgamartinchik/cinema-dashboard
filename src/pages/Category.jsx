import { Page } from './Page.styled';
import { useCategoryContext } from '../context/CategoryContext';

export const Category = () => {
  const { state } = useCategoryContext();
  console.log('state', state);
  return <Page>Category</Page>;
};
