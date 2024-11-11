'use client';

import { Button, Divider, Image, Input, Select, SelectItem } from '@nextui-org/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { FOLLOW_US, MANDATORY, PAGE_SUBTITLE, PAGE_TITLE } from '@/domain/constant/subscribe/Subscribe';
import { SubscribeTopic } from '@/domain/enums/SubscribeTopic';

export default function SubscriptionForm() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const isSidebarOpen = false;

  const validateEmail = (): boolean => !!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return !validateEmail();
  }, [email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission here and interact with the backend
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-start bg-subscribePage pl-[320px] z-50 pr-12',
        isSidebarOpen ? 'pl-[320px]' : 'pl-16'
      )}
    >
      <h3 className="text-2xl font-semibold mt-12 mb-4 text-subscribeText">{PAGE_TITLE}</h3>
      <Divider className="bg-subscribeText" />
      <div className="flex flex-row mt-6 justify-between">
        <div className="md:w-[400px] w-[250px]">
          <p className="mb-6 text-justify text-subscribeText">{PAGE_SUBTITLE}</p>
          <form onSubmit={handleSubmit} className="space-y-4 mb-12">
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
            <Button type="submit" radius="full" className="bg-subscribeText text-white shadow-lg">
              Subscribe
            </Button>
            <p className="text-sm italic text-subscribeText">{MANDATORY}</p>
          </form>
        </div>
        <div>
          <Image src="/wfp-logo.png" width={400} height={400} alt="Subscribe" />
        </div>
      </div>
      <Divider className="bg-subscribeText" />
      <div className="flex flex-row mt-3">
        <div>
          <p className="text-lg text-subscribeText">{FOLLOW_US}</p>
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
        <div className="flex flex-row justify-end">
          <Image src="/wfp-logo.png" width={200} height={200} alt="Subscribe" />
          <Image src="/wfp-logo.png" width={200} height={200} alt="Subscribe" />
        </div>
      </div>
    </div>
  );
}
