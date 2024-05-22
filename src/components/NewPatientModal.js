import React from 'react';
import { Modal, Box, Typography, Button, Divider, Grid, TextField, Stack } from '@mui/material';

const NewPatientModal = ({ open, onClose, newPatientDetails, onChange, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '600px', p: 4, bgcolor: 'background.paper', m: '50px auto', borderRadius: 2, boxShadow: 24, overflowY: 'auto', maxHeight: '80vh' }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Add New Patient</Typography>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Save
            </Button>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={newPatientDetails.name}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                variant="outlined"
                name="age"
                value={newPatientDetails.age}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                name="weight"
                value={newPatientDetails.weight}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                variant="outlined"
                name="height"
                value={newPatientDetails.height}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact"
                variant="outlined"
                name="contact"
                value={newPatientDetails.contact}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={newPatientDetails.email}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={newPatientDetails.address}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gender"
                variant="outlined"
                name="gender"
                value={newPatientDetails.gender}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Blood Group"
                variant="outlined"
                name="bloodGroup"
                value={newPatientDetails.bloodGroup}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            {/* Add more fields for patient details */}
          </Grid>
        </Stack>
      </Box>
    </Modal>
  );
};

export default NewPatientModal;