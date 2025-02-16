import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { StyledButton } from '../../shared/StyledButton';
import { useCategoryContext } from '../../context/CategoryContext';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  deleteSubCategory,
  saveCategories,
} from '../../store/actions';

export const CategoryForm = ({ films, onAction, category = null }) => {
  const { dispatch } = useCategoryContext();
  const [categoryName, setCategoryName] = useState(category?.name || '');
  const [subCategories, setSubCategories] = useState(
    category?.subCategories || []
  );

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSubCategories(category.subCategories);
    }
  }, [category]);

  const handleAddSubCategory = () => {
    const newSubCategory = { id: null, name: '', filmIds: [] };
    setSubCategories((prevSubCategories) => [
      ...prevSubCategories,
      newSubCategory,
    ]);
  };

  const handleDeleteSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
    dispatch(deleteSubCategory(category, subCategories[index]));
  };

  const handleChangeSubCategoryName = (index, newName) => {
    const updatedSubCategories = subCategories.map((subCategory, i) =>
      i === index ? { ...subCategory, name: newName } : subCategory
    );
    setSubCategories(updatedSubCategories);
  };

  const handleAddFilmToSubCategory = (index, filmId) => {
    const updatedSubCategories = subCategories.map((subCategory, i) =>
      i === index
        ? { ...subCategory, filmIds: [...subCategory.filmIds, filmId] }
        : subCategory
    );
    setSubCategories(updatedSubCategories);
  };

  const handleRemoveFilmFromSubCategory = (subIndex, filmId) => {
    const updatedSubCategories = subCategories.map((subCategory, i) =>
      i === subIndex
        ? {
            ...subCategory,
            filmIds: subCategory.filmIds.filter((id) => id !== filmId),
          }
        : subCategory
    );
    setSubCategories(updatedSubCategories);
  };

  // const hasErrors =
  //   !!errors.category || Object.values(errors.subCategories).some((err) => err);

  const handleSave = () => {
    if (!category) {
      dispatch(addCategory({ id: null, name: categoryName, subCategories }));
    } else {
      console.log({
        id: category.id || null,
        name: categoryName || category.name,
        subCategories,
      });
      dispatch(
        updateCategory({
          id: category.id || null,
          name: categoryName || category.name,
          subCategories,
        })
      );
    }
    // if (category) {
    //   dispatch(
    //     updateCategory({
    //       category,
    //     })
    //   );
    // }
    // if (hasErrors) return;
    // onSave({ id: category?.id || null, name: categoryName, subCategories });

    dispatch(saveCategories());
    onAction();
  };

  const handleDelete = () => {
    dispatch(deleteCategory(category.id, category.name));
    dispatch(saveCategories());
    onAction();
  };
  return (
    <Box>
      <Typography variant='h1'>
        {category
          ? `Edit ${category.name.toUpperCase()} Category`
          : 'Create New Category'}
      </Typography>
      {!category && (
        <TextField
          label='Category Name'
          variant='outlined'
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin='normal'
        />
      )}

      <Box>
        <Typography variant='h5'>Subcategories:</Typography>
        {subCategories.map((subCategory, index) => (
          <Box key={index}>
            <TextField
              label={`Subcategory Name ${index + 1}`}
              variant='outlined'
              value={subCategory.name}
              onChange={(e) =>
                handleChangeSubCategoryName(index, e.target.value)
              }
              margin='normal'
            />

            <Box>
              <Typography variant='h6'>Films:</Typography>
              {subCategory.filmIds.map((filmId, filmIndex) => {
                const film = films.find((film) => film.id === filmId);
                return (
                  <Box
                    key={filmIndex}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography>{film ? film.name : 'Unknown Film'}</Typography>

                    <StyledButton
                      onClick={() =>
                        handleRemoveFilmFromSubCategory(index, filmId)
                      }
                      variant='outlined'
                      color='error'
                      margin='8px'
                    >
                      Remove
                    </StyledButton>
                  </Box>
                );
              })}
              <FormControl fullWidth margin='normal'>
                <InputLabel>Select Film</InputLabel>
                <Select
                  label='Select Film'
                  onChange={(e) =>
                    handleAddFilmToSubCategory(index, e.target.value)
                  }
                  value=''
                >
                  {films.length &&
                    films.map((film) => (
                      <MenuItem key={film.id} value={film.id}>
                        {film.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <StyledButton
              onClick={() => handleDeleteSubCategory(index)}
              variant='outlined'
              color='error'
              margin='8px 0 0 0'
            >
              Delete Subcategory
            </StyledButton>
          </Box>
        ))}
        <StyledButton
          onClick={handleAddSubCategory}
          variant='contained'
          color='outlined'
          margin='16px 0 0 0'
        >
          Add Subcategory
        </StyledButton>
      </Box>
      {category && (
        <StyledButton
          onClick={handleDelete}
          variant='outlined'
          color='error'
          margin='16px 15px 0 0'
        >
          Delete Category
        </StyledButton>
      )}
      <StyledButton
        onClick={handleSave}
        variant='contained'
        color='primary'
        margin='16px 0 0 0'
        // disabled={hasErrors}
      >
        Save
      </StyledButton>
    </Box>
  );
};
