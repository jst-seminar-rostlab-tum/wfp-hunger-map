import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Facebook, Link1, Whatsapp } from 'iconsax-react';
import { Linkedin, Mail, Share2, XIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useMemo } from 'react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { useMediaQuery } from '@/utils/resolution';

export function ShareButton({ buttonStyle }: { buttonStyle: 'default' | 'floating' }) {
  const { showSnackBar } = useSnackbar();
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 700px)');

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

  const handleShare = (urlStart: string) => {
    window.open(urlStart + encodeURIComponent(window.location.href), '_blank');
  };

  const button = useMemo(
    () =>
      ({
        default: (
          <Button
            startContent={<Share2 />}
            color="primary"
            className="flex items-center space-x-2 text-white"
            variant="solid"
            isIconOnly={isMobile}
          >
            {isMobile ? null : 'Share'}
          </Button>
        ),
        floating: (
          <Button
            variant="solid"
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg focus:outline-none"
            isIconOnly
          >
            <Share2 color={theme === 'light' ? 'white' : 'black'} />
          </Button>
        ),
      })[buttonStyle],
    [buttonStyle, isMobile]
  );

  return (
    <Dropdown placement={buttonStyle === 'floating' ? 'top' : 'bottom'}>
      <DropdownTrigger>{button}</DropdownTrigger>
      <DropdownMenu aria-label="Share Options">
        <DropdownItem key="link" onClick={handleLinkCopy} startContent={<Link1 />}>
          Copy Link
        </DropdownItem>
        <DropdownItem key="whatsapp" onClick={() => handleShare('https://wa.me/?text=')} startContent={<Whatsapp />}>
          WhatsApp
        </DropdownItem>
        <DropdownItem key="email" onClick={() => handleShare('mailto:?body=')} startContent={<Mail />}>
          Email
        </DropdownItem>
        <DropdownItem
          key="facebook"
          onClick={() => handleShare('https://www.facebook.com/sharer/sharer.php?u=')}
          startContent={<Facebook />}
        >
          Facebook
        </DropdownItem>
        <DropdownItem
          key="twitter"
          onClick={() => handleShare('https://twitter.com/intent/tweet?url=')}
          startContent={<XIcon />}
        >
          X
        </DropdownItem>
        <DropdownItem
          key="linkedin"
          onClick={() => handleShare('https://www.linkedin.com/sharing/share-offsite/?url=')}
          startContent={<Linkedin />}
        >
          LinkedIn
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
