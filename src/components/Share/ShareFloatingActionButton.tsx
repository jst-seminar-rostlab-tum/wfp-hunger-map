import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useEffect, useState } from 'react';

export function ShareFloatingActionButton() {
  const [message, setMessage] = useState<string>();

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Check%20this%20out&body=${message}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${message}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${message}`, '_blank');
  };

  useEffect(() => {
    setMessage(encodeURIComponent(window.location.href));
  }, []);

  return (
    <Dropdown placement="top">
      <DropdownTrigger>
        <Button
          variant="solid"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg focus:outline-none"
          isIconOnly
        >
          <ShareIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Share Options">
        <DropdownItem key="link" onClick={handleLinkCopy} startContent={<LinkIcon />}>
          Copy Link
        </DropdownItem>
        <DropdownItem key="whatsapp" onClick={handleWhatsAppShare} startContent={<WhatsAppIcon />}>
          WhatsApp
        </DropdownItem>
        <DropdownItem key="email" onClick={handleEmailShare} startContent={<EmailIcon />}>
          Email
        </DropdownItem>
        <DropdownItem key="facebook" onClick={handleFacebookShare} startContent={<FacebookIcon />}>
          Facebook
        </DropdownItem>
        <DropdownItem key="twitter" onClick={handleTwitterShare} startContent={<TwitterIcon />}>
          Twitter
        </DropdownItem>
        <DropdownItem key="linkedin" onClick={handleLinkedInShare} startContent={<LinkedInIcon />}>
          LinkedIn
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
