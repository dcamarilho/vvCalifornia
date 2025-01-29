
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import API_URL from '../config';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Dashboard - VoulezVous
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ float: 'right' }}>
        Logout
      </Button>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Orders:
      </Typography>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - €{order.total_price} - Status: {order.status}
          </li>
        ))}
      </ul>
    </Container>
  );
}
