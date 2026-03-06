import React, { useState, useEffect } from 'react';
import {
    Drawer, Box, Typography, IconButton, Divider,
    Tooltip, Chip, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { fetchHistory, deleteHistory } from '../services/api';

const STORAGE_KEY = 'meetingMind_history';

export function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

export function saveToHistory(transcript, summary) {
    const history = loadHistory();
    const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        title: autoTitle(transcript),
        transcript,
        summary,
    };
    // Keep newest first, cap at 20 entries
    const updated = [entry, ...history].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

function autoTitle(transcript) {
    // Grab first meaningful line as title
    const firstLine = transcript.split('\n').find((l) => l.trim().length > 10);
    if (!firstLine) return 'Untitled Meeting';
    const clean = firstLine.replace(/^\[.*?\]\s*/, '').replace(/^[^:]+:\s*/, '').trim();
    return clean.length > 50 ? clean.slice(0, 47) + '…' : clean || 'Untitled Meeting';
}

function formatRelativeDate(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function HistoryItem({ entry, onLoad, onDelete }) {
    const [hovered, setHovered] = useState(false);
    const { summary } = entry;
    const topicsCount = summary?.topics?.length || 0;
    const decisionsCount = summary?.decisions?.length || 0;
    const actionsCount = summary?.action_items?.length || 0;

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                p: 1.5,
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: hovered ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
                borderColor: hovered ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                mb: 1,
            }}
            onClick={() => onLoad(entry)}
        >
            {/* Title row */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                <Typography
                    sx={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: hovered ? '#e2e8f0' : '#94a3b8',
                        lineHeight: 1.4,
                        flexGrow: 1,
                        transition: 'color 0.2s',
                    }}
                >
                    {entry.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.3, flexShrink: 0 }}>
                    <Tooltip title="Load this meeting">
                        <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); onLoad(entry); }}
                            sx={{ p: 0.3, color: '#475569', '&:hover': { color: '#6366f1' } }}
                        >
                            <RestoreIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                            sx={{ p: 0.3, color: '#475569', '&:hover': { color: '#f43f5e' } }}
                        >
                            <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Date */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, mb: 1 }}>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 11, color: '#475569' }} />
                <Typography sx={{ fontSize: '0.65rem', color: '#475569' }}>
                    {formatRelativeDate(entry.date)}
                </Typography>
            </Box>

            {/* Stats chips */}
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip
                    icon={<ForumOutlinedIcon sx={{ fontSize: '10px !important', color: '#6366f1 !important' }} />}
                    label={`${topicsCount} topics`}
                    size="small"
                    sx={{ fontSize: '0.6rem', height: 18, color: '#6366f1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                />
                <Chip
                    icon={<LightbulbOutlinedIcon sx={{ fontSize: '10px !important', color: '#f59e0b !important' }} />}
                    label={`${decisionsCount} decisions`}
                    size="small"
                    sx={{ fontSize: '0.6rem', height: 18, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
                />
                <Chip
                    icon={<AssignmentTurnedInOutlinedIcon sx={{ fontSize: '10px !important', color: '#10b981 !important' }} />}
                    label={`${actionsCount} actions`}
                    size="small"
                    sx={{ fontSize: '0.6rem', height: 18, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                />
                {entry.isServer && (
                    <Chip
                        icon={<AutoAwesomeIcon sx={{ fontSize: '10px !important', color: '#8b5cf6 !important' }} />}
                        label="RAG Store"
                        size="small"
                        sx={{ fontSize: '0.6rem', height: 18, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                    />
                )}
            </Box>
        </Box>
    );
}

function HistoryPanel({ open, onClose, onLoadMeeting }) {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCombinedHistory = async () => {
        setIsLoading(true);
        try {
            // 1. Get local history
            const local = loadHistory();

            // 2. Get backend (RAG) history
            let serverData = [];
            try {
                const res = await fetchHistory();
                serverData = res.data.map(item => ({
                    ...item,
                    isServer: true,
                    title: item.title || autoTitle(item.transcript)
                }));
            } catch (e) {
                console.error("Backend history unreachable", e);
            }

            // 3. Merged (Prefer server data for same ID if existed, though unlikely)
            const combined = [...serverData, ...local].sort((a, b) => new Date(b.date) - new Date(a.date));
            setHistory(combined);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) loadCombinedHistory();
    }, [open]);

    const handleDelete = (id) => {
        const updated = history.filter((h) => h.id !== id);
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleClearAll = async () => {
        // Clear local
        localStorage.removeItem(STORAGE_KEY);
        // Clear server
        try {
            await deleteHistory();
        } catch (e) {
            console.error("Failed to clear server history");
        }
        setHistory([]);
    };

    const handleLoad = (entry) => {
        onLoadMeeting(entry);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '90vw', sm: 360 },
                    background: '#0d1120',
                    borderLeft: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {/* Header */}
            <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <HistoryIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>Meeting History</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#475569' }}>{history.length} saved sessions</Typography>
                    </Box>
                </Box>
                <IconButton size="small" onClick={onClose} sx={{ color: '#475569', '&:hover': { color: '#f1f5f9' } }}>
                    <CloseIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 2 }}>
                {history.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', gap: 1.5 }}>
                        <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <HistoryIcon sx={{ fontSize: 24, color: '#334155' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.82rem', color: '#475569', textAlign: 'center' }}>
                            No history yet.<br />Generate a summary to save it here.
                        </Typography>
                    </Box>
                ) : (
                    history.map((entry) => (
                        <HistoryItem
                            key={entry.id}
                            entry={entry}
                            onLoad={handleLoad}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </Box>

            {/* Footer */}
            {history.length > 0 && (
                <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                    <Button
                        fullWidth
                        size="small"
                        startIcon={<DeleteSweepIcon sx={{ fontSize: 16 }} />}
                        onClick={handleClearAll}
                        sx={{
                            fontSize: '0.75rem', fontWeight: 600, color: '#f43f5e',
                            background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)',
                            borderRadius: '8px', py: 0.8,
                            '&:hover': { background: 'rgba(244,63,94,0.12)' },
                        }}
                    >
                        Clear All History
                    </Button>
                </Box>
            )}
        </Drawer>
    );
}

export default HistoryPanel;
