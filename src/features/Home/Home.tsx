import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Home = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', pt: 8, pb: 8 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" paddingTop="10px">
          Welcome to Movie DB!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          paddingTop="10px"
        >
          Explore movies today with us!
        </Typography>
        <Stack
          sx={{ pt: 4, pb: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            component={RouterLink}
            to={`/movies`}
            color="secondary"
          >
            Details
          </Button>
        </Stack>
      </Container>
      <Divider />
    </Box>
  );
};
