
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import API_URL from '../config';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(\`\${API_URL}/api/orders\`, {
        headers: { 'Authorization': `Bearer \${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleInvoice = async (orderId) => {
    const response = await fetch(\`\${API_URL}/api/orders/\${orderId}/invoice\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer \${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      alert('Fatura emitida com sucesso!');
      setOrders(orders.map(order => order.id === orderId ? { ...order, invoice_issued: true } : order));
    } else {
      alert(data.message || 'Erro ao emitir fatura.');
    }
  };

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
            {order.invoice_issued ? (
              <span style={{ color: 'green', marginLeft: '10px' }}>✅ Fatura Emitida</span>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleInvoice(order.id)}
                style={{ marginLeft: '10px' }}
              >
                Emitir Fatura
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
