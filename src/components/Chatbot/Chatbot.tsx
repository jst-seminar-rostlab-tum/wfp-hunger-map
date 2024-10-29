'use client';

import React, { useState } from 'react';
import { useMediaQuery } from '@/utils/resolution';
import { Button } from '@nextui-org/button';
import { Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleChat = () => {
    if (isMobile) {
      setIsFullScreen(!isOpen);
    }
    setIsOpen(!isOpen);
  };

  // const toggleFullScreen = () => {
  //   if (!isMobile) {
  //     setIsFullScreen(!isFullScreen)
  //   }
  // }

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  return (
    <div className={`absolute ${isFullScreen ?? 'inset-0'}`} style={{ top: '10px', right: '10px' }}>
      {!isOpen && (
        <Button isIconOnly color="default" variant="faded" onClick={toggleChat}>
          <Bot />
        </Button>
      )}
    </div>
  );
}
