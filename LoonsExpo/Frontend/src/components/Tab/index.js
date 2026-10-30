import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';

/**
 * CustomTabs - pill/rounded style tab bar, scrollable with arrows (arrows outside, not overlapping), theme-aware
 * @param {Object[]} tabs - Array of {label, value}
 * @param {any} value - Currently selected value
 * @param {function} onChange - (event, value) => void
 * @param {object} sx - Optional sx for Box
 * @param {object} style - Optional style for Box
 */
const SCROLL_AMOUNT = 150;
const CustomTabs = ({ tabs, value, onChange, sx = {}, style = {} }) => {
    const theme = useTheme();
    const scrollRef = useRef();
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    // Colors based on theme
    const tabBarBg = theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff';
    const tabSelectedBg = theme.palette.mode === 'dark' ? theme.palette.background.default : 'transparent';
    const tabBg = theme.palette.mode === 'dark' ? theme.palette.action.selected : '#f5f5f5';
    const tabText = theme.palette.text.primary;
    const tabSelectedText = theme.palette.primary.main;
    const tabBorder = theme.palette.divider;
    const tabSelectedBorder = theme.palette.primary.main;
    const tabHoverBg = theme.palette.action.hover;

    // Check if scroll arrows are needed
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [tabs.length]);

    const handleScroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
    };

    return (
        <Box sx={{
            boxShadow: '0 2px 8px 0 rgba(34,41,47,0.08)',
            padding: '4px',
            borderRadius: '50px',
            backgroundColor: tabBarBg,
            display: 'flex', alignItems: 'center', mb: 2, ...sx
        }} style={style}>
            {showLeft && (
                <IconButton
                    size="small"
                    onClick={() => handleScroll(-1)}
                    sx={{
                        mr: 1,
                        '&:hover': { background: tabHoverBg },
                    }}
                >
                    <ArrowBackIosIcon fontSize="small" />
                </IconButton>
            )}
            <Box
                ref={scrollRef}
                sx={{

                    display: 'block',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    px: 1,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    flex: 1,
                }}
            >
                {tabs.map((tab, idx) => {
                    const selected = value === tab.value;
                    return (
                        <button
                            key={tab.value}
                            onClick={e => onChange(e, tab.value)}
                            style={{
                                border: `1px solid ${selected ? tabSelectedBorder : tabBorder}`,
                                borderRadius: 32,
                                background: selected ? tabSelectedBg : tabBg,
                                color: selected ? tabSelectedText : tabText,
                                fontWeight: 500,
                                fontSize: 16,
                                padding: '10px 10px',
                                outline: 'none',
                                cursor: 'pointer',
                                transition: 'background 0.2s, color 0.2s, border 0.2s',
                                boxShadow: selected ? '0 2px 8px 0 rgba(34,41,47,0.04)' : 'none',
                                whiteSpace: 'pre-line',
                                display: 'inline-block',
                                marginRight: 16,
                            }}
                            onMouseOver={e => {
                                if (!selected) e.currentTarget.style.background = tabHoverBg;
                            }}
                            onMouseOut={e => {
                                if (!selected) e.currentTarget.style.background = tabBg;
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </Box>
            {showRight && (
                <IconButton
                    size="small"
                    onClick={() => handleScroll(1)}
                    sx={{
                        ml: 1,
                        '&:hover': { background: tabHoverBg },
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
};

export default CustomTabs;
