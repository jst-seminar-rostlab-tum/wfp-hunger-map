/* eslint-disable no-nested-ternary */

'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { CloseCircle, Send2, SidebarLeft, SidebarRight } from 'iconsax-react';
import { Bot, Maximize2, Minimize2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import TypingText from '@/components/TypingText/TypingText';
import container from '@/container';
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
import { APIError } from '@/domain/entities/chatbot/BackendCommunication';
import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import ChatbotRepository from '@/domain/repositories/ChatbotRepository';
import { useMediaQuery } from '@/utils/resolution';

import TypingDots from '../TypingText/TypingDot';
import ChatbotSidebar from './ChatbotSidebar';

export default function HungerMapChatbot() {
  const chatbot = container.resolve<ChatbotRepository>('ChatbotRepository');
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMessageSent, setIsUserMessageSent] = useState(false);
  const [chats, setChats] = useState<IChat[]>([{ id: 1, title: 'Chat 1', messages: [], isTyping: false }]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isResponseAnimated, setIsResponseAnimated] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const toggleChat = (): void => {
    if (isMobile) {
      setIsFullScreen(!isOpen);
    } else if (isOpen) {
      // if close chat, then should exit full screen
      setIsFullScreen(false);
    }
    setIsOpen(!isOpen);
  };

  const toggleFullScreen = (): void => {
    if (!isMobile) {
      setIsFullScreen(!isFullScreen);
    }
  };

  const startNewChat = (): void => {
    if (isResponseAnimated) {
      const newChat: IChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}`, messages: [], isTyping: false };
      setChats([...chats, newChat]);
      setCurrentChatIndex(chats.length);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  /**
   * Select chat in side bar
   * @param index is the index of the chat to select
   */
  const selectChat = (index: number): void => {
    setCurrentChatIndex(index);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const setTypingStatus = async (chatIndex: number, isTyping: boolean): Promise<void> => {
    return new Promise((resolve) => {
      setChats((prevChats) => prevChats.map((chat, index) => (index === chatIndex ? { ...chat, isTyping } : chat)));
      resolve();
    });
  };

  /**
   * Handle AI response
   * @param text is user input text
   * @param updatedChats is the updated chats object
   */
  const handleAIResponse = async (text: string): Promise<void> => {
    const previousMessages = chats[currentChatIndex].messages;
    let aiResponse = '';
    try {
      const response = await chatbot.sendMessage(text, { previous_messages: previousMessages });
      aiResponse = response.response;
    } catch (err) {
      if (err instanceof APIError) {
        aiResponse = `Ups! Unfortunately, it seems like there was a problem connecting to the server...\n ${err.status}: ${err.message}`;
      }
    }
    // TODO: get data sources from response later
    const dataSources = DEFAULT_DATA_SOURCES;
    const updatedChatsWithAI = structuredClone(chats);
    updatedChatsWithAI[currentChatIndex].messages.push({
      id: crypto.randomUUID(),
      content: aiResponse,
      role: SenderRole.ASSISTANT,
      dataSources,
    });
    chats[currentChatIndex].isTyping = false;
    setChats(updatedChatsWithAI);
  };

  /**
   * Handle form submit
   * @param fromEvent is form event including key down triggered submit
   * @param promptText is requested text from user
   */
  const handleSubmit = (fromEvent: React.FormEvent, promptText: string | null = null): void => {
    if (isResponseAnimated) {
      setIsResponseAnimated(false);
      fromEvent.preventDefault();
      const text = promptText || input;
      chats[currentChatIndex].isTyping = true;
      if (text.trim()) {
        const updatedChats = structuredClone(chats);
        updatedChats[currentChatIndex].messages.push({ id: crypto.randomUUID(), content: text, role: SenderRole.USER });
        if (updatedChats[currentChatIndex].title === `Chat ${updatedChats[currentChatIndex].id}`) {
          updatedChats[currentChatIndex].title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
        }
        setChats(updatedChats);
        setInput('');
        setIsUserMessageSent(true);
        chats[currentChatIndex].isTyping = false;
      }
    }
  };

  const handleTypingComplete = (): void => {
    setIsResponseAnimated(true);
  };

  const handleKeyDown = (keyboardEvent: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (isResponseAnimated && keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      chats[currentChatIndex].isTyping = false;
      handleSubmit(keyboardEvent);
    }
  };

  /**
   * Since React's setState is asynchronous,
   * Updating the chat state when handleSubmit is not immediately reflected in the handleAIResponse.
   * So, we need to clone the chats object to make sure the state is updated before calling handleAIResponse.
   * And trigger handleAIResponse only when isUserMessageSent is true.
   */
  useEffect(() => {
    if (isUserMessageSent) {
      const latestMessage = chats[currentChatIndex].messages.slice(-1)[0];
      if (latestMessage.role === SenderRole.USER) {
        handleAIResponse(latestMessage.content).then(() => {
          setIsUserMessageSent(false);
        });
      }
    }
  }, [isUserMessageSent]);

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
                <Button variant="light" isIconOnly onClick={() => setIsSidebarOpen((previousValue) => !previousValue)}>
                  {isSidebarOpen ? <SidebarLeft className="h-4 w-4" /> : <SidebarRight className="h-4 w-4" />}
                </Button>
                <Image src="/wfp-logo.png" width={32} height={32} alt="WFP Logo" className="mr-2" />
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
                    <CloseCircle className="h-4 w-4" />
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
                  <div
                    className="fixed inset-0 z-10 opacity-50 bg-white dark:bg-black"
                    onClick={() => setIsSidebarOpen((previousValue) => !previousValue)}
                  />
                )}
                {/* chat area */}

                <div className="flex-1 p-4 overflow-y-auto">
                  {chats[currentChatIndex].messages.length === 0 ? (
                    <div className="flex flex-col items-center mt-4 h-full space-y-4">
                      <p className="text-center text-xl max-w-[80%] mb-2">{WELCOME_MESSAGE}</p>
                      <p className="text-center text-md max-w-[80%] mb-2">{SUB_WELCOME_MESSAGE}</p>
                      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
                        {DEFAULT_PROMPT.map((prompt) => (
                          <Button
                            key={prompt.id}
                            onClick={(event) => handleSubmit(event, prompt.value)}
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
                          <div className="relative flex items-center justify-center bg-transparent w-10 h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black">
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
                              textID={message.content}
                              chatIndex={currentChatIndex}
                              onTypingStart={() => setTypingStatus(currentChatIndex, false)} // regarding on how double typing animation is fixed
                              onTypingComplete={() => {
                                handleTypingComplete();
                              }}
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

                  {chats[currentChatIndex].isTyping === true && (
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
                    onChange={(inputEvent) => setInput(inputEvent.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={TYPING_PLACEHOLDER}
                    className="rounded-xl border border-solid border-black bg-chatbotInputArea dark:bg-chatbotInputArea flex-grow px-3 py-2 mr-2 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                    rows={1}
                  />
                  <Tooltip content="Submit">
                    <Button type="submit" variant="light" isIconOnly disabled={chats[currentChatIndex].isTyping}>
                      <Send2 className="h-4 w-4" />
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
