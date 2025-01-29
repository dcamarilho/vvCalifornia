
import { useState } from 'react';
import { useRouter } from 'next/router';
import API_URL from '../config';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Login - VoulezVous
      </Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }}>
        Login
      </Button>
    </Container>
  );
}
