'use client';

import { Divider, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitch, Youtube } from 'iconsax-react';
import { useCallback, useEffect, useState } from 'react';

import container from '@/container';
import {
  EMAIL_MANDATORY_MSG,
  MANDATORY,
  NAME_MANDATORY_MSG,
  ORGANISATION_MANADATORY_MSG,
  SUBSCRIBE,
  SUBSCRIBE_MODAL_SUBTITLE,
  SUCCESSFUL_SUBSCRIPTION,
  TOPIC_MANDATORY_MSG,
  UNSUCCESSFUL_SUBSCRIPTION,
} from '@/domain/constant/subscribe/Subscribe';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { ITopic } from '@/domain/entities/subscribe/Subscribe';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SubmitStatus } from '@/domain/enums/SubscribeTopic';
import SubscriptionRepository from '@/domain/repositories/SubscriptionRepository';

import { SubmitButton } from '../SubmitButton/SubmitButton';
import { NestedPopover } from './NestedPopover';
import { SocialLink } from './SocialLink';

export default function SubscriptionForm() {
  const subscribe = container.resolve<SubscriptionRepository>('SubscriptionRepository');
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string | undefined>('');
  const [options, setOptions] = useState<string[] | undefined>([]);
  const [availableTopics, setAvailableTopics] = useState<ITopic[]>([]);

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isOrgInvalid, setIsOrgInvalid] = useState(false);
  const [isTopicInvalid, setIsTopicInvalid] = useState(false);

  const [subscribeStatus, setSubscribeStatus] = useState<SubmitStatus>(SubmitStatus.Idle);
  const [isWaitingSubResponse, setIsWaitingSubResponse] = useState(false);

  const { showSnackBar } = useSnackbar();

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

  const changeOrganisation = useCallback((newOrg: string): void => {
    setOrganisation(newOrg);
    setIsOrgInvalid(!newOrg);
  }, []);

  const handleSelectionChange = (selectedTopic: ITopic | undefined) => {
    setTopic(selectedTopic?.topic_id);
    setIsTopicInvalid(!selectedTopic);
    setOptions(selectedTopic?.options?.map((option) => option.report_id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Validate the form
    const isFormInvalid = !name || !email || !validateEmail(email) || !topic || !organisation;

    setIsNameInvalid(!name);
    setIsEmailInvalid(!validateEmail(email));
    setIsOrgInvalid(!organisation);
    setIsTopicInvalid(!topic);

    if (
      !isEmailInvalid &&
      !isNameInvalid &&
      !isWaitingSubResponse &&
      !isFormInvalid &&
      !isOrgInvalid &&
      !isTopicInvalid
    ) {
      setSubscribeStatus(SubmitStatus.Loading);
      // Handle form submission here and interact with the backend
      try {
        setIsWaitingSubResponse(true);
        await subscribe
          .subscribe({
            name,
            email,
            organisation,
            country_ids: options,
            topic_id: topic,
          })
          .then((res) => {
            if (res) {
              setSubscribeStatus(SubmitStatus.Success);
              setIsWaitingSubResponse(false);
              showSnackBar({
                message: 'Your action was successful!',
                status: SnackbarStatus.Success,
                position: SnackbarPosition.RightMiddle,
                duration: 300000,
              });
            } else {
              setSubscribeStatus(SubmitStatus.Error);
              setIsWaitingSubResponse(false);
              showSnackBar({
                message: 'Your action was failed!',
                status: SnackbarStatus.Success,
                position: SnackbarPosition.RightMiddle,
                duration: 300000,
              });
            }
          });
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    }
  };

  // use subscribe.getSubscribeTopics() to get the topics, when the component initializes
  // and set it to the state
  useEffect(() => {
    subscribe.getSubscribeTopic().then((topics) => {
      setAvailableTopics(topics);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Divider className="bg-subscribeText dark:bg-subscribeText" />
      <p className="mb-12 text-justify text-subscribeText dark:text-subscribeText">{SUBSCRIBE_MODAL_SUBTITLE}</p>
      <p className="text-sm italic self-start text-subscribeText dark:text-subscribeText">{MANDATORY}</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1 mb-3 w-full">
        <Input
          label="Name"
          placeholder="Please enter your name"
          color={isNameInvalid ? 'danger' : 'default'}
          isInvalid={isNameInvalid}
          errorMessage={NAME_MANDATORY_MSG}
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
          errorMessage={EMAIL_MANDATORY_MSG}
          value={email}
          onChange={(changeEmailEvent) => changeEmail(changeEmailEvent.target.value)}
        />
        <Input
          label="Organization/Institution"
          placeholder="Please enter your organization"
          color="default"
          variant="faded"
          isRequired
          isInvalid={isOrgInvalid}
          errorMessage={ORGANISATION_MANADATORY_MSG}
          onChange={(changeOrgEvent) => changeOrganisation(changeOrgEvent.target.value)}
          value={organisation}
        />
        <NestedPopover items={availableTopics} onSelectionChange={handleSelectionChange} />
        {isTopicInvalid && <p className="p-1 text-red-500 text-sm self-start">{TOPIC_MANDATORY_MSG}</p>}
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
