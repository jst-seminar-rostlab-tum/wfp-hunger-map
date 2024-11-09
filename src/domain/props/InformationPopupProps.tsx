export default interface InformationPopupProps {
  popupOpen: boolean;
  closePopup: () => void;
  title: string;
  content: {
    subtitle?: string;
    textSections: string[];
  }[];
  warning?: boolean;
}
