import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { 
  HomeOutlined, Home, 
  EventNoteOutlined, EventNote, 
  PersonOutline, Person, 
  PeopleOutline, People, 
  BarChartOutlined, BarChart,
  SettingsOutlined, Settings, 
  HelpOutline, Help, 
  ExitToAppOutlined, ExitToApp
} from '@mui/icons-material';
import { styled } from '@mui/system';
import ConfirmationDialog from './ConfirmationDialog';

const SidebarContainer = styled('div')({
  height: '100vh',
  width: '16rem',
  backgroundColor: '#FFFFFF',
  padding: '1rem',
  paddingTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  fontFamily: 'Inter, sans-serif',
  color: '#343A40',
  position: 'fixed',
  overflowY: 'auto',
});

const SidebarItem = styled(ListItem)(({ selected }) => ({
  backgroundColor: selected ? '#000000 !important' : 'transparent',
  borderRadius: '0.5rem',
  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    color: selected ? '#FFFFFF !important' : '#343A40',
  },
}));

const Sidebar = () => {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState(router.pathname);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedPath(router.pathname);
  }, [router.pathname]);

  const handleNavigation = (path) => {
    router.push(path);
    setSelectedPath(path);
  };

  const getIcon = (path, outlinedIcon, filledIcon) => {
    return selectedPath === path ? filledIcon : outlinedIcon;
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    router.push('/LoginPage');
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <SidebarContainer>
      <div className="text-center">
        <Typography variant="h6" style={{ color: '#007BFF', marginBottom: '1rem' }}> {/* Primary color for text */}
          Hospital Management System
        </Typography>
      </div>
      <List>
        <SidebarItem button selected={selectedPath === '/Dashboard'} onClick={() => handleNavigation('/Dashboard')}>
          <ListItemIcon>
            {getIcon('/Dashboard', <HomeOutlined />, <Home />)}
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/AppointmentScheduling'} onClick={() => handleNavigation('/AppointmentScheduling')}>
          <ListItemIcon>
            {getIcon('/AppointmentScheduling', <EventNoteOutlined />, <EventNote />)}
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/Patient'} onClick={() => handleNavigation('/Patient')}>
          <ListItemIcon>
            {getIcon('/Patients', <PersonOutline />, <Person />)}
          </ListItemIcon>
          <ListItemText primary="Patients" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/Staff'} onClick={() => handleNavigation('/Staff')}>
          <ListItemIcon>
            {getIcon('/Staff', <PeopleOutline />, <People />)}
          </ListItemIcon>
          <ListItemText primary="Staff" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/analytics'} onClick={() => handleNavigation('/analytics')}>
          <ListItemIcon>
            {getIcon('/analytics', <BarChartOutlined />, <BarChart />)}
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </SidebarItem>
      </List>
      <Divider />
      <List>
        <SidebarItem button selected={selectedPath === '/settings'} onClick={() => handleNavigation('/settings')}>
          <ListItemIcon>
            {getIcon('/settings', <SettingsOutlined />, <Settings />)}
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/help'} onClick={() => handleNavigation('/help')}>
          <ListItemIcon>
            {getIcon('/help', <HelpOutline />, <Help />)}
          </ListItemIcon>
          <ListItemText primary="Help" />
        </SidebarItem>
        <SidebarItem button selected={selectedPath === '/logout'} onClick={handleLogoutClick}>
          <ListItemIcon>
            {getIcon('/logout', <ExitToAppOutlined />, <ExitToApp />)}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </SidebarItem>
      </List>
      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={handleLogoutClose}
        onConfirm={handleLogoutConfirm}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
