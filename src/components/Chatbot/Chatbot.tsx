'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, Maximize2, Minimize2, X, PlusCircle, Send, Menu } from 'lucide-react';
import { Avatar, Button, Card, CardBody, CardHeader, CardFooter, Tooltip } from '@nextui-org/react';

const examplePrompts = [
  'What is the current hunger situation in Africa?',
  'How does climate change affect food security?',
  "What are WFP's main initiatives to combat hunger?",
];

type Message = {
  text: string;
  sender: 'user' | 'ai';
  dataSources?: string[];
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

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
  const [chats, setChats] = useState<Chat[]>([{ id: 1, title: 'New Chat', messages: [] }]);
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
    console.log('toggleSidebar');
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   document.documentElement.classList.toggle('dark');
  // };

  const startNewChat = () => {
    const newChat: Chat = { id: chats.length + 1, title: `New Chat ${chats.length + 1}`, messages: [] };
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
      className={`
    absolute top-0 left-0 h-full
    ${isFullScreen ? 'w-[215px]' : isMobile ? 'w-3/4' : 'w-[179px]'}
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    transition-transform duration-300 ease-in-out
    z-20 
    ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
    ${isMobile ? 'shadow-lg' : ''}
    rounded-[12px_0_0_12px]
  `}
      ref={sidebarRef}
    >
      <CardBody className="p-4">
        <Button
          onClick={startNewChat}
          className={`
        w-full h-[40px] mb-4
        flex justify-center items-center gap-2
        rounded-[12px] border border-black
        ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-black'}
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
              className={`
            w-full h-[40px] mb-2
            flex items-center gap-2
            rounded-[12px]
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
    <div>
      <div className={`absolute ${isFullScreen ? 'inset-0' : 'top-4 right-4'} z-50`}>
        {!isOpen && (
          <Button onClick={toggleChat} className="rounded-full p-2 shadow-lg" variant="light">
            <Bot className="h-6 w-6" />
          </Button>
        )}
        {isOpen && (
          <Card
            className={`shadow-xl ${
              isFullScreen ? 'w-screen h-screen' : isMobile ? 'w-[636px] h-[657px]' : 'w-[500px] h-[600px]'
            } ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} overflow-hidden`}
            style={{
              strokeWidth: '2px',
              stroke: '#161616',
              opacity: 1,
            }}
          >
            <CardBody className="p-0 h-full">
              <div className="relative h-full flex flex-col overflow-hidden">
                {isSidebarOpen && renderSidebar()}
                {isMobile && isSidebarOpen && (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    className={`fixed inset-0 z-10 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
                    onClick={toggleSidebar}
                  />
                )}
                <div
                  className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? (isFullScreen ? 'ml-[215px]' : 'ml-[179px]') : 'ml-0'}`}
                >
                  <CardHeader
                    className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Button variant="light" isIconOnly onClick={toggleSidebar}>
                        <Menu className="h-4 w-4" />
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
                  <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    {chats[currentChatIndex].messages.length === 1 &&
                    chats[currentChatIndex].messages[0].sender === 'ai' ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <p className="text-center text-lg max-w-[80%]">
                          Welcome to HungerMap ChatBot! How can I assist you today?
                        </p>
                        <div className="flex flex-col space-y-2 w-full max-w-md">
                          {examplePrompts.map((prompt, index) => (
                            <Button
                              key={index}
                              variant="bordered"
                              onClick={(e) => handleSubmit(e, prompt)}
                              className={`truncate w-full ${isMobile ? 'max-w-[250px]' : 'max-w-[400px]'}`}
                              title={prompt}
                            >
                              <span className="truncate">{prompt}</span>
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
                          {message.sender === 'ai' && <Avatar src="/wfp-logo.svg" alt="AI" className="mr-2" />}
                          <div
                            className={`${
                              message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : isDarkMode
                                  ? 'bg-gray-700 text-white'
                                  : 'bg-white text-gray-800'
                            } rounded-lg p-3 max-w-[80%] ${message.sender === 'user' ? 'ml-12' : ''} shadow`}
                          >
                            <p className="break-words">{message.text}</p>
                            {message.dataSources && (
                              <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <p className="truncate">Data Sources:</p>
                                <ul className="list-disc list-inside">
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
                  <CardFooter
                    className={`border-t p-4 ${
                      isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                    }`}
                  >
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
                          className={`flex-grow px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                          } border ${
                            isDarkMode ? 'border-gray-600' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden`}
                          rows={1}
                        />
                        <Button type="submit" color="primary" isIconOnly>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </CardFooter>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
