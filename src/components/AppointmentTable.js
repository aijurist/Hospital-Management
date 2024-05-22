import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AppointmentTable = ({ appointments }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Doctor</TableCell>
          <TableCell>Slot Time</TableCell>
          <TableCell>Patients</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.map((appointment) =>
          appointment.slots.map((slot, index) => (
            <TableRow key={`${appointment.doctorId}-${index}`}>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{slot.time}</TableCell>
              <TableCell>{slot.patients.join(', ')}</TableCell>
              <TableCell>
                <Typography color={slot.status === 'Booked' ? 'error' : 'primary'}>
                  {slot.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AppointmentTable;
