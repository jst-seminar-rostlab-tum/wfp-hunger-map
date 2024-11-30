import { useDisclosure } from '@nextui-org/modal';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

interface AccordionsModalState {
  openButtonVisible: boolean;
  setOpenButtonVisible: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

const AccordionsModalContext = createContext<AccordionsModalState | undefined>(undefined);

export function AccordionsModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openButtonVisible, setOpenButtonVisible] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
      onOpenChange,
      openButtonVisible,
      setOpenButtonVisible,
    }),
    [isOpen, openButtonVisible]
  );

  return <AccordionsModalContext.Provider value={value}> {children} </AccordionsModalContext.Provider>;
}

export function useAccordionsModal() {
  const context = useContext(AccordionsModalContext);
  if (!context) {
    throw new Error('useAccordionsModal must be used within a AccordionsModalContext');
  }
  return context;
}
