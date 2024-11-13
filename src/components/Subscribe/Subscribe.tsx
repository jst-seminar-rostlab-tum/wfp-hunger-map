'use client';

import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChartCircle, CloseCircle, Facebook, Instagram, TickCircle, Twitch, Youtube } from 'iconsax-react';
import { useState } from 'react';

import container from '@/container';
import {
  MANDATORY,
  SUBSCRIBE,
  SUBSCRIBE_MODAL_SUBTITLE,
  SUCCESSFUL_SUBSCRIPTION,
  UNSUCCESSFUL_SUBSCRIPTION,
} from '@/domain/constant/subscribe/Subscribe';
import { SubscribeStatus, SubscribeTopic } from '@/domain/enums/SubscribeTopic';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

export default function SubscriptionForm() {
  const subscribe = container.resolve<SubscriptionRepository>('SubscriptionRepository');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const [isNameInvalid, setIsNameInvalid] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);

  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(SubscribeStatus.Idle);
  const [isWaitingSubResponse, setIsWaitingSubResponse] = useState(false);

  const validateEmail = (newEmail: string): boolean => !!newEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Validate the form
    if (!isEmailInvalid && !isNameInvalid && !isWaitingSubResponse) {
      setSubscribeStatus(SubscribeStatus.Loading);
      // Handle form submission here and interact with the backend
      try {
        // TODO: backend integration not working rn
        console.log('>>', { name, email, selectedTopic, organization });
        setIsWaitingSubResponse(true);
        // let response = await subscribe.subscribe({
        //   name,
        //   email,
        //   selectedTopic,
        //   organization,
        // }).then((res) => res.data);
        // TODO: Mock response to be removed later
        const response = false;
        if (response) {
          setTimeout(() => {
            setSubscribeStatus(SubscribeStatus.Success);
            setIsWaitingSubResponse(false);
          }, 2000);
        } else {
          setTimeout(() => {
            setSubscribeStatus(SubscribeStatus.Error);
            setIsWaitingSubResponse(false);
          }, 2000);
        }
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    }
  };

  const changeName = (newName: string): void => {
    setName(newName);
    if (newName) {
      setIsNameInvalid(false);
    } else {
      setIsNameInvalid(true);
    }
  };

  const changeEmail = (newEmail: string): void => {
    setEmail(newEmail);
    if (newEmail && validateEmail(newEmail)) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Divider className="bg-subscribeText dark:bg-subscribeText" />
      <p className="mb-12 text-justify text-subscribeText dark:text-subscribeText">{SUBSCRIBE_MODAL_SUBTITLE}</p>
      <p className="text-sm italic self-start text-subscribeText dark:text-subscribeText">{MANDATORY}</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-3 w-full">
        <Input
          placeholder="Name*"
          color={isNameInvalid ? 'danger' : 'primary'}
          isInvalid={isNameInvalid}
          errorMessage="Name is required"
          variant="faded"
          isRequired
          classNames={{
            input: ['placeholder:text-black dark:placeholder:text-white'],
          }}
          value={name}
          onChange={(changeNameEvent) => changeName(changeNameEvent.target.value)}
        />
        <Input
          placeholder="Email*"
          type="email"
          variant="faded"
          isRequired
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? 'danger' : 'primary'}
          errorMessage="Please enter a valid email"
          classNames={{
            input: ['placeholder:text-black dark:placeholder:text-white'],
          }}
          value={email}
          onChange={(changeEmailEvent) => changeEmail(changeEmailEvent.target.value)}
        />
        <Input
          placeholder="Organization/Institution"
          color="primary"
          variant="faded"
          classNames={{
            input: ['placeholder:text-black dark:placeholder:text-white'],
          }}
          errorMessage="Please enter a valid organization"
          onChange={(changeOrgEvent) => setOrganization(changeOrgEvent.target.value)}
          value={organization}
        />
        <Select
          placeholder="Select a topic"
          selectedKeys={selectedTopic ? [selectedTopic] : []}
          onSelectionChange={(keys) => setSelectedTopic(Array.from(keys)[0] as string)}
          color="primary"
          variant="faded"
          errorMessage="Please select a valid topic"
          value={selectedTopic}
        >
          {Object.entries(SubscribeTopic).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </Select>

        <Button
          type="submit"
          className="w-full bg-subscribeText dark:bg-subscribeText text-white dark:text-black shadow-lg self-center"
        >
          <motion.span initial={{ opacity: 1 }} animate={{ opacity: subscribeStatus === SubscribeStatus.Idle ? 1 : 0 }}>
            {SUBSCRIBE}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: subscribeStatus === SubscribeStatus.Loading ? 1 : 0 }}
          >
            <ChartCircle size={24} className="animate-spin" />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: subscribeStatus === SubscribeStatus.Success ? 1 : 0 }}
          >
            <TickCircle size={24} className="text-green-500" />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: subscribeStatus === SubscribeStatus.Error ? 1 : 0 }}
          >
            <CloseCircle size={24} className="text-red-500" />
          </motion.span>
        </Button>
        {subscribeStatus === SubscribeStatus.Success && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 mt-4 text-center"
          >
            {SUCCESSFUL_SUBSCRIPTION}
          </motion.p>
        )}
        {subscribeStatus === SubscribeStatus.Error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 mt-4 text-center"
          >
            {UNSUCCESSFUL_SUBSCRIPTION}
          </motion.p>
        )}
      </form>

      <div className="flex gap-1">
        <motion.a
          key={0}
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.5, zIndex: 1 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <Twitch size={24} />
        </motion.a>

        <motion.a
          key={1}
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.5, zIndex: 1 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <Facebook size={24} />
        </motion.a>

        <motion.a
          key={2}
          href="https://youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.5, zIndex: 1 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <Youtube size={24} />
        </motion.a>

        <motion.a
          key={3}
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2 rounded-full transition-colors"
          whileHover={{ scale: 1.5, zIndex: 1 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
          <Instagram size={24} />
        </motion.a>
      </div>
    </div>
  );
}
