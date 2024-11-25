import { InfoCircle } from 'iconsax-react';
import PropTypes from 'prop-types';
import React from 'react';

function CustomInfoCircle({ style, ...props }: React.ComponentProps<typeof InfoCircle>) {
  return (
    <InfoCircle
      {...props}
      style={{
        transform: 'rotate(180deg)',
        ...style,
      }}
    />
  );
}
CustomInfoCircle.propTypes = {
  style: PropTypes.shape({
    transform: PropTypes.string,
  }),
};

export default CustomInfoCircle;
