import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

/**
 * AccordionsModalState is an interface that defines the state of the AccordionsModalContext.
 * @property {ReactNode | null} modalContent - The content of the modal.
 * @property {Dispatch<SetStateAction<ReactNode | null>>} setModalContent - A function that sets the content of the modal.
 * @property {string} modalTitle - The title of the modal.
 * @property {Dispatch<SetStateAction<string>>} setModalTitle - A function that sets the title of the modal.
 * @property {() => void} clearAccordionModal - A function that clears the content of the modal.
 */
interface AccordionsModalState {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode | null>>;
  modalTitle: string;
  setModalTitle: Dispatch<SetStateAction<string>>;
  clearAccordionModal: () => void;
}

/**
 * AccordionsModalContext is a context that provides the state of the accordions modal.
 */

const AccordionsModalContext = createContext<AccordionsModalState | undefined>(undefined);

/** AccordionsModalProvider is a provider component that wraps the children components and provides the AccordionsModalContext
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children : The children components to wrap with the provider.
 * @returns {JSX.Element} : The children components wrapped with the provider.
 */

export function AccordionsModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const clearAccordionModal = () => setModalContent(null);

  const value = useMemo(
    () => ({
      modalContent,
      setModalContent,
      modalTitle,
      setModalTitle,
      clearAccordionModal,
    }),
    [modalContent]
  );

  return <AccordionsModalContext.Provider value={value}> {children} </AccordionsModalContext.Provider>;
}

/** useAccordionsModal is a custom hook that returns the context value of the AccordionsModalContext
 * @throws {Error} : If the hook is not used within a AccordionsModalContext.
 * @returns {AccordionsModalState} : The context value of the AccordionsModalContext.
 */

export function useAccordionsModal() {
  const context = useContext(AccordionsModalContext);
  if (!context) {
    throw new Error('useAccordionsModal must be used within a AccordionsModalContext');
  }
  return context;
}
