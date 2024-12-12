/* eslint-disable no-nested-ternary */

'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow } from '@nextui-org/react';
import clsx from 'clsx';
import { CloseSquare, Maximize4, Minus, Send2, SidebarLeft, SidebarRight } from 'iconsax-react';
import { Bot } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import TypingText from '@/components/TypingText/TypingText';
import container from '@/container';
import {
  CHAT_TITLE,
  CLOSE_SIDE_BAR,
  DEFAULT_PROMPT,
  ENTER_FULL_SCREEN,
  EXIT_FULL_SCREEN,
  OPEN_SIDE_BAR,
  SUB_WELCOME_MESSAGE,
  TRIGGER_CHAT,
  TYPING_PLACEHOLDER,
  WELCOME_MESSAGE,
} from '@/domain/constant/chatbot/Chatbot';
import { APIError } from '@/domain/entities/chatbot/BackendCommunication';
import { IChat } from '@/domain/entities/chatbot/Chatbot';
import { SenderRole } from '@/domain/enums/SenderRole';
import ChatbotRepository from '@/domain/repositories/ChatbotRepository';
import ChatbotOperations from '@/operations/chatbot/Chatbot';
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
    const newChat: IChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}`, messages: [], isTyping: false };
    setChats([...chats, newChat]);
    setCurrentChatIndex(chats.length);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const setTypingStatus = (chatIndex: number, isTyping: boolean): void => {
    setChats((prevChats) => prevChats.map((chat, index) => (index === chatIndex ? { ...chat, isTyping } : chat)));
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
    const updatedChatsWithAI = structuredClone(chats);
    updatedChatsWithAI[currentChatIndex].messages.push({
      id: crypto.randomUUID(),
      content: aiResponse,
      role: SenderRole.ASSISTANT,
    });
    setChats(updatedChatsWithAI);
  };

  /**
   * Handle form submit
   * @param submitEvent is form event including key down triggered submit
   * @param promptText is requested text from user
   */
  const handleSubmit = (submitEvent: React.FormEvent, promptText: string | null = null): void => {
    if (isResponseAnimated) {
      setIsResponseAnimated(false);
      const text = promptText || input;
      const updatedChats = ChatbotOperations.processInput(submitEvent, chats, currentChatIndex, text);
      if (text.trim()) {
        setChats(updatedChats);
        setInput('');
        setIsUserMessageSent(true);
        setTypingStatus(currentChatIndex, true);
      }
    }
  };

  const handleKeyDown = (keyboardEvent: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (isResponseAnimated && keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      if (chats[currentChatIndex].isTyping) return; // prevent multiple submission
      handleSubmit(keyboardEvent);
    }
  };

  const onTypingComplete = (): void => {
    setTypingStatus(currentChatIndex, false);
    setIsResponseAnimated(true);
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
    <div
      className={clsx('absolute', {
        'inset-0 z-chatbotFullScreen': isFullScreen,
        'top-4 right-4': !isFullScreen,
        'z-chatbotExpanded': isOpen,
        'z-chatbotCollapsed': !isOpen,
      })}
    >
      {!isOpen && (
        <Tooltip text={TRIGGER_CHAT}>
          <Button
            onClick={toggleChat}
            className="
            relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full bg-content1 hover:bg-content2 shadow-md"
            aria-label="toggle chat"
          >
            <Bot size={24} />
          </Button>
        </Tooltip>
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
              isFullScreen ? 'w-screen h-dvh rounded-none' : 'w-[636px] h-[657px]',
              isSidebarOpen ? (isFullScreen ? 'sm:pl-[215px] pl-0' : 'sm:pl-[179px] pl-0') : 'pl-0',
              'overflow-hidden flex-1 flex flex-col text-black dark:text-white'
            )}
          >
            <CardHeader className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Tooltip text={isSidebarOpen ? CLOSE_SIDE_BAR : OPEN_SIDE_BAR}>
                  <Button
                    variant="light"
                    isIconOnly
                    onClick={() => setIsSidebarOpen((previousValue) => !previousValue)}
                  >
                    {isSidebarOpen ? <SidebarLeft size={24} /> : <SidebarRight size={24} />}
                  </Button>
                </Tooltip>
                <Image src="/wfp_logo.svg" width={32} height={32} alt="WFP Logo" className="mr-2" />
                <h2 className="text-lg font-semibold truncate">{CHAT_TITLE}</h2>
              </div>
              <div className="flex items-center space-x-2">
                {!isMobile && (
                  <Tooltip text={isFullScreen ? EXIT_FULL_SCREEN : ENTER_FULL_SCREEN}>
                    <Button variant="light" isIconOnly onClick={toggleFullScreen}>
                      {isFullScreen ? <Minus size={24} /> : <Maximize4 size={24} />}
                    </Button>
                  </Tooltip>
                )}
                <Tooltip text="Close Chat">
                  <Button variant="light" isIconOnly onClick={toggleChat}>
                    <CloseSquare size={24} />
                  </Button>
                </Tooltip>
              </div>
            </CardHeader>
            <Divider className="bg-chatbotDivider dark:bg-chatbotDivider" />
            <CardBody>
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

              <ScrollShadow hideScrollBar className="w-full h-full">
                {chats[currentChatIndex].messages.length === 0 ? (
                  <div className="flex flex-col items-center pt-4 space-y-4">
                    <p className="text-center text-xl max-w-[80%] mb-2">{WELCOME_MESSAGE}</p>
                    <p className="text-center text-md max-w-[80%] mb-2">{SUB_WELCOME_MESSAGE}</p>
                    <div className="flex flex-col items-center space-y-2 w-full max-w-md">
                      {DEFAULT_PROMPT.map((prompt) => (
                        <Button
                          key={prompt.id}
                          onClick={(event) => handleSubmit(event, prompt.value)}
                          className="
                              truncate w-full mb-2 max-w-[250px] sm:max-w-[400px] border border-solid border-black dark:border-white bg-transparent hover:bg-chatbotDefaultPromptHover dark:hover:bg-chatbotDefaultPromptHover
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
                      className={clsx('flex mb-4', message.role === SenderRole.USER ? 'justify-end' : 'justify-start')}
                    >
                      {message.role === SenderRole.ASSISTANT && (
                        <div className="relative flex items-center justify-center bg-transparent w-10 h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black">
                          <Bot size={24} />
                        </div>
                      )}
                      <div
                        className={clsx(
                          'mb-5 rounded-lg max-w-[80%]',
                          message.role === SenderRole.USER
                            ? 'rounded-xl p-2 bg-chatbotUserMsg dark:bg-chatbotUserMsg ml-12'
                            : 'bg-transparent pl-2 pr-2'
                        )}
                      >
                        {message.role === SenderRole.USER ? (
                          <p className="break-words text-justify">{message.content}</p>
                        ) : (
                          <TypingText
                            text={message.content}
                            textID={message.id}
                            chatIndex={currentChatIndex}
                            onTypingStart={() => setTypingStatus(currentChatIndex, false)}
                            onTypingComplete={() => onTypingComplete()}
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}

                {chats[currentChatIndex].isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="relative flex items-center justify-center bg-transparent w-10 h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black">
                      <Bot />
                    </div>
                    <TypingDots />
                  </div>
                )}
                <div ref={chatEndRef} />
              </ScrollShadow>
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
                    className="rounded-xl border border-solid border-black bg-chatbotInputArea dark:bg-chatbotInputArea flex-grow px-3 py-2 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                    rows={1}
                  />
                  <Tooltip text="Submit">
                    <Button type="submit" variant="light" isIconOnly disabled={chats[currentChatIndex].isTyping}>
                      <Send2 size={24} />
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
