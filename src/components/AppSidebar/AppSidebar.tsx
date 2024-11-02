'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
// import { useState } from 'react';

export function AppSidebar() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {/* <div>asd</div> */}
      <div className="absolute top-0 left-0 z-50 h-screen p-4">
        <Card className="h-full">
          <CardHeader>HungerMap LIVE</CardHeader>
          <CardBody>
            <Listbox variant="flat" aria-label="Listbox menu with sections">
              <ListboxSection title="Global Insights">
                <ListboxItem key="food">Food consumption</ListboxItem>
                <ListboxItem key="nutr">Nutrition</ListboxItem>
                <ListboxItem key="vege">Vegetation</ListboxItem>
                <ListboxItem key="rain">Rainfall</ListboxItem>
                <ListboxItem key="ipc">IPC/CH</ListboxItem>
              </ListboxSection>
              <ListboxSection title="Alerts" />
            </Listbox>
          </CardBody>
          <CardFooter className="flex flex-col items-start">
            <Chip as="button" onClick={() => alert('Subscribe!')} color="primary">
              SUBSCRIBE
            </Chip>

            <Listbox variant="flat" aria-label="Listbox menu with sections">
              <ListboxItem key="home">Home</ListboxItem>
              <ListboxItem key="about">About</ListboxItem>
              <ListboxItem key="gloss">Glossary</ListboxItem>
              <ListboxItem key="methd">Methodology</ListboxItem>
              <ListboxItem key="disc">Disclaimer</ListboxItem>
            </Listbox>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
