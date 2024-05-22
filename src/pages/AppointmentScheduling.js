import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, InputAdornment, IconButton,
  Button, Modal, Grid, FormControl, InputLabel, Select, MenuItem,
  Stack, Divider
} from '@mui/material';
import { SearchOutlined, Add, EventAvailable } from '@mui/icons-material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import enLocale from 'date-fns/locale/en-US';
import Layout from '../components/Layout';
import AppointmentTable from '../components/AppointmentTable';
import Heading from '../components/Heading';
import { useDataContext } from '../context/DataContext';
import { useSnackbar } from 'notistack';


const sampleAppointments = [
  {
    doctorId: 'D001',
    doctorName: 'Dr. Alice',
    specialty: 'Cardiology',
    location: 'Room 101',
    date: '2024-05-21',
    slots: [
      { time: '09:00 AM', patients: ['Patient 1', 'Patient 2'], status: 'Available' },
      { time: '10:00 AM', patients: ['Patient 3', 'Patient 4'], status: 'Available' },
    ],
  },
  {
    doctorId: 'D002',
    doctorName: 'Dr. Bob',
    specialty: 'Neurology',
    location: 'Room 202',
    date: '2024-05-21',
    slots: [
      { time: '09:00 AM', patients: ['Patient 5', 'Patient 6'], status: 'Booked' },
      { time: '10:00 AM', patients: ['Patient 7', 'Patient 8'], status: 'Available' },
    ],
  },
  {
    doctorId: 'D001',
    doctorName: 'Dr. Alice',
    specialty: 'Cardiology',
    location: 'Room 101',
    date: '2024-05-22',
    slots: [
      { time: '09:00 AM', patients: ['Patient 9', 'Patient 10'], status: 'Booked' },
      { time: '10:00 AM', patients: ['Patient 11', 'Patient 12'], status: 'Available' },
    ],
  },
  {
    doctorId: 'D002',
    doctorName: 'Dr. Bob',
    specialty: 'Neurology',
    location: 'Room 202',
    date: '2024-05-22',
    slots: [
      { time: '09:00 AM', patients: ['Patient 13', 'Patient 14'], status: 'Booked' },
      { time: '10:00 AM', patients: ['Patient 15', 'Patient 16'], status: 'Available' },
    ],
  },
];

const AppointmentScheduling = () => {
  const { doctors, patients, departments } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(sampleAppointments);
  const [openModal, setOpenModal] = useState(false);
  const [patientDetails, setPatientDetails] = useState({ id: '', name: '', contact: '' });
  const [doctorDetails, setDoctorDetails] = useState({ id: '', name: '', department: '' });
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const filterAppointments = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = sampleAppointments.filter(
        (appointment) =>
          appointment.doctorName.toLowerCase().includes(lowerCaseQuery) ||
          appointment.slots.some((slot) =>
            slot.patients.some((patient) => patient.toLowerCase().includes(lowerCaseQuery))
          )
      );
      setFilteredAppointments(filtered);
    };

    filterAppointments();
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
    setAppointmentDate(new Date());
    setSelectedSlots([]);
    
  };

  const resetForm = () => {
    setPatientDetails({ id: '', name: '', contact: '' });
    setDoctorDetails({ id: '', name: '', department: '' });
    setReason('');
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });

    if (name === 'id') {
      const patient = patients.find((p) => p.id === value);
      if (patient) {
        setPatientDetails(patient);
      }
    } else if (name === 'name') {
      const patient = patients.find((p) => p.name === value);
      if (patient) {
        setPatientDetails(patient);
      }
    }
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });

    if (name === 'id') {
      const doctor = doctors.find((d) => d.id === value);
      if (doctor) {
        setDoctorDetails(doctor);
      }
    } else if (name === 'department') {
      const doctor = doctors.find((d) => d.department === value);
      if (doctor) {
        setDoctorDetails(doctor);
      }
    }
  };

  const handleDateChange = (newDate) => {
    setAppointmentDate(newDate);

    const formattedDate = newDate.toISOString().split('T')[0];
    const doctor = sampleAppointments.find(app => app.doctorId === doctorDetails.id && app.date === formattedDate);
    if (doctor) {
      setSelectedSlots(doctor.slots);
    } else {
      setSelectedSlots([]);
    }
  };

  const handleAppointmentSubmit = async () => {
    try {
      const appointmentData = {
        patientId: patientDetails.id,
        patientName: patientDetails.name,
        contact: patientDetails.contact,
        department: doctorDetails.department,
        doctorName: doctorDetails.name,
        date: appointmentDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
        reason: reason
      };
  
      const response = await fetch('http://example.com/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }
  
      enqueueSnackbar('Appointment scheduled successfully', { variant: 'success' });
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting appointment:', error.message);
      enqueueSnackbar('Failed to schedule appointment', { variant: 'error' });
    }
  };
  

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Heading text= "Appointments"></Heading>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search Appointments"
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
          <Typography variant="h6">Todays Appointments</Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
            Create Appointment
          </Button>
        </Box>
        {filteredAppointments.length ? (
          <AppointmentTable appointments={filteredAppointments} />
        ) : (
          <Typography>No appointments scheduled for today! Have a great day!!!</Typography>
        )}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: '600px', p: 4, bgcolor: 'background.paper', m: '50px auto', borderRadius: 2, boxShadow: 24, overflowY: 'auto', maxHeight: '80vh' }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Create Appointment</Typography>
              <Button variant="contained" color="primary" onClick={handleAppointmentSubmit} startIcon={<EventAvailable />}>
                Confirm Appointment
              </Button>
            </Box>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Patient ID"
                  variant="outlined"
                  name="id"
                  value={patientDetails.id}
                  onChange={handlePatientChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Patient Name"
                  variant="outlined"
                  name="name"
                  value={patientDetails.name}
                  onChange={handlePatientChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              label="Contact"
              variant="outlined"
              name="contact"
              value={patientDetails.contact}
              fullWidth
              disabled
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={doctorDetails.department}
                    onChange={handleDoctorChange}
                    label="Department"
                  >
                    {Array.from(new Set(doctors.map(doc => doc.department))).map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Doctor</InputLabel>
                  <Select
                    name="id"
                    value={doctorDetails.id}
                    onChange={handleDoctorChange}
                    label="Doctor"
                  >
                    {doctors
                      .filter(doc => doc.department === doctorDetails.department)
                      .map(doc => (
                        <MenuItem key={doc.id} value={doc.id}>{doc.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
              <DateCalendar
                value={appointmentDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
            {selectedSlots.length > 0 && (
              <Box>
                <Typography variant="h6">Available Slots:</Typography>
                {selectedSlots.map(slot => (
                  <Typography key={slot.time}>
                    {slot.time} - {slot.status}
                  </Typography>
                ))}
              </Box>
            )}
            <TextField
              label="Reason for Appointment"
              variant="outlined"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
            />
          </Stack>
        </Box>
      </Modal>
    </Layout>
  );
};

export default AppointmentScheduling;
