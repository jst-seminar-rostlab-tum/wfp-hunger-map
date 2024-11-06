/* eslint-disable no-nested-ternary */
import { Button, Card, CardBody } from '@nextui-org/react';
import clsx from 'clsx';
import { PlusCircle } from 'lucide-react';

import { NEW_CHAT_BUTTON } from '@/domain/constant/chatbot/Chatbot';
import { ChatbotSidebarProps } from '@/domain/props/ChatbotSidebarProps';

export default function ChatbotSidebar({
  isFullScreen,
  chats,
  currentChatIndex,
  onSelectChat,
  onStartNewChat,
}: ChatbotSidebarProps) {
  return (
    <Card
      className={clsx(
        'absolute top-0 left-0 h-full z-[9999] shadow-none',
        isFullScreen
          ? 'w-[215px] rounded-none bg-chatbotFullscreen dark:bg-chatbotFullscreen'
          : 'w-[179px] rounded-[12px_0_0_12px] bg-opacity-50 bg-chatbotSidebar dark:bg-chatbotSidebar'
      )}
    >
      <CardBody className="p-4">
        <Button
          onClick={onStartNewChat}
          className="bg-transparent w-full h-10 mb-4 flex justify-center items-center gap-2 border-2 border-solid border-black dark:border-white text-black dark:text-white hover:bg-chatbotSidebarBtnHover dark:hover:bg-chatbotSidebarBtnHover"
        >
          <PlusCircle className="h-4 w-4 text-black dark:text-white" />
          <span className="truncate text-black dark:text-white">{NEW_CHAT_BUTTON}</span>
        </Button>
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          {chats.map((chat, index) => (
            <Button
              key={chat.id}
              onClick={() => onSelectChat(index)}
              className={clsx(
                'text-black dark:text-white bg-transparent hover:bg-chatbotSidebarBtnHover dark:hover:bg-chatbotSidebarBtnHover justify-start w-full h-10 mb-3 flex gap-2',
                currentChatIndex === index ? 'bg-chatbotSidebarBtnHover dark:bg-chatbotSidebarBtnHover' : ''
              )}
            >
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
