/* eslint-disable no-nested-ternary */

'use client';

import './chatbot.css';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { Bot, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, PlusCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import TypingText from '@/components/TypingText/TypingText';
import {
  CHAT_TITLE,
  DATA_SOURCES,
  DEFAULT_DATA_SOURCES,
  DEFAULT_PROMPT,
  IChat,
  NEW_CHAT_BUTTON,
  SUB_WELCOME_MESSAGE,
  WELCOME_MESSAGE,
} from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import { APIError, chatService, formatChatResponse } from '@/services/api/chatbot';
import { useMediaQuery } from '@/utils/resolution';

export default function HungerMapChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>([{ id: 1, title: 'Chat 1', messages: [] }]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // TODO: get dark mode from context later
  const isDarkMode = false;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // TODO: get isMobile from context later
  const isMobile = useMediaQuery('(max-width: 600px)');

  const toggleChat = () => {
    if (isMobile) {
      setIsFullScreen(!isOpen);
    } else if (isOpen) {
      // if close chat, then should exit full screen
      setIsFullScreen(false);
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

  const startNewChat = () => {
    const newChat: IChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setCurrentChatIndex(chats.length);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  /**
   * Select chat in side bar
   * @param index is the index of the chat to select
   */
  const selectChat = (index: number) => {
    setCurrentChatIndex(index);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  /**
   * Handle AI response
   * @param text is user input text
   */
  const handleAIResponse = async (text: string) => {
    const previousMessages = chats[currentChatIndex].messages;
    let aiResponse = '';
    try {
      const response = await chatService.sendMessage(text, { previous_messages: previousMessages });
      aiResponse = formatChatResponse(response).text;
    } catch (err) {
      if (err instanceof APIError) {
        aiResponse = `Ups! Unfortunately, it seems like there was a problem connecting to the server...\n ${err.status}: ${err.message}`;
      }
    }
    // TODO: get data sources from response later
    const dataSources = DEFAULT_DATA_SOURCES;
    const updatedChatsWithAI = [...chats];
    updatedChatsWithAI[currentChatIndex].messages.push({
      id: crypto.randomUUID(),
      content: aiResponse,
      role: SenderRole.ASSISTANT,
      dataSources,
    });
    setChats(updatedChatsWithAI);
  };

  const handleTypingComplete = () => {
    setIsTyping(false); // set isTyping to false when typing is complete
  };

  /**
   * Handle form submit
   * @param e is form event
   * @param promptText is requested text from user
   */
  const handleSubmit = async (e: React.FormEvent, promptText: string | null = null) => {
    e.preventDefault();
    const text = promptText || input;
    if (isTyping) return; // prevent multiple submission
    if (text.trim()) {
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].messages.push({ id: crypto.randomUUID(), content: text, role: SenderRole.USER });
      if (updatedChats[currentChatIndex].title === `Chat ${updatedChats[currentChatIndex].id}`) {
        updatedChats[currentChatIndex].title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
      }
      setChats(updatedChats);
      setInput('');
      setIsTyping(true);
      // Simulate AI response
      await handleAIResponse(text);
    }
  };

  // use to scroll to the end of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentChatIndex]);

  // used to auto resize the input textarea when input is too long
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const renderSidebar = () => (
    <Card
      style={{
        backgroundColor: isFullScreen
          ? isMobile
            ? isDarkMode
              ? '#292929'
              : '#d8d8d8'
            : isDarkMode
              ? '#292929'
              : '#71717a40'
          : isDarkMode
            ? '#40404050'
            : '#71717a40',
      }}
      className={clsx(
        'absolute top-0 left-0 h-full z-[9999]',
        isFullScreen ? 'w-[215px]' : 'w-[179px]',
        'shadow-none',
        isFullScreen || isMobile ? 'rounded-none' : 'rounded-[12px_0_0_12px]'
      )}
    >
      <CardBody className="p-4">
        <Button
          onClick={startNewChat}
          className={clsx(
            'bg-transparent w-full h-10 mb-4 flex justify-center items-center gap-2 border border-solid hover:bg-black',
            isDarkMode ? 'hover:bg-white text-white border-white' : 'hover:bg-black text-black border-black'
          )}
        >
          <PlusCircle className={clsx('h-4 w-4', isDarkMode ? 'text-white' : 'text-black')} />
          <span className={clsx('truncate', isDarkMode ? 'text-white' : 'text-black')}>{NEW_CHAT_BUTTON}</span>
        </Button>
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {chats.map((chat, index) => (
            <Button
              key={chat.id}
              onClick={() => selectChat(index)}
              className={clsx(
                'chatbot-side-bar-select-chat-button justify-start w-full h-10 mb-3 flex gap-2',
                currentChatIndex === index
                  ? isDarkMode
                    ? 'select-dark'
                    : 'select-light'
                  : isDarkMode
                    ? 'dark'
                    : 'light'
              )}
            >
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div
      style={(isFullScreen || isMobile) && isOpen ? { inset: 0 } : { top: '1rem', right: '1rem' }}
      className="absolute z-[9999]"
    >
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className={clsx(
            'relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full border-2',
            isDarkMode ? 'bg-black' : 'bg-white'
          )}
        >
          <Bot className={clsx('w-6 h-6 fill-current', isDarkMode ? 'text-white' : 'text-black')} />
        </Button>
      )}
      {/* chatbot interface */}
      {isOpen && (
        <>
          {isSidebarOpen && renderSidebar()}
          <Card
            style={{
              borderColor: '#000000',
              borderWidth: isFullScreen ? '0px' : '1px',
              borderStyle: 'solid',
              opacity: isFullScreen ? 1 : 0.8,
              transition: 'all 0.3s ease-in-out',
              backgroundColor: isDarkMode ? 'black' : 'white',
            }}
            className={clsx(
              isFullScreen || isMobile ? 'rounded-none' : '',
              isFullScreen ? 'w-screen h-screen' : isMobile ? 'w-screen h-screen' : 'w-[636px] h-[657px]',
              isDarkMode ? 'text-white' : 'text-black',
              isSidebarOpen && !isMobile ? (isFullScreen ? 'pl-[215px]' : 'pl-[179px]') : 'pl-0',
              'overflow-hidden flex-1 flex flex-col transition-all duration-300 ease-in-out'
            )}
          >
            <CardHeader className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Button variant="light" isIconOnly onClick={toggleSidebar}>
                  {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                </Button>
                <img src="/wfp-logo.png" alt="WFP Logo" className="h-8 w-8 mr-2" />
                <h2 className="text-lg font-semibold truncate">{CHAT_TITLE}</h2>
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
            <CardBody className="p-0 h-full">
              <div className="relative h-full flex flex-col">
                {/* overlay area in mobile version */}
                {isMobile && isSidebarOpen && (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    style={{ backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)' }}
                    className="fixed inset-0 z-10"
                    onClick={toggleSidebar}
                  />
                )}
                {/* chat area */}

                <div className={clsx('flex-1 p-4 overflow-y-auto', isDarkMode ? 'bg-gray-900' : 'bg-gray-100')}>
                  {chats[currentChatIndex].messages.length === 0 ? (
                    <div className="flex flex-col items-center mt-4 h-full space-y-4">
                      <p className="text-center text-xl max-w-[80%] mb-2">{WELCOME_MESSAGE}</p>
                      <p className="text-center text-md max-w-[80%] mb-2">{SUB_WELCOME_MESSAGE}</p>
                      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
                        {DEFAULT_PROMPT.map((prompt) => (
                          <Button
                            key={prompt.id}
                            onClick={(e) => handleSubmit(e, prompt.value)}
                            className={clsx(
                              'chatbot-default-prompt-button',
                              isDarkMode ? 'dark' : 'light',
                              'truncate w-full mb-2',
                              isMobile ? 'max-w-[250px]' : 'max-w-[400px]'
                            )}
                            title={prompt.value}
                          >
                            <span className="truncate">{prompt.value}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    chats[currentChatIndex].messages.map((message) => (
                      <div
                        key={message.role + Math.random()}
                        className={clsx('flex mb-4', message.role === 'user' ? 'justify-end' : 'justify-start')}
                      >
                        {message.role === 'assistant' && (
                          <div className="relative chat-ai-message">
                            <Bot className={clsx('w-6 h-6 fill-current', isDarkMode ? 'text-white' : 'text-black')} />
                          </div>
                        )}
                        <div
                          className={clsx(
                            message.role === 'user'
                              ? isDarkMode
                                ? 'chat-user-message-dark'
                                : 'chat-user-message-light'
                              : 'chat-ai-message',
                            message.role === 'user' ? 'ml-12' : '',
                            'rounded-lg p-3 max-w-[80%]'
                          )}
                        >
                          {message.role === 'user' ? (
                            <p className="break-words text-justify">{message.content}</p>
                          ) : (
                            <TypingText
                              text={message.content}
                              speed={100}
                              endSentencePause={500}
                              onTypingComplete={handleTypingComplete}
                            />
                          )}
                          {message.dataSources && (
                            <div
                              className="mt-2 text-xs"
                              style={{ color: isDarkMode ? '#9CA3AF' : '#4B5563', fontSize: '12px' }} // text-gray-400 and text-gray-600
                            >
                              <p
                                style={{
                                  color: '#6B7280',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {DATA_SOURCES}
                              </p>
                              <ul
                                style={{
                                  color: '#6B7280',
                                  listStyleType: 'disc',
                                  paddingInlineStart: '1rem',
                                }}
                              >
                                {message.dataSources.map((source) => (
                                  <li key={source}>{source}</li>
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
                      <div className="relative chat-ai-message">
                        <Bot className={clsx('w-6 h-6 fill-current', isDarkMode ? 'text-white' : 'text-black')} />
                      </div>
                      <div className="chat-typing-animation">
                        <span className="dot mr-2" />
                        <span className="dot mr-2" />
                        <span className="dot" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </CardBody>
            <Divider style={{ backgroundColor: '#292d32' }} />
            <CardFooter className="border-t-2 p-4">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex space-x-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (isTyping) return; // prevent multiple submission
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Type your message..."
                    style={{
                      backgroundColor: isDarkMode ? '#252529' : '#E6F1FE',
                      borderColor: isDarkMode ? 'black' : '#000000',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: '12px',
                    }}
                    className={clsx(
                      'flex-grow px-3 py-2 mr-2',
                      isDarkMode ? 'text-white' : 'text-gray-800',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden'
                    )}
                    rows={1}
                  />
                  <Tooltip content="Submit">
                    <Button type="submit" variant="light" isIconOnly disabled={isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </div>
              </form>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
