import React, { useState } from 'react';
import {
  Box, Typography, Button, Chip, Divider,
  CircularProgress, IconButton, Tooltip, Collapse,
  TextField,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const CARD_CONFIG = {
  'Main Topics': {
    icon: ForumOutlinedIcon,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glow: 'rgba(99,102,241,0.25)',
    borderColor: 'rgba(99,102,241,0.3)',
    bgColor: 'rgba(99,102,241,0.07)',
    chipColor: '#6366f1',
    chipBg: 'rgba(99,102,241,0.12)',
    bulletColor: '#6366f1',
    focusBorder: 'rgba(99,102,241,0.6)',
  },
  'Key Decisions': {
    icon: LightbulbOutlinedIcon,
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: 'rgba(245,158,11,0.25)',
    borderColor: 'rgba(245,158,11,0.3)',
    bgColor: 'rgba(245,158,11,0.07)',
    chipColor: '#f59e0b',
    chipBg: 'rgba(245,158,11,0.12)',
    bulletColor: '#f59e0b',
    focusBorder: 'rgba(245,158,11,0.6)',
  },
  'Action Items': {
    icon: AssignmentTurnedInOutlinedIcon,
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16,185,129,0.25)',
    borderColor: 'rgba(16,185,129,0.3)',
    bgColor: 'rgba(16,185,129,0.07)',
    chipColor: '#10b981',
    chipBg: 'rgba(16,185,129,0.12)',
    bulletColor: '#10b981',
    focusBorder: 'rgba(16,185,129,0.6)',
  },
};

