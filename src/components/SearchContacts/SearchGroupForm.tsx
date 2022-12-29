import { Box, TextField, Button, FormHelperText  } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { searchGroupValidationSchema } from './validationSchemas';
import { ISerchGroupInputs } from './types';

interface ISearchGroupFormProps {
  onSubmit: (name: string) => void
  isLoading: boolean
}

function SearchGroupForm({onSubmit, isLoading}: ISearchGroupFormProps) {

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<ISerchGroupInputs>({mode: 'onSubmit', resolver: yupResolver(searchGroupValidationSchema)}); 

  const formSubmitHandler: SubmitHandler<ISerchGroupInputs> = async (data: ISerchGroupInputs) => {
    onSubmit(data.name);
    reset();
  };

  return (
    <>
    <Box 
      component='form' 
      className='form search-group__form'
      onSubmit={handleSubmit(formSubmitHandler)}
      data-testid='search-group-form'
    >
      <TextField
        className='TextField'
        size="small"
        autoComplete='off'
        placeholder='Search group'
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

export default SearchGroupForm;