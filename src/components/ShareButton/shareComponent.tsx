import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, IconButton, Modal, Stack } from '@mui/material';
import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';

import { Tooltip } from '../Tooltip/Tooltip';

interface ShareButtonProps {
  text: string;
  url: string;
}

function ShareButton({ text, url }: ShareButtonProps) {
  const [openModal, setOpenModal] = useState(false);
  const { showSnackBar } = useSnackbar();
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#ECEDEE' : '#000000';

  const message = encodeURIComponent(`${text} ${url}`);

  // Share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Check%20this%20out&body=${message}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      showSnackBar({
        message: 'Link copied to clipboard!',
        status: SnackbarStatus.Success,
        position: SnackbarPosition.BottomMiddle,
        duration: 1500,
      });
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {/* Main Share Button */}
      <Button
        onClick={handleOpenModal}
        startContent={<ShareIcon />}
        color="primary"
        className="flex items-center space-x-2 text-white"
        variant="solid"
      >
        Share
      </Button>

      {/* Modal for share options */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '290px',
            right: '15px',
            zIndex: 9999,
            transform: 'translate(-50%, -50%)',
            width: 100,
            boxShadow: 24,
            borderRadius: '8px',
            backgroundColor: theme === 'dark' ? '#000000' : '#ECEDEE',
          }}
        >
          <Stack spacing={2} direction="column" alignItems="center" sx={{ mt: 2 }}>
            {/* Vertically aligned icons */}
            <div className="flex flex-col items-center space-y-4 py-3">
              {/* Copy URL Icon */}
              <Tooltip text="Copy URL" placement="left">
                <IconButton
                  onClick={handleCopy}
                  sx={{
                    color: iconColor,
                    ':hover': { color: '#1e40af' },
                  }}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              {/* WhatsApp Share Icon */}
              <Tooltip text="WhatsApp" placement="left">
                <IconButton
                  onClick={handleWhatsAppShare}
                  sx={{
                    color: iconColor,
                    ':hover': { color: 'green' },
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Tooltip>

              {/* Email Share Icon */}
              <Tooltip text="Email" placement="left">
                <IconButton
                  onClick={handleEmailShare}
                  sx={{
                    color: iconColor,
                    ':hover': { color: '#f44336' },
                  }}
                >
                  <EmailIcon />
                </IconButton>
              </Tooltip>

              {/* Facebook Share Icon */}
              <Tooltip text="Facebook" placement="left">
                <IconButton
                  onClick={handleFacebookShare}
                  sx={{
                    color: iconColor,
                    ':hover': { color: '#1877F2' },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Tooltip>

              {/* Twitter Share Icon */}
              <Tooltip text="X" placement="left">
                <IconButton
                  onClick={handleTwitterShare}
                  sx={{
                    color: iconColor,
                    ':hover': { color: '#1DA1F2' },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </Tooltip>

              {/* LinkedIn Share Icon */}
              <Tooltip text="LinkedIn" placement="left">
                <IconButton
                  onClick={handleLinkedInShare}
                  sx={{
                    color: iconColor,
                    ':hover': { color: '#0077b5' },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
export default ShareButton;
