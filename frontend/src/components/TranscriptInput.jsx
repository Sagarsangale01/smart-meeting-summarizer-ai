import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Chip, CircularProgress,
  Tooltip, IconButton, Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const SAMPLE_TRANSCRIPTS = [
  {
    label: 'Product Sprint',
    text: `[09:00] Sarah (PM): Good morning everyone. Today's sprint review — let's cover the Q3 roadmap.
[09:02] Mark (Dev): The authentication module is 90% done, final testing by Friday.
[09:05] Lisa (Design): Redesigning the dashboard — new mockups ready for review.
[09:10] Sarah: We'll push the launch date to Aug 15 to allow more testing time.
[09:15] Mark: Action: Complete auth module testing by July 28. Owner: Mark.
[09:18] Lisa: Action: Share dashboard mockups with the team by July 25. Owner: Lisa.
[09:20] Sarah: Budget approved for cloud infra upgrade. Final call — we're going with AWS.
[09:25] Tom (QA): I'll set up automated regression tests. Deadline: Aug 1. Owner: Tom.`,
  },
  {
    label: 'Client Kickoff',
    text: `[10:00] Alex (Client): Thanks for joining. We want a mobile-first e-commerce platform.
[10:05] Maria (Lead): Understood. We'll prioritize iOS and Android from day one.
[10:10] Alex: Timeline — we need an MVP in 3 months.
[10:15] Maria: Feasible if scope is fixed. Action: Finalize feature list by next Monday. Owner: Alex.
[10:20] Alex: Budget is $150K for MVP. Agreed decision: No custom CMS, use Shopify backend.
[10:30] Maria: Action: Send technical proposal by Thursday. Owner: Maria.
[10:35] Alex: We'll do weekly check-ins every Tuesday at 10am.`,
  },
];

function TranscriptInput({ transcript, setTranscript, onGenerate, isLoading }) {
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setTranscript(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleClear = () => {
    setTranscript('');
    setCharCount(0);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTranscript(text);
      setCharCount(text.length);
    } catch {
      // fallback — browser paste restrictions
    }
  };

  const loadSample = (sample) => {
    setTranscript(sample.text);
    setCharCount(sample.text.length);
  };

  return (
    <Box
      sx={{
        background: 'rgba(17, 24, 39, 0.8)',
        border: isFocused
          ? '1.5px solid rgba(99,102,241,0.6)'
          : '1.5px solid rgba(255,255,255,0.07)',
        borderRadius: 'var(--radius-xl)',
        p: { xs: 2.5, md: 4 },
        backdropFilter: 'blur(20px)',
        boxShadow: isFocused
          ? '0 0 40px rgba(99,102,241,0.12), 0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 17, color: '#6366f1' }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9' }}>
              Meeting Transcript
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#64748b' }}>
              Paste your transcript or use a sample below
            </Typography>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Paste from clipboard">
            <IconButton
              size="small"
              onClick={handlePaste}
              sx={{
                color: '#94a3b8',
                '&:hover': { color: '#6366f1', background: 'rgba(99,102,241,0.1)' },
              }}
            >
              <ContentPasteIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear">
            <IconButton
              size="small"
              onClick={handleClear}
              sx={{
                color: '#94a3b8',
                '&:hover': { color: '#f43f5e', background: 'rgba(244,63,94,0.1)' },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Sample Transcript Quick-Load */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LightbulbOutlinedIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
          <Typography sx={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
            Try a sample:
          </Typography>
        </Box>
        {SAMPLE_TRANSCRIPTS.map((s) => (
          <Chip
            key={s.label}
            label={s.label}
            size="small"
            onClick={() => loadSample(s)}
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#94a3b8',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(99,102,241,0.12)',
                color: '#6366f1',
                borderColor: 'rgba(99,102,241,0.4)',
              },
              transition: 'all 0.2s',
            }}
          />
        ))}
      </Box>

      {/* Textarea */}
      <TextField
        multiline
        rows={10}
        fullWidth
        value={transcript}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={`Paste your meeting transcript here...\n\nExample:\n[09:00] John: Let's review the Q3 roadmap...\n[09:05] Sarah: I'll complete the auth module by Friday...`}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontFamily: "'Plus Jakarta Sans', monospace",
            color: '#e2e8f0',
            lineHeight: 1.7,
            '& fieldset': { border: '1px solid rgba(255,255,255,0.08)' },
            '&:hover fieldset': { border: '1px solid rgba(99,102,241,0.3)' },
            '&.Mui-focused fieldset': { border: '1px solid rgba(99,102,241,0.5)' },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#475569',
            opacity: 1,
            lineHeight: 1.7,
          },
        }}
      />

      {/* Char count */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5, mb: 2 }}>
        <Typography sx={{ fontSize: '0.68rem', color: '#475569' }}>
          {charCount.toLocaleString()} characters
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2.5 }} />

      {/* Generate Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography sx={{ fontSize: '0.75rem', color: '#475569', maxWidth: 380 }}>
          AI will identify main topics, key decisions, and action items with owners & deadlines.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={onGenerate}
          disabled={isLoading || !transcript.trim()}
          startIcon={
            isLoading
              ? <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.7)' }} />
              : <AutoAwesomeIcon sx={{ fontSize: 18 }} />
          }
          sx={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.875rem',
            px: 3.5,
            py: 1.2,
            borderRadius: '10px',
            letterSpacing: '0.3px',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f51d9, #7c3aed)',
              boxShadow: '0 6px 28px rgba(99,102,241,0.55)',
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              background: 'rgba(99,102,241,0.3)',
              color: 'rgba(255,255,255,0.4)',
              boxShadow: 'none',
            },
            transition: 'all 0.25s ease',
          }}
        >
          {isLoading ? 'Analyzing...' : 'Generate Summary'}
        </Button>
      </Box>
    </Box>
  );
}

export default TranscriptInput;
