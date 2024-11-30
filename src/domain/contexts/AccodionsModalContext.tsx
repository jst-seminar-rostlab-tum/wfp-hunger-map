import { useDisclosure } from '@nextui-org/modal';
import { createContext, useContext, useMemo } from 'react';

interface AccordionsModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

const AccordionsModalContext = createContext<AccordionsModalState | undefined>(undefined);

export function AccordionsModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const value = useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
      onOpenChange,
    }),
    [isOpen] // todo linus check
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
