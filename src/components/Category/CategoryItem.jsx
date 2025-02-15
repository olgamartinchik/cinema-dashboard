import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { SubCategoryItem } from '../SubCategory/SubCategoryItem';
import { CustomDivider } from '../../shared/CustomDivider.styled';
import Typography from '@mui/material/Typography';

export const CategoryItem = ({ category }) => {
  return (
    <>
      <Box>
        <Typography variant='h2'>
          Category: {category.name}{' '}
          <Link to={`/categories/${category.id}`}>
            <Button variant='outline' color='secondary'>
              Edit
            </Button>
          </Link>
        </Typography>

        {category.subCategories.length &&
          category.subCategories.map((subCategory) => (
            <SubCategoryItem key={subCategory.id} subCategory={subCategory} />
          ))}
      </Box>
      <CustomDivider />
    </>
  );
};
