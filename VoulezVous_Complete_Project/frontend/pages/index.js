
import Head from 'next/head';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>VoulezVous - Dashboard</title>
      </Head>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Welcome to VoulezVous
      </Typography>
      <Typography align="center">
        This is your dashboard. Customize it for your needs.
      </Typography>
    </Container>
  );
}
