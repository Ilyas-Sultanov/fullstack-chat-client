import { memo } from 'react';
import { Box, TextField, Button, FormHelperText  } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { searchUserValidationSchema } from './validationSchemas';
import { ISerchUserInputs } from './types';

interface ISearchUserFormProps {
  onSubmit: (name: string) => void
  isLoading: boolean
}

function SearchUserForm({onSubmit, isLoading}: ISearchUserFormProps) {

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<ISerchUserInputs>({mode: 'onSubmit', resolver: yupResolver(searchUserValidationSchema)}); 

  const formSubmitHandler: SubmitHandler<ISerchUserInputs> = async (data: ISerchUserInputs) => {
    onSubmit(data.name);
    reset();
  };

  return (
    <>
      <Box 
        component='form' 
        className='form search-user__form'
        onSubmit={handleSubmit(formSubmitHandler)}
        data-testid='search-user__form'
      >
        <TextField
          className='TextField'
          size="small"
          autoComplete='off'
          placeholder='Search user'
          {...register('name')}
          error={!!formState.errors.name?.message}
          inputProps={{ 'data-testid': 'name-input' }}
        />
        <Button 
          type='submit'
          className='form__submit-btn'
          disableRipple={true}
          size='small'
        >
          <SearchOutlinedIcon/>
        </Button>
      </Box>
      {
        formState.errors.name ?
        <FormHelperText 
          error
          data-testid='email-validation-message'
        >{formState.errors.name.message}</FormHelperText> :
        null
      }
    </>
  )
}

export default memo(SearchUserForm);
