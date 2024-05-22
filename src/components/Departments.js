import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import DepartmentTable from './DepartmentTable';
import { useDataContext } from '../context/DataContext';

const Departments = () => {
  const { departments } = useDataContext();

  return (
    <Box sx={{ marginTop: 3 }}>
      <DepartmentTable departments={departments} />
    </Box>
  );
};

export default Departments;
