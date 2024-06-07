import { FilterAltOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  debounce,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { client, type KeywordItem } from '../../api/tmdb';
import { useAppSelector } from '../../hooks/hooks';

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply: (filters: Filters) => void;
}

const MoviesFilter = ({ onApply }: MoviesFilterProps) => {
  const [keywordsLoading, setKeywordsLoading] = useState<boolean>(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);
  const genres = useAppSelector(state => state.movies.genres);
  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const fetchKeywordsOptions = async (query: string) => {
    if (query) {
      setKeywordsLoading(true);
      const options = await client.geKeywords(query);
      setKeywordsLoading(false);
      setKeywordsOptions(options);
    } else {
      setKeywordsOptions([]);
    }
  };

  const debouncedfetchKeywordsOptions = useMemo(
    () => debounce(fetchKeywordsOptions, 1000),
    []
  );
  return (
    <Paper sx={{ m: 2, p: 0.5, mt: 10 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ display: 'block' }}
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                renderInput={params => (
                  <TextField {...params} label="keywords" />
                )}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                multiple
                onChange={(_, newValue) => onChange(newValue)}
                onInputChange={(_, newInputValue) =>
                  debouncedfetchKeywordsOptions(newInputValue)
                }
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={x => x}
                getOptionLabel={option => option.name}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard"
        >
          <FormLabel component="legend">Genres</FormLabel>
          <FormGroup sx={{ maxHeight: 500 }}>
            <Controller
              name="genres"
              control={control}
              render={({ field }) => (
                <>
                  {genres.map(genre => (
                    <FormControlLabel
                      key={genre.id}
                      control={
                        <Checkbox
                          value={genre.id}
                          checked={field.value.includes(genre.id)}
                          onChange={(event, checked) => {
                            console.log(field, genre);
                            const valueNumber = Number(event.target.value);
                            if (checked) {
                              field.onChange([...field.value, valueNumber]);
                            } else {
                              field.onChange(
                                field.value.filter(v => v !== valueNumber)
                              );
                            }
                          }}
                        />
                      }
                      label={genre.name}
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          startIcon={<FilterAltOutlined />}
        >
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};
export default MoviesFilter;
