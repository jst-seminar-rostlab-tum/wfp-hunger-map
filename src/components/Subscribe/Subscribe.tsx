'use client';

import { Button, Divider, Image, Input, Select, SelectItem } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChartCircle, CloseCircle, TickCircle } from 'iconsax-react';
import { useMemo, useState } from 'react';

import container from '@/container';
import {
  FOLLOW_US,
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
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(SubscribeStatus.Idle);

  const validateEmail = (): boolean => !!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return !validateEmail();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubscribeStatus(SubscribeStatus.Loading);
    // Handle form submission here and interact with the backend
    try {
      /* const response = await subscribe.subscribe({
        name,
        email,
        selectedTopic,
        organization,
      }); */
      const response = false;
      if (response) {
        setTimeout(() => {
          setSubscribeStatus(SubscribeStatus.Success);
        }, 2000);
      } else {
        setTimeout(() => {
          setSubscribeStatus(SubscribeStatus.Error);
        }, 2000);
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex flex-col items-start">
      <Divider className="bg-subscribeText dark:bg-subscribeText" />
      <p className="mb-6 mt-3  text-justify text-subscribeText dark:text-subscribeText">{SUBSCRIBE_MODAL_SUBTITLE}</p>
      <form onSubmit={handleSubmit} className="space-y-4 mb-3">
        <Input
          placeholder="Name*"
          variant="bordered"
          isRequired
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Organization/Institution"
          variant="bordered"
          onChange={(e) => setOrganization(e.target.value)}
          value={organization}
        />
        <Select
          placeholder="Select a topic"
          selectedKeys={selectedTopic ? [selectedTopic] : []}
          onSelectionChange={(keys) => setSelectedTopic(Array.from(keys)[0] as string)}
          variant="bordered"
          value={selectedTopic}
        >
          {Object.entries(SubscribeTopic).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </Select>
        <Input
          placeholder="Email*"
          type="email"
          variant="bordered"
          isRequired
          isInvalid={isInvalid}
          color={isInvalid ? 'danger' : 'default'}
          errorMessage="Please enter a valid email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-sm italic text-subscribeText dark:text-subscribeText">{MANDATORY}</p>

        <Button
          type="submit"
          radius="full"
          className="bg-subscribeText dark:bg-subscribeText text-white dark:text-black shadow-lg"
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

      <Divider className="bg-subscribeText" />
      <p className="text-lg text-subscribeText dark:text-subscribeText">{FOLLOW_US}</p>
      <div className="flex gap-4">
        <Button
          isIconOnly
          variant="light"
          as="a"
          href="https://x.com/"
          aria-label="Visit our twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/twitter.png" width={32} height={32} alt="Twitter Logo" className="mr-2" />
        </Button>

        <Button
          isIconOnly
          variant="light"
          as="a"
          href="#"
          aria-label="Visit our vam tube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/vamtube.jpg" width={32} height={32} alt="Vamtube Logo" className="mr-2" />
        </Button>
      </div>
    </div>
  );
}
