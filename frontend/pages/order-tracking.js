
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, Button } from '@mui/material';

const socket = io('http://localhost:5000');

export default function OrderTracking() {
  const [orderId, setOrderId] = useState(1);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    socket.emit('track_order', orderId);

    socket.on('order_status', (orderStatus) => {
      setStatus(orderStatus);
    });

    socket.on('order_status_update', ({ orderId: updatedOrderId, status: newStatus }) => {
      if (updatedOrderId === orderId) {
        setStatus(newStatus);
      }
    });

    return () => {
      socket.off('order_status');
      socket.off('order_status_update');
    };
  }, [orderId]);

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        Order Tracking
      </Typography>
      <Typography variant="h6" align="center">
        Order ID: {orderId}
      </Typography>
      <Typography variant="h6" align="center" color="primary">
        Status: {status}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => setOrderId(orderId + 1)}
        style={{ marginTop: '20px' }}
      >
        Track Next Order
      </Button>
    </Container>
  );
}
