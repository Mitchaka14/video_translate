// NavContent.jsx
import React from 'react';
import MediaSection from './NavSections/MediaSection';
import SpeakerSection from './NavSections/SpeakerSection';
import TranscriptionSection from './NavSections/TranscriptionSection';
import TTSSection from './NavSections/TTSSection';
import SpeechSection from './NavSections/SpeechSection';
import SoundsSection from './NavSections/SoundsSection';
import ShareSection from './NavSections/ShareSection';
import HelpSection from './NavSections/HelpSection';
import SettingsSection from './NavSections/ShareSection';
// import other section components

const sections = [
  { name: "settings", title: "Settings", component: SettingsSection },
  { name: "media", title: "Media" , component: MediaSection},
  { name: "speakerId", title: "Speaker Identification" , component: SpeakerSection},
  { name: "transcription", title: "Transcription" , component: TranscriptionSection},
  { name: "TTS", title: "TTS" , component: TTSSection},
  { name: "editLinesSpeech", title: "Edit Lines Speech" , component: SpeechSection},
  { name: "editLinesSounds", title: "Edit Lines Sounds" , component: SoundsSection},
  { name: "share", title: "Share" , component: ShareSection},
  { name: "helpCenter", title: "Help Center" , component: HelpSection},
  // ... other sections with respective components
];

const NavContent = ({ activeSection, setVideoFile }) => {
  return (
    <div className="nav-content">
      <div className="active-content">
        {sections.find(({ name }) => name === activeSection)?.component({ setVideoFile })}
      </div>
    </div>
  );
};

export default NavContent;
