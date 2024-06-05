import { Container } from '@mui/material';
import CountdownText from './CountdownText';
import { CountdownVideo } from './CountdownVideo';
import { MapView } from './MapView';

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <CountdownText />
      <CountdownVideo />
      <MapView />
    </Container>
  );
}

export default About;
