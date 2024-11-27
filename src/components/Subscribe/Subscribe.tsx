'use client';

import { Button, Divider, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChartCircle, CloseCircle, Facebook, Instagram, TickCircle, Twitch, Youtube } from 'iconsax-react';
import { useCallback, useEffect, useState } from 'react';

import container from '@/container';
import {
  MANDATORY,
  SUBSCRIBE,
  SUBSCRIBE_MODAL_SUBTITLE,
  SUCCESSFUL_SUBSCRIPTION,
  UNSUCCESSFUL_SUBSCRIPTION,
} from '@/domain/constant/subscribe/Subscribe';
import { SubscribeStatus } from '@/domain/enums/SubscribeTopic';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

import { NestedPopover } from './NestedPopover';
import { SocialLink } from './SocialLink';

export default function SubscriptionForm() {
  const subscribe = container.resolve<SubscriptionRepository>('SubscriptionRepository');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string>('');
  const [options, setOptions] = useState<string[] | undefined>([]);

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(SubscribeStatus.Idle);
  const [isWaitingSubResponse, setIsWaitingSubResponse] = useState(false);

  const topics = [
    {
      id: '1',
      name: 'Topic 1',
    },
    {
      id: '2',
      name: 'Topic 2',
      options: ['Option 4', 'Option 5', 'Option 6'],
    },
    {
      id: '3',
      name: 'Topic 3',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      id: '4',
      name: 'Topic 4',
    },
  ];

  const validateEmail = useCallback((newEmail: string): boolean => {
    return !!newEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  }, []);

  const changeName = useCallback((newName: string): void => {
    setName(newName);
    setIsNameInvalid(!newName);
  }, []);

  const changeEmail = useCallback(
    (newEmail: string): void => {
      setEmail(newEmail);
      setIsEmailInvalid(!validateEmail(newEmail));
    },
    [validateEmail]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Validate the form
    const isFormInvalid = !name || !email || !validateEmail(email);

    setIsNameInvalid(!name);
    setIsEmailInvalid(!validateEmail(email));

    if (!isEmailInvalid && !isNameInvalid && !isWaitingSubResponse && !isFormInvalid) {
      setSubscribeStatus(SubscribeStatus.Loading);
      // Handle form submission here and interact with the backend
      try {
        setIsWaitingSubResponse(true);
        await subscribe
          .subscribe({
            name,
            email,
            topicId: topic,
            organization,
            options,
          })
          .then((res) => {
            if (res) {
              setSubscribeStatus(SubscribeStatus.Success);
              setIsWaitingSubResponse(false);
            } else {
              setSubscribeStatus(SubscribeStatus.Error);
              setIsWaitingSubResponse(false);
            }
          });
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    }
  };

  const handleSelectionChange = (selectedTopicId: string, selectedOptions: string[] | undefined) => {
    console.log('>>', selectedTopicId, selectedOptions);
    setTopic(selectedTopicId);
    setOptions(selectedOptions);
  };

  // use subscribe.getSubscribeTopics() to get the topics, when the component initializes
  // and set it to the state
  // useEffect(() => {
  //   subscribe.getSubscribeTopic().then((topic) => {
  //     console.log(topics);
  //     setTopics(topics);
  //   });
  // }, []);

  return (
    <div className="flex flex-col items-center">
      <Divider className="bg-subscribeText dark:bg-subscribeText" />
      <p className="mb-12 text-justify text-subscribeText dark:text-subscribeText">{SUBSCRIBE_MODAL_SUBTITLE}</p>
      <p className="text-sm italic self-start text-subscribeText dark:text-subscribeText">{MANDATORY}</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-3 w-full">
        <Input
          label="Name"
          placeholder="Please enter your name"
          color={isNameInvalid ? 'danger' : 'default'}
          isInvalid={isNameInvalid}
          errorMessage="Name is required"
          variant="faded"
          isRequired
          value={name}
          onChange={(changeNameEvent) => changeName(changeNameEvent.target.value)}
        />
        <Input
          label="Email"
          placeholder="please enter your email"
          type="email"
          variant="faded"
          isRequired
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? 'danger' : 'default'}
          errorMessage="Please enter a valid email"
          value={email}
          onChange={(changeEmailEvent) => changeEmail(changeEmailEvent.target.value)}
        />
        <Input
          label="Organization/Institution"
          placeholder="Please enter your organization"
          color="default"
          variant="faded"
          errorMessage="Please enter a valid organization"
          onChange={(changeOrgEvent) => setOrganization(changeOrgEvent.target.value)}
          value={organization}
        />
        <NestedPopover label="Topic" items={topics} onSelectionChange={handleSelectionChange} />
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
        <SocialLink href="https://twitch.com/">
          <Twitch size={24} color="#6441A4" />
        </SocialLink>
        <SocialLink href="https://facebook.com/">
          <Facebook size={24} color="#1877F2" />
        </SocialLink>
        <SocialLink href="https://youtube.com/">
          <Youtube size={24} color="#FF0000" />
        </SocialLink>
        <SocialLink href="https://instagram.com/">
          <Instagram size={24} color="#E1306C" />
        </SocialLink>
      </div>
    </div>
  );
}
