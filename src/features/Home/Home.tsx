import { useAuth0 } from '@auth0/auth0-react';
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
  const { user, isAuthenticated } = useAuth0();

  const greeting = isAuthenticated
    ? `${user?.name}, explore movies today with us!`
    : 'Explore movies today with us!';

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
          {greeting}
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
