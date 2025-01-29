
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, Button, TextField } from '@mui/material';
import API_URL from '../config';

const socket = io(API_URL);

export default function RFIDDashboard() {
  const [inventory, setInventory] = useState([]);
  const [rfidTag, setRfidTag] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch(\`\${API_URL}/api/rfid/inventory\`, {
        headers: { 'Authorization': `Bearer \${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setInventory(data);
    };
    fetchInventory();

    socket.on('rfid_update', (updatedInventory) => {
      setInventory(updatedInventory);
    });

    return () => {
      socket.off('rfid_update');
    };
  }, []);

  const handleRegisterRFID = async () => {
    const response = await fetch(\`\${API_URL}/api/rfid/register\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer \${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId, rfidTag }),
    });
    const data = await response.json();

    if (response.ok) {
      alert('RFID registrado com sucesso!');
      setInventory(inventory.map(item => item.id === parseInt(productId) ? { ...item, rfid: rfidTag } : item));
    } else {
      alert(data.message || 'Erro ao registrar RFID.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
        RFID Dashboard - VoulezVous
      </Typography>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Inventário em Tempo Real:
      </Typography>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - Estoque: {item.stock} - RFID: {item.rfid || 'Não registrado'}
          </li>
        ))}
      </ul>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Registrar RFID:
      </Typography>
      <TextField label="ID do Produto" fullWidth margin="normal" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <TextField label="Código RFID" fullWidth margin="normal" value={rfidTag} onChange={(e) => setRfidTag(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegisterRFID} style={{ marginTop: '20px' }}>
        Registrar RFID
      </Button>
    </Container>
  );
}
