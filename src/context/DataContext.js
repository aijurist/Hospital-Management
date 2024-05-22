// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch('http://192.168.1.6:5000/departments/getDetails');
      const data = await res.json();
      setDepartments(data);
    };

    // Fetch patients data
    const fetchPatients = async () => {
      const res = await fetch('http://192.168.1.6:5000/patients/getDetails');
      const data = await res.json();
      setPatients(data);
    };

    // Fetch staff data
    const fetchStaff = async () => {
      const res = await fetch('http://192.168.1.6:5000/staff/getDetails');
      const data = await res.json();
      setStaff(data);
    };

    // Fetch Doctor data
    const fetchDoctors = async () => {
      const res = await fetch('http://192.168.1.6:5000/staff/doctors');
      const data = await res.json();
      setDoctors(data);
    };

    fetchDepartments();
    fetchPatients();
    fetchStaff();
    fetchDoctors();
  }, []);

  return (
    <DataContext.Provider value={{ departments, patients, staff, doctors }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return React.useContext(DataContext);
};
