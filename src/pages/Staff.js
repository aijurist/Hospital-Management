import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, InputAdornment, IconButton, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper
} from '@mui/material';
import { SearchOutlined, Add, Info } from '@mui/icons-material';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import NewStaffModal from '../components/NewStaffModal';
import StaffDetailsModal from '../components/StaffDetailsModal';
import { useDataContext } from '../context/DataContext';

const Staff = () => {
  const { staff } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaff, setFilteredStaff] = useState(staff);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffDetails, setNewStaffDetails] = useState({ name: '', position: '', department: '', contact: '', email: '', address: '', gender: '', experience: '', shift: '', assignedDoctor: '' });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  useEffect(() => {
    const filterStaff = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = staff.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerCaseQuery) ||
          s.id.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredStaff(filtered);
    };

    filterStaff();
  }, [searchQuery, staff]);

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

  const handleOpenDetailModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedStaff(null);
  };

  const resetForm = () => {
    setNewStaffDetails({ name: '', position: '', department: '', contact: '', email: '', address: '', gender: '', experience: '', shift: '', assignedDoctor: '' });
  };

  const handleNewStaffChange = (e) => {
    const { name, value } = e.target;
    setNewStaffDetails({ ...newStaffDetails, [name]: value });
  };

  const handleNewStaffSubmit = () => {
    // Logic to save the new staff details
    console.log('New Staff Details:', newStaffDetails);
    handleCloseModal();
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortComparator = (a, b, orderBy) => {
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedStaff = filteredStaff.sort((a, b) => {
    return order === 'asc' ? sortComparator(a, b, orderBy) : sortComparator(b, a, orderBy);
  });

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, ml: '16rem', overflowY: 'auto', p: 3 }}>
        <Heading text="Staff Management" />
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search Staff"
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
          <Typography variant="h6">Staff List</Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenModal}>
            Add New Staff
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'id' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={() => handleRequestSort('id')}
                  >
                    Staff ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'position' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'position'}
                    direction={orderBy === 'position' ? order : 'asc'}
                    onClick={() => handleRequestSort('position')}
                  >
                    Position
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'department' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'department'}
                    direction={orderBy === 'department' ? order : 'asc'}
                    onClick={() => handleRequestSort('department')}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStaff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>{staffMember.id}</TableCell>
                  <TableCell>{staffMember.name}</TableCell>
                  <TableCell>{staffMember.position}</TableCell>
                  <TableCell>{staffMember.department}</TableCell>
                  <TableCell>{staffMember.contact}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<Info />} onClick={() => handleOpenDetailModal(staffMember)}>
                      Show More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <NewStaffModal
        open={openModal}
        onClose={handleCloseModal}
        newStaffDetails={newStaffDetails}
        onChange={handleNewStaffChange}
        onSubmit={handleNewStaffSubmit}
      />

      <StaffDetailsModal
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        selectedStaff={selectedStaff}
      />
    </Layout>
  );
};

export default Staff;
