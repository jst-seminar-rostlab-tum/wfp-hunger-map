export default interface InformationPopupProps {
  isOpen: boolean;
  title: string;
  content: {
    subtitle: string;
    text: string;
  }[];
  warning: boolean;
}
