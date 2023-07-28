// NavSections/MediaSection.jsx
import React, { useRef } from 'react';
import { Button } from '@mui/material';

const MediaSection = ({ setVideoFile }) => {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h2>Media Section</h2>
      <p>This is the content for the Media section.</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleButtonClick}>Select Video</Button>
    </div>
  );
}

export default MediaSection;
