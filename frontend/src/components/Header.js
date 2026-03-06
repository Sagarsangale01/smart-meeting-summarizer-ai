import React from 'react';
import { Box, Typography, Chip, Avatar, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HistoryIcon from '@mui/icons-material/History';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardOutlinedIcon sx={{ fontSize: '13px !important' }} /> },
  { label: 'History', icon: <HistoryIcon sx={{ fontSize: '13px !important' }} /> },
  { label: 'Templates', icon: <GridViewOutlinedIcon sx={{ fontSize: '13px !important' }} /> },
];

function Header({ activeNav = 'Dashboard', onHistoryOpen, onTemplatesOpen }) {

  const handleNavClick = (label) => {
    if (label === 'History') onHistoryOpen?.();
    if (label === 'Templates') onTemplatesOpen?.();
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 1.5,
        backdropFilter: 'blur(20px)',
        background: 'rgba(8, 11, 20, 0.88)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* ── Logo + Brand ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}
        >
          <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
            MeetingMind
          </Typography>
          <Typography sx={{ color: '#6366f1', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.5px' }}>
            AI-Powered Summariser for Entrata
          </Typography>
        </Box>
      </Box>

      {/* ── Center Nav ── */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
        {NAV_ITEMS.map(({ label, icon }) => {
          const isActive = activeNav === label;
          return (
            <Chip
              key={label}
              icon={icon}
              label={label}
              size="small"
              onClick={() => handleNavClick(label)}
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                px: 1,
                color: isActive ? '#6366f1' : '#64748b',
                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(99,102,241,0.35)' : '1px solid transparent',
                '& .MuiChip-icon': {
                  color: isActive ? '#6366f1' : '#64748b',
                  transition: 'color 0.2s',
                },
                '&:hover': {
                  background: 'rgba(99,102,241,0.1)',
                  color: '#6366f1',
                  border: '1px solid rgba(99,102,241,0.3)',
                  '& .MuiChip-icon': { color: '#6366f1' },
                },
                transition: 'all 0.2s ease',
              }}
            />
          );
        })}
      </Box>

      {/* ── Right side ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Tooltip title="Sagar Sangale">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', lg: 'block' } }}>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>
                Sagar Sangale
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', color: '#64748b', mt: 0.3 }}>
                Technical Candidate
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 32, height: 32, fontSize: '0.75rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                cursor: 'pointer',
                '&:hover': { boxShadow: '0 0 0 2px rgba(99,102,241,0.5)' },
                transition: 'box-shadow 0.2s',
              }}
            >
              S
            </Avatar>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Header;
