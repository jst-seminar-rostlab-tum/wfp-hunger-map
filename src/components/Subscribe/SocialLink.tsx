import { motion } from 'framer-motion';

import { SocialLinkProps } from '@/domain/props/SocialLinkProps';

export function SocialLink({ href, children }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-2 rounded-full transition-colors"
      whileHover={{ scale: 1.5, zIndex: 1 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </motion.a>
  );
}
