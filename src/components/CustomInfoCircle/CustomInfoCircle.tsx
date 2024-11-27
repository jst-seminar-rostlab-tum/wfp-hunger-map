import { InfoCircle } from 'iconsax-react';
import PropTypes from 'prop-types';
import React from 'react';

function CustomInfoCircle({ className, ...props }: React.ComponentProps<typeof InfoCircle>) {
  return <InfoCircle {...props} className={`rotate-180 ${className}`} />;
}
CustomInfoCircle.propTypes = {
  className: PropTypes.string,
};

export default CustomInfoCircle;
