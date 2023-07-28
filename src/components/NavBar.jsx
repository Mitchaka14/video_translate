import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Box, ListItem, List, Typography, styled } from '@mui/material';
import {
  SettingsTwoTone,
  PlayCircleFilledTwoTone,
  Face6TwoTone,
  SubtitlesTwoTone,
  HourglassBottomTwoTone,
  GraphicEqTwoTone,
  ShareTwoTone,
  HelpTwoTone,
  SettingsVoiceTwoTone
} from '@mui/icons-material';

const sections = [
  { name: "settings", title: "Settings", icon: <SettingsTwoTone /> },
  { name: "media", title: "Media", icon: <PlayCircleFilledTwoTone /> },
  { name: "speakerId", title: "Speaker", icon: <Face6TwoTone /> },
  { name: "transcription", title: "Words", icon: <SubtitlesTwoTone /> },
  { name: "TTS", title: "TTS", icon: <HourglassBottomTwoTone /> },
  { name: "editLinesSpeech", title: "Speech", icon: <SettingsVoiceTwoTone /> },
  { name: "editLinesSounds", title: "Sounds", icon: <GraphicEqTwoTone /> },
  { name: "share", title: "Share", icon: <ShareTwoTone /> },
  { name: "helpCenter", title: "Help", icon: <HelpTwoTone /> },
];

const ActiveLink = styled(ScrollLink)(({ active }) => ({
  color: active ? 'blue' : 'inherit',
  '& svg': {
    fill: active ? 'blue' : 'white',
  },
}));

const NavBar = ({ activeSection, setActiveSection }) => {
  const handleClick = (section) => {
    setActiveSection(section);
  };

  return (
    <nav>
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        {sections.map(({ name, title, icon }) => (
          <ListItem key={name} sx={{ width: '100%' }}>
            <ActiveLink
              to={name}
              spy={true}
              smooth={true}
              duration={500}
              active={activeSection === name}
              onClick={() => handleClick(name)}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60px' }}>
                <Box sx={{ mb: 1 }}>{React.cloneElement(icon, {color: activeSection === name ? 'action' : 'inherit'})}</Box>
                <Typography variant="body2" noWrap sx={{ color: activeSection === name ? 'white' : 'inherit' }}>{title}</Typography>
              </Box>
            </ActiveLink>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default NavBar;
