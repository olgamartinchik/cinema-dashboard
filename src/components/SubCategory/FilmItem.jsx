import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const FilmItem = ({ film }) => {
  return (
    <ListItem>
      <ListItemText primary={film} />
    </ListItem>
  );
};
