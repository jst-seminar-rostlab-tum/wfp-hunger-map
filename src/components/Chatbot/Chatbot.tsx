/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

'use client';

import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Tooltip } from '@nextui-org/react';
import { Bot, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, PlusCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_PROMPT, IChat } from '@/types/chatbot';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

export default function HungerMapChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>([{ id: 1, title: 'New Chat', messages: [] }]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = false;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const toggleChat = () => {
    if (isMobile) {
      setIsFullScreen(!isOpen);
    }
    setIsOpen(!isOpen);
  };

  const toggleFullScreen = () => {
    if (!isMobile) {
      setIsFullScreen(!isFullScreen);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle('dark');
  // };

  const startNewChat = () => {
    const newChat: IChat = { id: chats.length + 1, title: `New Chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setCurrentChatIndex(chats.length);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const selectChat = (index: number) => {
    setCurrentChatIndex(index);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent, promptText: string | null = null) => {
    e.preventDefault();
    const text = promptText || input;
    if (text.trim()) {
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].messages.push({ text, sender: 'user' });
      if (updatedChats[currentChatIndex].title === `New Chat ${updatedChats[currentChatIndex].id}`) {
        updatedChats[currentChatIndex].title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
      }
      setChats(updatedChats);
      setInput('');
      setIsTyping(true);
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = 'This is a simulated AI response based on the HungerMap data.';
        const dataSources = ['HungerMap Live', 'WFP Country Reports', 'FAO Statistics'];
        const updatedChatsWithAI = [...updatedChats];
        updatedChatsWithAI[currentChatIndex].messages.push({ text: aiResponse, sender: 'ai', dataSources });
        setChats(updatedChatsWithAI);
        setIsTyping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (isOpen && chats[currentChatIndex].messages.length === 0) {
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].messages.push({
        text: "Hello! I'm the HungerMap ChatBot. How can I assist you today?",
        sender: 'ai',
      });
      setChats(updatedChats);
    }
  }, [isOpen, currentChatIndex, chats]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentChatIndex]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const renderSidebar = () => (
    <Card
      style={{
        backgroundColor: isDarkMode ? '#252529' : '#71717A',
        opacity: isFullScreen || isMobile ? 1 : 0.8,
      }}
      className={`
    absolute top-0 left-0 h-full
    ${isFullScreen ? 'w-[215px]' : isMobile ? 'w-[3/4]' : 'w-[179px]'}
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    transition-transform duration-300 ease-in-out
    z-20
    ${isMobile ? 'shadow-lg' : ''}
    ${isFullScreen || isMobile ? 'rounded-none' : 'rounded-[12px_0_0_12px]'}
  `}
      ref={sidebarRef}
    >
      <CardBody className="p-4">
        <Button
          onClick={startNewChat}
          className={`chatbot-side-bar-add-new-chat-button
        w-full h-[40px]
        flex justify-center items-center gap-2
      `}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="truncate">New Chat</span>
        </Button>
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {chats.map((chat, index) => (
            <Button
              key={chat.id}
              onClick={() => selectChat(index)}
              className={`chatbot-side-bar-select-chat-button
            w-full h-[40px]
            flex gap-2
            ${
              currentChatIndex === index
                ? isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-[#D9E2EA] text-black'
                : isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-transparent hover:bg-[#D9E2EA] text-black'
            }
          `}
            >
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div style={isFullScreen ? { inset: 0 } : { top: '1rem', right: '1rem' }} className="absolute z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full border-2 bg-white"
        >
          <Bot className="w-6 h-6 fill-current text-black" />
        </Button>
      )}
      {/* chatbot interface */}
      {isOpen && (
        <Card
          style={{
            borderColor: '#000000',
            borderWidth: '1px',
            borderStyle: 'solid',
            opacity: 0.8,
          }}
          className={`${isFullScreen || isMobile ? 'rounded-none' : ''}
              ${
                isFullScreen ? 'w-screen h-screen' : isMobile ? 'w-screen h-screen' : 'w-[500px] h-[600px]'
              } ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white opacity-80 text-black'} overflow-hidden`}
        >
          <CardBody className="p-0 h-full">
            <div className="relative h-full flex flex-col overflow-hidden">
              {/* side bar area */}
              {isSidebarOpen && renderSidebar()}
              {/* overlay area in mobile version */}
              {isMobile && isSidebarOpen && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  className={`fixed inset-0 z-10 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
                  onClick={toggleSidebar}
                />
              )}
              {/* chat area */}
              <div
                className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobile ? (isFullScreen ? 'ml-[215px]' : 'ml-[179px]') : 'ml-0'}`}
              >
                <CardHeader
                  className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center space-x-2">
                    <Button variant="light" isIconOnly onClick={toggleSidebar}>
                      {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                    </Button>
                    <img src="/wfp-logo.png" alt="WFP Logo" className="h-8 w-8 mr-2" />
                    <h2 className="text-lg font-semibold truncate">HungerMap ChatBot</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isMobile && (
                      <Tooltip content={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}>
                        <Button variant="light" isIconOnly onClick={toggleFullScreen}>
                          {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip content="Close Chat">
                      <Button variant="light" isIconOnly onClick={toggleChat}>
                        <X className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </div>
                </CardHeader>
                <Divider style={{ backgroundColor: '#292d32' }} />
                <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  {chats[currentChatIndex].messages.length === 1 &&
                  chats[currentChatIndex].messages[0].sender === 'ai' ? (
                    <div className="flex flex-col items-center mt-4 h-full space-y-4">
                      <p className="text-center text-xl max-w-[80%] mb-2">Welcome to HungerMap ChatBot!</p>
                      <p className="text-center text-md max-w-[80%] mb-2">How can I assist you today?</p>
                      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
                        {DEFAULT_PROMPT.map((prompt) => (
                          <Button
                            key={prompt.id}
                            onClick={(e) => handleSubmit(e, prompt.value)}
                            className={`chatbot-default-prompt-button truncate w-full mb-2 ${isMobile ? 'max-w-[250px]' : 'max-w-[400px]'}`}
                            title={prompt.value}
                          >
                            <span className="truncate">{prompt.value}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    chats[currentChatIndex].messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        {message.sender === 'ai' && (
                          <div className="relative chat-ai-message">
                            <Bot className="w-6 h-6 fill-current text-black" />
                          </div>
                        )}
                        <div
                          className={`${
                            message.sender === 'user' ? 'chat-user-message' : 'chat-ai-message'
                          } rounded-lg p-3 max-w-[80%] ${message.sender === 'user' ? 'ml-12' : ''}`}
                        >
                          <p className="break-words">{message.text}</p>
                          {message.dataSources && (
                            <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <p className="truncate !text-gray-500">Data Sources:</p>
                              <ul className="list-disc list-inside !text-gray-500">
                                {message.dataSources.map((source, i) => (
                                  <li key={i} className="truncate">
                                    {source}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <Avatar src="/wfp-logo.svg" alt="AI" className="mr-2" />
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-3 shadow`}>
                        <div className="typing-animation">
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          {/* to delete */}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <Divider style={{ backgroundColor: '#292d32' }} />
                <CardFooter className={`border-t-2 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex space-x-2">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        placeholder="Type your message..."
                        style={{
                          backgroundColor: isDarkMode ? '#252529' : '#E6F1FE',
                          borderColor: isDarkMode ? '#4B5563' : '#000000',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderRadius: '12px',
                        }}
                        className={`flex-grow px-3 py-2 mr-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden`}
                        rows={1}
                      />
                      <Tooltip content="Submit">
                        <Button type="submit" variant="light" isIconOnly>
                          <Send className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </form>
                </CardFooter>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
