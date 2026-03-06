import React, { useState } from 'react';
import {
    Drawer, Box, Typography, IconButton, Divider, Chip, Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

const TEMPLATES = [
    {
        id: 'sprint-review',
        label: 'Sprint Review',
        category: 'Engineering',
        icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#6366f1',
        bg: 'rgba(99,102,241,0.1)',
        border: 'rgba(99,102,241,0.3)',
        description: 'End-of-sprint demo and retrospective discussion.',
        transcript: `[09:00] Sarah (PM): Let's start the sprint review. This is Sprint 14, two-week cycle.
[09:02] Mark (Dev): Completed: user authentication module, password reset flow, and session management.
[09:06] Lisa (Design): Dashboard redesign is done — stakeholders approved the new color system.
[09:10] Tom (QA): Found 3 critical bugs in the payment flow. All are now fixed and verified.
[09:14] Sarah: We're pushing the mobile app release to August 15th to allow more QA time.
[09:18] Mark: Action: Write unit tests for auth module. Owner: Mark. Deadline: July 28.
[09:20] Lisa: Action: Finalize design handoff document. Owner: Lisa. Deadline: July 25.
[09:22] Tom: Action: Run full regression suite before release. Owner: Tom. Deadline: Aug 10.
[09:25] Sarah: Key decision — we are switching from REST to GraphQL for the mobile API.
[09:28] Sarah: Budget approved for new CI/CD pipeline. Vendor: GitHub Actions.`,
    },
    {
        id: 'standup',
        label: 'Daily Standup',
        category: 'Engineering',
        icon: <GroupsOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        border: 'rgba(16,185,129,0.3)',
        description: 'Quick daily sync — blockers, progress, plans.',
        transcript: `[09:00] Scrum Master (Priya): Good morning everyone. Let's do quick standups.
[09:01] Dev 1 (Raj): Yesterday: finished the login API endpoint. Today: starting on profile page. Blocker: need design specs from Lisa.
[09:03] Dev 2 (Alex): Yesterday: fixed the database connection timeout bug. Today: writing integration tests. No blockers.
[09:05] Lisa (Design): Yesterday: completed mobile wireframes. Today: presenting to PM. Blocker: need final brand colors from client.
[09:07] QA (Tom): Yesterday: tested checkout flow — found 2 bugs, filed tickets. Today: retesting after fixes. No blockers.
[09:09] Priya: Action: Lisa to share profile page specs with Raj. Deadline: Today EOD.
[09:10] Priya: Action: Client to confirm brand colors. Owner: PM. Deadline: Tomorrow.
[09:11] Decision: We'll skip Friday's standup due to public holiday.`,
    },
    {
        id: 'client-kickoff',
        label: 'Client Kickoff',
        category: 'Business',
        icon: <WorkOutlineIcon sx={{ fontSize: 18 }} />,
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        border: 'rgba(245,158,11,0.3)',
        description: 'Project kickoff with a new client — scope, timeline, budget.',
        transcript: `[10:00] Alex (Client): Thank you for joining. We need a data analytics platform for our logistics operations.
[10:05] Maria (Lead): We understand. Our team has done similar work for three logistics firms.
[10:10] Alex: Our primary need is real-time shipment tracking and delay prediction using AI.
[10:15] Maria: We can deliver an MVP in 12 weeks. Full platform in 6 months.
[10:20] Alex: Budget is capped at $200,000 for Phase 1.
[10:25] Decision: Phase 1 will focus on tracking dashboard and delay alerts only. AI prediction deferred to Phase 2.
[10:30] Maria: Action: Send detailed project proposal with milestones. Owner: Maria. Deadline: Thursday.
[10:35] Alex: Action: Share raw shipment data for analysis. Owner: Alex's data team. Deadline: Next Monday.
[10:40] Decision: Weekly status calls every Wednesday at 11am.
[10:45] Alex: Decision: Project codename will be "Orion".`,
    },
    {
        id: 'product-roadmap',
        label: 'Roadmap Planning',
        category: 'Product',
        icon: <TrendingUpOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        border: 'rgba(139,92,246,0.3)',
        description: 'Quarterly product roadmap and prioritization session.',
        transcript: `[14:00] CPO (Diana): Let's lock in the Q3 roadmap. We have 4 quarters to plan across 3 pillars.
[14:05] PM (James): Pillar 1 — Growth: referral program, new onboarding flow, and pricing page redesign.
[14:10] PM (James): Pillar 2 — Retention: in-app notifications, weekly digest email, and power user dashboard.
[14:15] PM (James): Pillar 3 — Platform: API v2, webhooks, and SOC 2 compliance.
[14:20] Diana: Decision — Referral program is Q3 priority #1. It unlocks partnership deals.
[14:25] Diana: Decision — SOC 2 compliance is non-negotiable. Must be completed by September 30.
[14:30] CTO (Ravi): Action: Engineering to scope API v2 effort. Owner: Ravi. Deadline: July 15.
[14:35] Design Lead (Priya): Action: Start referral program UX research. Owner: Priya. Deadline: July 10.
[14:40] Diana: Decision — We will sunset the legacy mobile app in Q3. Migrate users to web app.
[14:45] James: Action: Draft migration communication plan for customers. Owner: James. Deadline: July 20.`,
    },
    {
        id: 'incident-review',
        label: 'Incident Review',
        category: 'Engineering',
        icon: <BugReportOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#f43f5e',
        bg: 'rgba(244,63,94,0.1)',
        border: 'rgba(244,63,94,0.3)',
        description: 'Post-mortem after a production incident.',
        transcript: `[16:00] Incident Commander (Nate): We're reviewing the outage from July 3rd, 11:45pm to 2:30am.
[16:05] SRE (Wei): Root cause: a database migration script dropped an index on the orders table, causing query timeouts.
[16:10] Dev (Sam): The migration was deployed without a rollback plan and ran during peak traffic hours.
[16:15] QA (Lena): Monitoring alerts fired 8 minutes late due to misconfigured thresholds.
[16:20] Decision: All production migrations must be run during low-traffic windows (2am–5am) going forward.
[16:25] Decision: All migrations require a documented rollback plan reviewed by a senior engineer.
[16:30] Nate: Action: Update deployment runbook with migration guidelines. Owner: Wei. Deadline: July 10.
[16:35] Nate: Action: Fix alert thresholds for DB query latency. Owner: Lena. Deadline: July 8.
[16:40] Nate: Action: Add integration test for index integrity post-migration. Owner: Sam. Deadline: July 12.
[16:45] Decision: We will adopt a canary deployment strategy for all future schema changes.`,
    },
    {
        id: 'sales-review',
        label: 'Sales Review',
        category: 'Business',
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#38bdf8',
        bg: 'rgba(56,189,248,0.1)',
        border: 'rgba(56,189,248,0.3)',
        description: 'Monthly sales pipeline and deal review.',
        transcript: `[11:00] VP Sales (Rachel): Monthly pipeline review. Total pipeline value: $1.2M. Let's walk through top deals.
[11:05] AE (Carlos): Deal 1 — Acme Corp, $80K ARR. In contract negotiation. Close date: July 31.
[11:08] AE (Nina): Deal 2 — TechNova, $120K ARR. Champion identified, awaiting security review sign-off.
[11:12] Rachel: Decision: We'll offer TechNova a 10% discount to accelerate security review approval.
[11:15] AE (Carlos): Deal 3 — Finex Group, $200K ARR. Stalled — budget freeze until Q4.
[11:18] Rachel: Action: Carlos to schedule executive-level call at Finex to unblock deal. Deadline: July 15.
[11:22] Rachel: Action: Nina to send TechNova revised proposal with discount applied. Deadline: Tomorrow.
[11:25] Sales Ops (Joe): Our CRM data quality has dropped — 35% of leads missing industry field.
[11:28] Decision: All new leads must be fully enriched before being added to any active sequence.
[11:30] Rachel: Action: Joe to run CRM data cleanup script and send report. Deadline: July 12.`,
    },
];

const CATEGORIES = ['All', 'Engineering', 'Business', 'Product'];

function TemplateCard({ template, onUse }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                borderRadius: '10px',
                border: `1px solid ${hovered ? template.border : 'rgba(255,255,255,0.06)'}`,
                background: hovered ? template.bg : 'rgba(255,255,255,0.02)',
                p: 1.5, mb: 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
            }}
            onClick={() => onUse(template)}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                {/* Icon + info */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                    <Box
                        sx={{
                            width: 34, height: 34, borderRadius: '8px', flexShrink: 0,
                            background: template.bg,
                            border: `1px solid ${template.border}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: template.color,
                        }}
                    >
                        {template.icon}
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: hovered ? '#f1f5f9' : '#94a3b8', transition: 'color 0.2s', lineHeight: 1.3 }}>
                            {template.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: '#475569', mt: 0.3, lineHeight: 1.4 }}>
                            {template.description}
                        </Typography>
                    </Box>
                </Box>

                {/* Use button */}
                <Box
                    sx={{
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.2s',
                        flexShrink: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 0.4,
                            px: 1, py: 0.4,
                            borderRadius: '6px',
                            background: template.bg,
                            border: `1px solid ${template.border}`,
                            color: template.color,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <PlayArrowIcon sx={{ fontSize: 12 }} />
                        Use
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mt: 1, ml: '46px' }}>
                <Chip
                    label={template.category}
                    size="small"
                    sx={{
                        fontSize: '0.6rem', height: 18,
                        color: template.color, background: template.bg,
                        border: `1px solid ${template.border}`,
                    }}
                />
            </Box>
        </Box>
    );
}

function TemplatesPanel({ open, onClose, onUseTemplate }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? TEMPLATES
        : TEMPLATES.filter((t) => t.category === activeCategory);

    const handleUse = (template) => {
        onUseTemplate(template.transcript);
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '92vw', sm: 380 },
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
                    <Box sx={{ width: 30, height: 30, borderRadius: '8px', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GridViewOutlinedIcon sx={{ fontSize: 16, color: '#8b5cf6' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>Templates</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#475569' }}>{TEMPLATES.length} ready-to-use transcripts</Typography>
                    </Box>
                </Box>
                <IconButton size="small" onClick={onClose} sx={{ color: '#475569', '&:hover': { color: '#f1f5f9' } }}>
                    <CloseIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>

            {/* Category filter */}
            <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', gap: 0.6, flexWrap: 'wrap', flexShrink: 0 }}>
                {CATEGORIES.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        onClick={() => setActiveCategory(cat)}
                        sx={{
                            fontSize: '0.7rem', fontWeight: 600,
                            cursor: 'pointer',
                            color: activeCategory === cat ? '#8b5cf6' : '#64748b',
                            background: activeCategory === cat ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                            border: activeCategory === cat ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                            '&:hover': { color: '#8b5cf6', background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.3)' },
                            transition: 'all 0.2s',
                        }}
                    />
                ))}
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Template list */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 1.5 }}>
                <Typography sx={{ fontSize: '0.65rem', color: '#334155', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', mb: 1 }}>
                    {activeCategory === 'All' ? 'All Templates' : activeCategory} · {filtered.length} templates
                </Typography>
                {filtered.map((template) => (
                    <TemplateCard key={template.id} template={template} onUse={handleUse} />
                ))}
            </Box>

            {/* Footer hint */}
            <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                <Typography sx={{ fontSize: '0.68rem', color: '#334155', textAlign: 'center', lineHeight: 1.5 }}>
                    Click any template to load it into the transcript input, then generate a summary.
                </Typography>
            </Box>
        </Drawer>
    );
}

export default TemplatesPanel;
