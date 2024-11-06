/* eslint-disable no-nested-ternary */

'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { Bot, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import TypingText from '@/components/TypingText/TypingText';
import {
  CHAT_TITLE,
  DATA_SOURCES,
  DEFAULT_DATA_SOURCES,
  DEFAULT_PROMPT,
  ENTER_FULL_SCREEN,
  EXIT_FULL_SCREEN,
  SUB_WELCOME_MESSAGE,
  TYPING_PLACEHOLDER,
  WELCOME_MESSAGE,
} from '@/domain/constant/chatbot/Chatbot';
import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import { APIError, chatService, formatChatResponse } from '@/services/api/chatbot';
import { useMediaQuery } from '@/utils/resolution';

import TypingDots from '../TypingText/TypingDot';
import ChatbotSidebar from './ChatbotSidebar';

export default function HungerMapChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<IChat[]>([{ id: 1, title: 'Chat 1', messages: [] }]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // TODO: get isMobile from context later?
  const isMobile = useMediaQuery('(max-width: 640px)');

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

  // listen to isOpen and isMobile to set isFullScreen
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsFullScreen(true);
    }
  }, [isMobile, isOpen]);

  // used to auto resize the input textarea when input is too long
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className={clsx('absolute z-[9999]', isFullScreen && isOpen ? 'inset-0' : 'top-4 right-4')}>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="
            relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full border-2 border-black dark:border-white bg-white dark:bg-transparent"
        >
          <Bot className="stroke-black dark:stroke-white w-6 h-6" />
        </Button>
      )}
      {/* chatbot interface */}
      {isOpen && (
        <>
          {isSidebarOpen && (
            <ChatbotSidebar
              isFullScreen={isFullScreen}
              chats={chats}
              currentChatIndex={currentChatIndex}
              onSelectChat={selectChat}
              onStartNewChat={startNewChat}
            />
          )}
          <Card
            className={clsx(
              isFullScreen
                ? 'w-screen h-screen rounded-none opacity-100 border-0'
                : 'w-[636px] h-[657px] opacity-80 border-1',
              isSidebarOpen ? (isFullScreen ? 'sm:pl-[215px] pl-0' : 'sm:pl-[179px] pl-0') : 'pl-0',
              'border-solid border-black bg-white dark:bg-black overflow-hidden flex-1 flex flex-col text-black dark:text-white'
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
                  <Tooltip content={isFullScreen ? EXIT_FULL_SCREEN : ENTER_FULL_SCREEN}>
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
            <Divider className="bg-chatbotDivider dark:bg-chatbotDivider" />
            <CardBody className="p-0 h-full">
              <div className="relative h-full flex flex-col">
                {/* overlay area in mobile version */}
                {isMobile && isSidebarOpen && (
                  /* since it has been show as overlay style here, once click this area then close side panel better not use button here */
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div className="fixed inset-0 z-10 opacity-50 bg-white dark:bg-black" onClick={toggleSidebar} />
                )}
                {/* chat area */}

                <div className={clsx('flex-1 p-4 overflow-y-auto')}>
                  {chats[currentChatIndex].messages.length === 0 ? (
                    <div className="flex flex-col items-center mt-4 h-full space-y-4">
                      <p className="text-center text-xl max-w-[80%] mb-2">{WELCOME_MESSAGE}</p>
                      <p className="text-center text-md max-w-[80%] mb-2">{SUB_WELCOME_MESSAGE}</p>
                      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
                        {DEFAULT_PROMPT.map((prompt) => (
                          <Button
                            key={prompt.id}
                            onClick={(e) => handleSubmit(e, prompt.value)}
                            className="
                              truncate w-full mb-2 max-w-[250px] sm:max-w-[400px] border border-solid border-black dark:border-white bg-transparent hover:bg-chatbotDefaultPromptHover dark:hover:bg-chatbotDefaultPromptHover opacity-100 dark:hover:opacity-60
                              "
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
                        key={message.id}
                        className={clsx(
                          'flex mb-4',
                          message.role === SenderRole.USER ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === SenderRole.ASSISTANT && (
                          <div className="relative flex items-center justify-center bg-transparent w-12 h-12 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black">
                            <Bot className="w-6 h-6 stroke-black dark:stroke-white" />
                          </div>
                        )}
                        <div
                          className={clsx(
                            'p-4 mb-5 rounded-lg max-w-[80%]',
                            message.role === SenderRole.USER
                              ? 'rounded-xl bg-chatbotUserMsg dark:bg-chatbotUserMsg ml-12'
                              : 'bg-transparent'
                          )}
                        >
                          {message.role === SenderRole.USER ? (
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
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <p className="truncate">{DATA_SOURCES}</p>
                              <ul className="list-disc pl-4">
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
                      <div className="relative flex items-center justify-center bg-transparent w-12 h-12 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black">
                        <Bot className="w-6 h-6 stroke-black dark:stroke-white" />
                      </div>
                      <TypingDots />
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </CardBody>
            <Divider className="bg-chatbotDivider dark:bg-chatbotDivider" />
            <CardFooter className="p-4">
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
                    placeholder={TYPING_PLACEHOLDER}
                    className="rounded-xl border border-solid border-black bg-chatbotInputArea dark:bg-chatbotInputArea flex-grow px-3 py-2 mr-2 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
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
