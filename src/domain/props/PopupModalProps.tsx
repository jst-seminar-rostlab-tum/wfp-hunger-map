export default interface PopupModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  modalTitle: string;
  modalSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  modalHeight?: string;
  children: React.ReactNode; // modalBody
}
