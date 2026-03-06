import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Chip, Fade, LinearProgress, Button, Tooltip } from '@mui/material';
import TranscriptInput from '../components/TranscriptInput';
import SummaryCard from '../components/SummaryCard';
import Header from '../components/Header';
import HistoryPanel, { saveToHistory } from '../components/HistoryPanel';
import TemplatesPanel from '../components/TemplatesPanel';
import ExportMenu from '../components/ExportMenu';
import { generateSummary, regenerateSection } from '../services/api';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HistoryIcon from '@mui/icons-material/History';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, glow }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        minWidth: 110,
        '&:hover': { background: 'rgba(255,255,255,0.05)', borderColor: color },
        transition: 'all 0.2s',
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '8px',
          flexShrink: 0,
          background: `rgba(${glow}, 0.12)`,
          border: `1px solid rgba(${glow}, 0.25)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.65rem', color: '#475569', fontWeight: 500 }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.875rem', color, fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Box>
  );
}

// ─── Ambient Orbs ─────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <>
      {[
        { top: '10%', left: '5%', color: 'rgba(99,102,241,0.08)', size: 400, dur: '8s' },
        { bottom: '15%', right: '8%', color: 'rgba(139,92,246,0.08)', size: 320, dur: '10s', rev: true },
        { top: '55%', left: '45%', color: 'rgba(16,185,129,0.05)', size: 250, dur: '12s' },
      ].map((orb, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: 'fixed',
            top: orb.top,
            left: orb.left,
            bottom: orb.bottom,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            pointerEvents: 'none',
            animation: `orb-float ${orb.dur} ease-in-out infinite ${orb.rev ? 'reverse' : ''}`,
          }}
        />
      ))}
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingSections, setRegenerating] = useState({});
  const [processingTime, setProcessingTime] = useState(null);
  const [error, setError] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  // ── Generate summary ──
  const handleGenerate = async () => {
    if (!transcript.trim()) return;
    setIsLoading(true);
    setError(null);
    const t0 = Date.now();
    try {
      const res = await generateSummary(transcript);
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
      setSummary(data);
      setProcessingTime(((Date.now() - t0) / 1000).toFixed(1));
      saveToHistory(transcript, data); // persist to localStorage
    } catch (err) {
      setError('Failed to generate summary. Please check that the backend server is running on port 5000.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Regenerate single section ──
  const handleRegenerate = async (section, key) => {
    setRegenerating((p) => ({ ...p, [key]: true }));
    try {
      const res = await regenerateSection(section, transcript);
      setSummary((prev) => ({ ...prev, [key]: res?.data?.data?.[section] }));
    } catch (err) {
      console.error(err);
    } finally {
      setRegenerating((p) => ({ ...p, [key]: false }));
    }
  };

  // ── Inline item edit ──
  const handleItemsChange = (key) => (newItems) => {
    setSummary((prev) => ({ ...prev, [key]: newItems }));
  };

  // ── Load from history ──
  const handleLoadMeeting = (entry) => {
    setTranscript(entry.transcript);
    setSummary(entry.summary);
    setProcessingTime(null);
  };

  // ── Load from template ──
  const handleUseTemplate = (transcriptText) => {
    setTranscript(transcriptText);
    setSummary(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = (summary?.topics?.length || 0) + (summary?.decisions?.length || 0) + (summary?.action_items?.length || 0);

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--bg-deep)', position: 'relative', fontFamily: 'var(--font-primary)' }}>
      <AmbientOrbs />
      <Header onHistoryOpen={() => setHistoryOpen(true)} onTemplatesOpen={() => setTemplatesOpen(true)} />

      {/* Global loading bar */}
      {isLoading && (
        <LinearProgress
          sx={{
            height: 2,
            background: 'rgba(99,102,241,0.1)',
            '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)' },
          }}
        />
      )}

      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: { xs: 3, md: 5 }, position: 'relative', zIndex: 1 }}>
        {/* ── Hero ── */}
        <Box sx={{ mb: 5, animation: 'fadeInUp 0.6s ease both' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: '13px !important', color: '#6366f1 !important' }} />}
              label='Powered by AI'
              size='small'
              sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}
            />
          </Box>
          <Typography
            component='h1'
            sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.15, mb: 1 }}
          >
            Smart Meeting{' '}
            <Box
              component='span'
              sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Summarizer
            </Box>
          </Typography>
          <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#64748b', maxWidth: 520, lineHeight: 1.7 }}>
            Paste any meeting transcript and get an instant AI-structured summary — topics, decisions, and action items with owners.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
            {[
              { label: 'Hallucination-safe', icon: '🛡️' },
              { label: 'Inline editing', icon: '✏️' },
              { label: 'Audio-ready architecture', icon: '🎙️' },
              { label: 'Meeting history', icon: '📚' },
            ].map((f) => (
              <Chip
                key={f.label}
                label={`${f.icon}  ${f.label}`}
                size='small'
                sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            ))}
          </Box>
        </Box>

        {/* ── Input ── */}
        <Box sx={{ mb: 4, animation: 'fadeInUp 0.6s ease 0.1s both' }}>
          <TranscriptInput transcript={transcript} setTranscript={setTranscript} onGenerate={handleGenerate} isLoading={isLoading} />
        </Box>

        {/* ── Error ── */}
        {error && (
          <Box sx={{ mb: 3, p: 2, borderRadius: '10px', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)' }}>
            <Typography sx={{ fontSize: '0.82rem', color: '#f43f5e' }}>{error}</Typography>
          </Box>
        )}

        {/* ── Summary Output ── */}
        <Fade in={!!summary} timeout={600}>
          <Box>
            {summary && (
              <>
                {/* Summary toolbar */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography component='h2' sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
                      Meeting Summary
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.3 }}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#475569' }}>AI-extracted · Click any item to edit inline</Typography>
                      {summary.ragUsed && (
                        <Chip
                          icon={<AutoAwesomeIcon sx={{ fontSize: '11px !important', color: '#8b5cf6 !important' }} />}
                          label='Context-Aware (RAG)'
                          size='small'
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#8b5cf6',
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.3)',
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Right-side controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    {/* Stats */}
                    <StatCard
                      icon={<BarChartIcon sx={{ fontSize: 15, color: '#6366f1' }} />}
                      label='Total Items'
                      value={totalItems}
                      color='#6366f1'
                      glow='99,102,241'
                    />
                    {processingTime && (
                      <StatCard
                        icon={<TimerOutlinedIcon sx={{ fontSize: 15, color: '#10b981' }} />}
                        label='Processed in'
                        value={`${processingTime}s`}
                        color='#10b981'
                        glow='16,185,129'
                      />
                    )}

                    {/* History + Export buttons */}
                    <Tooltip title='View meeting history'>
                      <Button
                        size='small'
                        startIcon={<HistoryIcon sx={{ fontSize: '16px !important' }} />}
                        onClick={() => setHistoryOpen(true)}
                        sx={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#94a3b8',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '9px',
                          px: 1.8,
                          py: 0.7,
                          '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#f1f5f9', borderColor: 'rgba(255,255,255,0.2)' },
                          transition: 'all 0.2s',
                        }}
                      >
                        History
                      </Button>
                    </Tooltip>
                    <ExportMenu summary={summary} />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />

                {/* 3-column summary cards */}
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={4} sx={{ animation: 'fadeInUp 0.5s ease 0.05s both' }}>
                    <SummaryCard
                      title='Main Topics'
                      items={summary?.topics || []}
                      onRegenerate={() => handleRegenerate('mainTopics', 'topics')}
                      isRegenerating={!!regeneratingSections['topics']}
                      onItemsChange={handleItemsChange('topics')}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ animation: 'fadeInUp 0.5s ease 0.12s both' }}>
                    <SummaryCard
                      title='Key Decisions'
                      items={summary?.decisions || []}
                      onRegenerate={() => handleRegenerate('keyDecisions', 'decisions')}
                      isRegenerating={!!regeneratingSections['decisions']}
                      onItemsChange={handleItemsChange('decisions')}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ animation: 'fadeInUp 0.5s ease 0.20s both' }}>
                    <SummaryCard
                      title='Action Items'
                      items={
                        Array.isArray(summary?.action_items)
                          ? summary.action_items.map((item) =>
                              typeof item === 'object' ? `${item.task} — ${item.owner || 'Unassigned'} (${item.deadline || 'No deadline'})` : item,
                            )
                          : []
                      }
                      onRegenerate={() => handleRegenerate('actionItems', 'action_items')}
                      isRegenerating={!!regeneratingSections['action_items']}
                      onItemsChange={handleItemsChange('action_items')}
                    />
                  </Grid>
                </Grid>

                {/* Hallucination footer */}
                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: '10px',
                    background: 'rgba(99,102,241,0.05)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                      flexShrink: 0,
                      animation: 'pulse-glow 2s ease-in-out infinite',
                    }}
                  />
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                    <Box component='span' sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Hallucination guard active.
                    </Box>{' '}
                    All output is grounded strictly in your transcript. Use Regenerate to refine individual sections, or edit any item inline directly.
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>

        {/* ── History button (always visible in bottom-right) ── */}
        {!summary && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size='small'
              startIcon={<HistoryIcon sx={{ fontSize: '16px !important' }} />}
              onClick={() => setHistoryOpen(true)}
              sx={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#475569',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '9px',
                px: 2,
                py: 0.8,
                '&:hover': { background: 'rgba(99,102,241,0.08)', color: '#6366f1', borderColor: 'rgba(99,102,241,0.3)' },
                transition: 'all 0.2s',
              }}
            >
              View Past Meetings
            </Button>
          </Box>
        )}
      </Box>

      {/* ── Footer ── */}
      <Box
        component='footer'
        sx={{
          py: 4,
          textAlign: 'center',
          color: '#475569',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(8, 11, 20, 0.6)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', color: '#64748b' }}>AI TECHNICAL TASK</Typography>
        <Typography sx={{ fontSize: '0.85rem', mt: 0.5, color: '#94a3b8' }}>
          Submitted by{' '}
          <Box component='span' sx={{ color: '#6366f1', fontWeight: 700 }}>
            Sagar Sangale
          </Box>
        </Typography>
      </Box>

      {/* ── History Drawer ── */}
      <HistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} onLoadMeeting={handleLoadMeeting} />

      {/* ── Templates Drawer ── */}
      <TemplatesPanel open={templatesOpen} onClose={() => setTemplatesOpen(false)} onUseTemplate={handleUseTemplate} />
    </Box>
  );
}

export default Dashboard;
