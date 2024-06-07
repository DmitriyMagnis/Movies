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
  Skeleton,
  TextField,
  debounce,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useGetGenresQuery,
  useGetKeywordsQuery,
  type KeywordItem,
} from '../../services/tmdb';

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply: (filters: Filters) => void;
}

const MoviesFilter = ({ onApply }: MoviesFilterProps) => {
  const [keywordsQuery, setKeywordsQuery] = useState<string>('');
  const { data: keywordsOptions = [], isLoading: keywordsLoading } =
    useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const debouncedfetchKeywordsOptions = useMemo(
    () => debounce((query: string) => setKeywordsQuery(query), 1000),
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
          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
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
            </>
          )}
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
