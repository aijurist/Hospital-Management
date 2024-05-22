import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SearchOutlined, Add, Info } from '@mui/icons-material';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import NewPatientModal from '../components/NewPatientModal';
import PatientDetailModal from '../components/PatientDetailModal';
import { useSnackbar } from 'notistack';

const patients = [
  { id: 'P001', name: 'John Doe', lastVisit: '2024-05-10', upcomingAppointments: '2024-06-01', age: 30, weight: 70, height: 175, contact: '123-456-7890', email: 'john@example.com', address: '123 Main St', gender: 'Male', bloodGroup: 'O+' },
  { id: 'P002', name: 'Jane Smith', lastVisit: '2024-04-22', upcomingAppointments: '---', age: 25, weight: 60, height: 165, contact: '987-654-3210', email: 'jane@example.com', address: '456 Oak Ave', gender: 'Female', bloodGroup: 'A+' },
];

const Patient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [newPatientDetails, setNewPatientDetails] = useState({ name: '', address: '', contact: '', age: '', weight: '', height: '', email: '', gender: '', bloodGroup: '' });

  useEffect(() => {
    const filterPatients = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(lowerCaseQuery) ||
          patient.id.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredPatients(filtered);
    };

    filterPatients();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleOpenDetailModal = (patient) => {
    setSelectedPatient(patient);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedPatient(null);
  };

  const resetForm = () => {
    setNewPatientDetails({ name: '', address: '', contact: '', age: '', weight: '', height: '', email: '', gender: '', bloodGroup: '' });
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatientDetails({ ...newPatientDetails, [name]: value });
  };

  const handleNewPatientSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.6:5000/patients/newPatientDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatientDetails)
      });
      if (response.ok) {
        handleCloseModal();
        enqueueSnackbar('New patient added successfully', { variant: 'success' });
      } else {
        console.error('Failed to add new patient:', response.statusText, { variant: 'error' });
        enqueueSnackbar('Failed to add new patient', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error adding new patient:', error);
      enqueueSnackbar('Error adding new patient', { variant: 'error' });
    }
  };
  

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Heading text="Patient Search" />
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search Patients"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Patient List</Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
            Add New Patient
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Last Visit</TableCell>
                <TableCell>Upcoming Appointments</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.upcomingAppointments}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<Info />} onClick={() => handleOpenDetailModal(patient)}>
                      Show More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <NewPatientModal 
        open={openModal} 
        onClose={handleCloseModal} 
        newPatientDetails={newPatientDetails} 
        onChange={handleNewPatientChange} 
        onSubmit={handleNewPatientSubmit} 
      />

      <PatientDetailModal 
        open={openDetailModal} 
        onClose={handleCloseDetailModal} 
        selectedPatient={selectedPatient} 
      />
    </Layout>
  );
};

export default Patient;
