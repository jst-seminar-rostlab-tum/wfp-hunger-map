'use client';

import { Divider, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitch, Youtube } from 'iconsax-react';
import { useCallback, useState } from 'react';

import container from '@/container';
import {
  MANDATORY,
  SUBSCRIBE,
  SUBSCRIBE_MODAL_SUBTITLE,
  SUCCESSFUL_SUBSCRIPTION,
  UNSUCCESSFUL_SUBSCRIPTION,
} from '@/domain/constant/subscribe/Subscribe';
import { SubmitStatus } from '@/domain/enums/SubscribeTopic';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

import { SubmitButton } from '../SubmitButton/SubmitButton';
import { SocialLink } from './SocialLink';

export default function SubscriptionForm() {
  const subscribe = container.resolve<SubscriptionRepository>('SubscriptionRepository');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const selectedTopic = '';

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const [subscribeStatus, setSubscribeStatus] = useState<SubmitStatus>(SubmitStatus.Idle);
  const [isWaitingSubResponse, setIsWaitingSubResponse] = useState(false);

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
      setSubscribeStatus(SubmitStatus.Loading);
      // Handle form submission here and interact with the backend
      try {
        setIsWaitingSubResponse(true);
        // TODO: backend integration not working rn
        await subscribe
          .subscribe({
            name,
            email,
            selectedTopic,
            organization,
          })
          .then((res) => {
            if (res) {
              setSubscribeStatus(SubmitStatus.Success);
              setIsWaitingSubResponse(false);
            } else {
              setSubscribeStatus(SubmitStatus.Error);
              setIsWaitingSubResponse(false);
            }
          });
        // TODO: Mock response to be removed later
        // console.log({
        //   name,
        //   email,
        //   selectedTopic,
        //   organization,
        // });
        // const response = false;
        // if (response) {
        //   setTimeout(() => {
        //     setSubscribeStatus(SubscribeStatus.Success);
        //     setIsWaitingSubResponse(false);
        //   }, 2000);
        // } else {
        //   setTimeout(() => {
        //     setSubscribeStatus(SubscribeStatus.Error);
        //     setIsWaitingSubResponse(false);
        //   }, 2000);
        // }
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    }
  };

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

        <SubmitButton
          label={SUBSCRIBE}
          submitStatus={subscribeStatus}
          className="w-full bg-subscribeText dark:bg-subscribeText text-white dark:text-black shadow-lg self-center"
        />
        {subscribeStatus === SubmitStatus.Success && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 mt-4 text-center"
          >
            {SUCCESSFUL_SUBSCRIPTION}
          </motion.p>
        )}
        {subscribeStatus === SubmitStatus.Error && (
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