function SummaryCard({ title, items = [], onRegenerate, isRegenerating, onItemsChange }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const config = CARD_CONFIG[title] || CARD_CONFIG['Main Topics'];
  const IconComponent = config.icon;

  /* ── Copy ── */
  const handleCopy = () => {
    navigator.clipboard.writeText(items.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  /* ── Edit ── */
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(items[index]);
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    const updated = [...items];
    updated[editingIndex] = editValue.trim();
    onItemsChange?.(updated);
    setEditingIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  /* ── Delete ── */
  const deleteItem = (index) => {
    onItemsChange?.(items.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  /* ── Add ── */
  const startAdd = () => {
    setIsAdding(true);
    setNewItemValue('');
    setEditingIndex(null);
  };

  const saveAdd = () => {
    if (!newItemValue.trim()) { setIsAdding(false); return; }
    onItemsChange?.([...items, newItemValue.trim()]);
    setNewItemValue('');
    setIsAdding(false);
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewItemValue('');
  };

  const handleKeyDown = (e, saveFn, cancelFn) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveFn(); }
    if (e.key === 'Escape') cancelFn();
  };

  return (
    <Box
      sx={{
        background: 'rgba(17, 24, 39, 0.9)',
        border: `1.5px solid ${config.borderColor}`,
        borderRadius: '16px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
        transition: 'all 0.3s ease',
        animation: 'fadeInUp 0.5s ease both',
        '&:hover': {
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 20px ${config.glow}`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Gradient accent bar */}
      <Box sx={{ height: 3, background: config.gradient, flexShrink: 0 }} />

      {/* ── Card Header ── */}
      <Box
        sx={{
          px: 2.5, py: 2,
          background: config.bgColor,
          borderBottom: `1px solid ${config.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: '9px',
              background: config.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${config.glow}`, flexShrink: 0,
            }}
          >
            <IconComponent sx={{ fontSize: 18, color: '#fff' }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9', letterSpacing: '-0.2px' }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#64748b' }}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={copied ? 'Copied!' : 'Copy all'}>
            <IconButton size="small" onClick={handleCopy}
              sx={{ color: copied ? config.chipColor : '#475569', '&:hover': { color: config.chipColor, background: config.chipBg }, transition: 'all 0.2s' }}
            >
              {copied
                ? <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                : <ContentCopyIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
            <IconButton size="small" onClick={() => setExpanded(!expanded)}
              sx={{ color: '#475569', '&:hover': { color: '#94a3b8', background: 'rgba(255,255,255,0.05)' } }}
            >
              {expanded ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Card Body ── */}
      <Collapse in={expanded}>
        <Box sx={{ px: 2.5, py: 2, flexGrow: 1 }}>
          {isRegenerating ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 1.5 }}>
              <CircularProgress size={28} sx={{ color: config.chipColor }} />
              <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>Regenerating section…</Typography>
            </Box>
          ) : items.length > 0 || isAdding ? (
            <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0, display: 'flex', flexDirection: 'column', gap: 0.6 }}>

              {items.map((item, index) => (
                <Box
                  key={index}
                  component="li"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    borderRadius: '8px',
                    border: editingIndex === index
                      ? `1px solid ${config.focusBorder}`
                      : '1px solid rgba(255,255,255,0.04)',
                    background: editingIndex === index ? config.bgColor : 'rgba(255,255,255,0.025)',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': editingIndex !== index ? { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' } : {},
                    animation: 'fadeInUp 0.4s ease both',
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {editingIndex === index ? (
                    /* ── Edit Mode ── */
                    <Box sx={{ p: 1 }}>
                      <TextField
                        autoFocus
                        multiline
                        fullWidth
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, saveEdit, cancelEdit)}
                        variant="standard"
                        sx={{
                          '& .MuiInputBase-root': { fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6 },
                          '& .MuiInput-underline:before': { borderColor: 'transparent' },
                          '& .MuiInput-underline:after': { borderColor: config.chipColor },
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.8, justifyContent: 'flex-end' }}>
                        <Button size="small" onClick={cancelEdit}
                          sx={{ fontSize: '0.68rem', color: '#64748b', minWidth: 'unset', px: 1, py: 0.3, borderRadius: '5px', '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
                          Cancel
                        </Button>
                        <Button size="small" onClick={saveEdit}
                          sx={{ fontSize: '0.68rem', color: '#fff', fontWeight: 600, minWidth: 'unset', px: 1.5, py: 0.3, borderRadius: '5px', background: config.gradient, '&:hover': { opacity: 0.85 } }}>
                          Save
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    /* ── View Mode ── */
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 1.2, py: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: config.bulletColor, mt: 0.75, flexShrink: 0, boxShadow: `0 0 6px ${config.glow}` }} />
                      <Typography sx={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, flexGrow: 1 }}>
                        {item}
                      </Typography>
                      {/* Action icons — visible on hover */}
                      <Box
                        sx={{
                          display: 'flex', gap: 0.2, flexShrink: 0,
                          opacity: hoveredIndex === index ? 1 : 0,
                          transition: 'opacity 0.15s',
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => startEdit(index)}
                            sx={{ p: 0.3, color: '#64748b', '&:hover': { color: config.chipColor } }}>
                            <EditOutlinedIcon sx={{ fontSize: 13 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => deleteItem(index)}
                            sx={{ p: 0.3, color: '#64748b', '&:hover': { color: '#f43f5e' } }}>
                            <DeleteOutlineIcon sx={{ fontSize: 13 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}

              {/* ── Add new item inline ── */}
              {isAdding ? (
                <Box
                  sx={{
                    borderRadius: '8px',
                    border: `1px solid ${config.focusBorder}`,
                    background: config.bgColor,
                    p: 1,
                  }}
                >
                  <TextField
                    autoFocus
                    multiline
                    fullWidth
                    size="small"
                    placeholder="Type new item and press Enter…"
                    value={newItemValue}
                    onChange={(e) => setNewItemValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, saveAdd, cancelAdd)}
                    variant="standard"
                    sx={{
                      '& .MuiInputBase-root': { fontSize: '0.82rem', color: '#e2e8f0' },
                      '& .MuiInput-underline:before': { borderColor: 'transparent' },
                      '& .MuiInput-underline:after': { borderColor: config.chipColor },
                      '& ::placeholder': { color: '#475569', opacity: 1 },
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.8, justifyContent: 'flex-end' }}>
                    <Button size="small" onClick={cancelAdd}
                      sx={{ fontSize: '0.68rem', color: '#64748b', minWidth: 'unset', px: 1, py: 0.3, borderRadius: '5px', '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
                      Cancel
                    </Button>
                    <Button size="small" onClick={saveAdd}
                      sx={{ fontSize: '0.68rem', color: '#fff', fontWeight: 600, minWidth: 'unset', px: 1.5, py: 0.3, borderRadius: '5px', background: config.gradient, '&:hover': { opacity: 0.85 } }}>
                      Add
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  onClick={startAdd}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.8, px: 1.2, py: 0.8,
                    borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.08)',
                    cursor: 'pointer', color: '#475569',
                    '&:hover': { background: config.bgColor, borderColor: config.borderColor, color: config.chipColor },
                    transition: 'all 0.2s',
                  }}
                >
                  <AddIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>Add item</Typography>
                </Box>
              )}
            </Box>
          ) : (
            /* ── Empty state ── */
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 1 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconComponent sx={{ fontSize: 20, color: '#334155' }} />
              </Box>
              <Typography sx={{ fontSize: '0.78rem', color: '#475569' }}>No data available</Typography>
              <Button size="small" onClick={startAdd}
                sx={{ fontSize: '0.72rem', color: config.chipColor, background: config.chipBg, border: `1px solid ${config.borderColor}`, borderRadius: '7px', px: 1.5, mt: 0.5, '&:hover': { opacity: 0.85 } }}>
                + Add item manually
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>

      {/* ── Card Footer ── */}
      <Box sx={{ px: 2.5, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', flexShrink: 0 }}>
        <Chip label={`${items.length} items`} size="small"
          sx={{ fontSize: '0.65rem', fontWeight: 600, color: config.chipColor, background: config.chipBg, border: `1px solid ${config.borderColor}`, height: 22 }} />
        <Button
          size="small"
          startIcon={
            isRegenerating
              ? <CircularProgress size={12} sx={{ color: config.chipColor }} />
              : <AutorenewIcon sx={{ fontSize: '14px !important' }} />
          }
          onClick={onRegenerate}
          disabled={isRegenerating}
          sx={{
            fontSize: '0.72rem', fontWeight: 600,
            color: config.chipColor, background: config.chipBg,
            border: `1px solid ${config.borderColor}`, borderRadius: '7px',
            px: 1.5, py: 0.4, minHeight: 'unset',
            '&:hover': { background: config.bgColor, boxShadow: `0 0 12px ${config.glow}` },
            '&:disabled': { opacity: 0.5 },
            transition: 'all 0.2s',
          }}
        >
          Regenerate
        </Button>
      </Box>
    </Box>
  );
}

export default SummaryCard;
