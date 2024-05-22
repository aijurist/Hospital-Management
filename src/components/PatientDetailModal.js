import React from 'react';
import { Modal, Box, Typography, Divider, Stack, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Person, Event, Email, Phone, Home, Height, FitnessCenter, Wc, FavoriteBorder, Tag, Numbers } from '@mui/icons-material';

const PatientDetailModal = ({ open, onClose, selectedPatient }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '400px', p: 4, bgcolor: 'background.paper', m: '50px auto', borderRadius: 2, boxShadow: 24, overflowY: 'auto', maxHeight: '80vh' }}>
        {selectedPatient && (
          <Stack spacing={2}>
            <Typography variant="h6">Patient Details</Typography>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon>
                  <Tag />
                </ListItemIcon>
                <ListItemText primary={`ID: ${selectedPatient.id}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={`Name: ${selectedPatient.name}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary={`Last Visit: ${selectedPatient.lastVisit}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary={`Upcoming Appointments: ${selectedPatient.upcomingAppointments}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Numbers />
                </ListItemIcon>
                <ListItemText primary={`Age: ${selectedPatient.age}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FitnessCenter />
                </ListItemIcon>
                <ListItemText primary={`Weight: ${selectedPatient.weight} kg`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Height />
                </ListItemIcon>
                <ListItemText primary={`Height: ${selectedPatient.height} cm`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={`Contact: ${selectedPatient.contact}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={`Email: ${selectedPatient.email}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={`Address: ${selectedPatient.address}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Wc />
                </ListItemIcon>
                <ListItemText primary={`Gender: ${selectedPatient.gender}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FavoriteBorder />
                </ListItemIcon>
                <ListItemText primary={`Blood Group: ${selectedPatient.bloodGroup}`} />
              </ListItem>
            </List>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default PatientDetailModal;
