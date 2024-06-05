import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const CountdownText = () => {
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();
  const [countdown, setCountdown] = useState<number>(9);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCountdown(v => v - 1);
    }, 1000);
    return () => clearInterval(intervalIdRef.current);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalIdRef.current);
    }
  }, [countdown]);

  return (
    <Typography align="center" variant="h4">
      Cpming soon: {countdown}
    </Typography>
  );
};

export default CountdownText;
