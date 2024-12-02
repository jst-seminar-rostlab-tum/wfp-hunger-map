import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChartCircle, CloseCircle, TickCircle } from 'iconsax-react';

import { SubmitStatus } from '@/domain/enums/SubscribeTopic';
import { SubmitButtonProps } from '@/domain/props/SubmitButtonProps';

export function SubmitButton({ label, submitStatus, className }: SubmitButtonProps) {
  return (
    <Button type="submit" className={className}>
      <motion.span initial={{ opacity: 1 }} animate={{ opacity: submitStatus === SubmitStatus.Idle ? 1 : 0 }}>
        {label}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: submitStatus === SubmitStatus.Loading ? 1 : 0 }}
      >
        <ChartCircle size={24} className="animate-spin" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: submitStatus === SubmitStatus.Success ? 1 : 0 }}
      >
        <TickCircle size={24} className="text-green-500" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: submitStatus === SubmitStatus.Error ? 1 : 0 }}
      >
        <CloseCircle size={24} className="text-red-500" />
      </motion.span>
    </Button>
  );
}
