import React, { useState, useEffect, useCallback } from 'react';
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
import { CustomDivider } from '../../shared/CustomDivider.styled';

export const CategoryForm = ({ films, onAction, category = null }) => {
  const { state, dispatch } = useCategoryContext();
  const [categoryName, setCategoryName] = useState(category?.name || '');
  const [subCategories, setSubCategories] = useState(
    category?.subCategories || []
  );
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryErrors, setSubCategoryErrors] = useState([]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSubCategories(category.subCategories);
    }
  }, [category]);
  const validateCategoryName = useCallback(
    (name) => {
      const allCategories = [...state.categories, ...state.newCategories];
      const duplicate = allCategories.some(
        (existingCategory) =>
          existingCategory.name === name && existingCategory.id !== category?.id
      );
      setCategoryError(duplicate ? 'Category name already exists' : '');
    },
    [state.categories, state.newCategories, category]
  );

  const validateSubCategoryNames = useCallback(() => {
    const errors = subCategories.map((subCategory, index) => {
      const duplicate = subCategories.some(
        (existingSubCategory, i) =>
          existingSubCategory.name === subCategory.name && i !== index
      );
      return duplicate ? 'Subcategory name already exists' : '';
    });
    setSubCategoryErrors(errors);
  }, [subCategories]);

  useEffect(() => {
    validateCategoryName(categoryName);
  }, [categoryName, validateCategoryName]);

  useEffect(() => {
    validateSubCategoryNames();
  }, [subCategories, validateSubCategoryNames]);

  const handleCategoryNameChange = (e) => {
    const name = e.target.value;
    setCategoryName(name);
    validateCategoryName(name);
  };
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
    validateSubCategoryNames(updatedSubCategories);
  };

  const handleAddFilmToSubCategory = (index, filmId) => {
    const updatedSubCategories = subCategories.map((subCategory, i) =>
      i === index && !subCategory.filmIds.includes(filmId)
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

  const handleSave = () => {
    if (!category) {
      dispatch(addCategory({ id: null, name: categoryName, subCategories }));
    } else {
      dispatch(
        updateCategory({
          id: category.id || null,
          name: categoryName || category.name,
          subCategories,
        })
      );
    }

    dispatch(saveCategories());
    onAction();
  };

  const handleDelete = () => {
    dispatch(deleteCategory(category.id, category.name));
    dispatch(saveCategories());
    onAction();
  };

  const hasErrors = !!categoryError || subCategoryErrors.some((error) => error);

  return (
    <Box>
      <Typography variant='h2'>
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
          onChange={(e) => handleCategoryNameChange(e)}
          margin='normal'
          error={!!categoryError}
          helperText={categoryError}
        />
      )}

      <Box>
        {subCategories.map((subCategory, index) => (
          <Box key={index}>
            <Typography variant='h3'>Subcategory:</Typography>
            <TextField
              label={`Subcategory Name ${index + 1}`}
              variant='outlined'
              value={subCategory.name}
              onChange={(e) =>
                handleChangeSubCategoryName(index, e.target.value)
              }
              margin='normal'
              error={!!subCategoryErrors[index]}
              helperText={subCategoryErrors[index]}
            />

            <Box>
              <Typography variant='h4'>Films:</Typography>
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
                      disabled={hasErrors}
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
              disabled={hasErrors}
            >
              Delete Subcategory
            </StyledButton>
            <CustomDivider />
          </Box>
        ))}
        <StyledButton
          onClick={handleAddSubCategory}
          variant='contained'
          color='outlined'
          margin='16px 0 0 0'
          disabled={hasErrors}
        >
          Add New Subcategory
        </StyledButton>
      </Box>
      {category && (
        <StyledButton
          onClick={handleDelete}
          variant='contained'
          color='error'
          margin='16px 15px 0 0'
          disabled={hasErrors}
        >
          Delete Category
        </StyledButton>
      )}
      <StyledButton
        onClick={handleSave}
        variant='contained'
        color='primary'
        margin='16px 0 0 0'
        disabled={hasErrors}
      >
        Save
      </StyledButton>
    </Box>
  );
};
