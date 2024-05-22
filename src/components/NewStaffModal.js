import React from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const NewStaffModal = ({ open, onClose, newStaffDetails, onChange, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 600, p: 4, bgcolor: 'background.paper', m: '50px auto', borderRadius: 2, boxShadow: 24, overflowY: 'auto', maxHeight: '90vh' }}>
        <Typography variant="h5">New Staff</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={newStaffDetails.name}
            onChange={onChange}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Position</InputLabel>
            <Select
              name="position"
              value={newStaffDetails.position}
              onChange={onChange}
              label="Position"
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Support Staff">Support Staff</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Department"
            variant="outlined"
            name="department"
            value={newStaffDetails.department}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Contact"
            variant="outlined"
            name="contact"
            value={newStaffDetails.contact}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={newStaffDetails.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={newStaffDetails.address}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Gender"
            variant="outlined"
            name="gender"
            value={newStaffDetails.gender}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Experience"
            variant="outlined"
            name="experience"
            value={newStaffDetails.experience}
            onChange={onChange}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Shift</InputLabel>
            <Select
              name="shift"
              value={newStaffDetails.shift}
              onChange={onChange}
              label="Shift"
            >
              <MenuItem value="Day">Day</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </Select>
          </FormControl>
          {newStaffDetails.position === 'Nurse' && (
            <TextField
              label="Assigned Doctor"
              variant="outlined"
              name="assignedDoctor"
              value={newStaffDetails.assignedDoctor}
              onChange={onChange}
              fullWidth
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Create
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewStaffModal;
