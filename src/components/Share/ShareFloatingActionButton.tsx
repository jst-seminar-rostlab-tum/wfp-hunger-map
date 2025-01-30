import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Facebook, Link1, Whatsapp } from 'iconsax-react';
import { Linkedin, Mail, Share2, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';

export function ShareFloatingActionButton() {
  const [message, setMessage] = useState<string>();
  const { showSnackBar } = useSnackbar();

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showSnackBar({
        message: 'Link copied to clipboard!',
        status: SnackbarStatus.Success,
        position: SnackbarPosition.BottomMiddle,
        duration: SNACKBAR_SHORT_DURATION,
      });
    });
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
          <Share2 />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Share Options">
        <DropdownItem key="link" onPress={handleLinkCopy} startContent={<Link1 />}>
          Copy Link
        </DropdownItem>
        <DropdownItem key="whatsapp" onPress={handleWhatsAppShare} startContent={<Whatsapp />}>
          WhatsApp
        </DropdownItem>
        <DropdownItem key="email" onPress={handleEmailShare} startContent={<Mail />}>
          Email
        </DropdownItem>
        <DropdownItem key="facebook" onPress={handleFacebookShare} startContent={<Facebook />}>
          Facebook
        </DropdownItem>
        <DropdownItem key="twitter" onPress={handleTwitterShare} startContent={<XIcon />}>
          X
        </DropdownItem>
        <DropdownItem key="linkedin" onPress={handleLinkedInShare} startContent={<Linkedin />}>
          LinkedIn
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
