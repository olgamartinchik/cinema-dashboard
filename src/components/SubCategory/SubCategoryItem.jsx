import Box from '@mui/material/Box';
import { useCategoryContext } from '../../context/CategoryContext';
import { useMemo } from 'react';
import { FilmItem } from './FilmItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

export const SubCategoryItem = ({ subCategory }) => {
  const { state } = useCategoryContext();

  const films = useMemo(() => {
    return state.films.filter((film) => subCategory.filmIds.includes(film.id));
  }, [state.films, subCategory.filmIds]);

  return (
    <Box>
      <Typography variant='h3'>Subсategory: {subCategory.name}</Typography>

      {films.length ? (
        <List>
          {films.map((film) => (
            <FilmItem key={film.id} film={film.name} />
          ))}
        </List>
      ) : (
        <p>There are no films yet</p>
      )}
    </Box>
  );
};
