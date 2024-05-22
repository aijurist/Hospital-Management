import React from 'react';
import { Modal, Box, Typography, Divider, Stack, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { Person, Work, Business, Phone, Email, Home, Wc, School, Event } from '@mui/icons-material';

const StaffDetailsModal = ({ open, onClose, selectedStaff }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '400px', p: 4, bgcolor: 'background.paper', m: '50px auto', borderRadius: 2, boxShadow: 24, overflowY: 'auto', maxHeight: '80vh' }}>
        {selectedStaff && (
          <Stack spacing={2}>
            <Typography variant="h6">Staff Details</Typography>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={`Name: ${selectedStaff.name}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary={`Position: ${selectedStaff.position}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary={`Department: ${selectedStaff.department}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={`Contact: ${selectedStaff.contact}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={`Email: ${selectedStaff.email}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={`Address: ${selectedStaff.address}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Wc />
                </ListItemIcon>
                <ListItemText primary={`Gender: ${selectedStaff.gender}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary={`Experience: ${selectedStaff.experience}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary={`Shift: ${selectedStaff.shift}`} />
              </ListItem>
              {selectedStaff.position === 'Nurse' && (
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={`Assigned Doctor: ${selectedStaff.assignedDoctor}`} />
                </ListItem>
              )}
            </List>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default StaffDetailsModal;
