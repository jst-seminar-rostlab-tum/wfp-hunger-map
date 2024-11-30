import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

interface AccordionsModalState {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode | null>>;
}

const AccordionsModalContext = createContext<AccordionsModalState | undefined>(undefined);

export function AccordionsModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const value = useMemo(
    () => ({
      modalContent,
      setModalContent,
    }),
    [modalContent]
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
