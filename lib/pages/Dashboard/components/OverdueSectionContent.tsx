import { Box, Button } from '@mui/material';
import React from 'react';
import { Text } from '@lipihipi/rtc-ui-components';
import Chip from '@mui/material/Chip';

const OverdueSectionContent = ({
  heading,
  subheading1,
  subheading2,
  button,
  icon,
  overdueData,
}: any) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1.5rem',
          background: '#fff',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ marginRight: '1rem' }}>
            <img src={icon} alt="" width="46px" />
          </Box>
          <Box>
            <Box>
              <Text variant="body1" sx={{ fontWeight: '800', width: '100%' }}>
                {heading}
              </Text>
            </Box>
            <Box className="subheading1">
              <Box>
                <Text
                  variant="body1"
                  sx={{ fontWeight: '400', marginBottom: '0.5rem' }}
                >
                  {subheading1}
                </Text>
              </Box>
            </Box>
            <Box className="subheading2">
              <Box>
                <Text
                  variant="body2"
                  sx={{ fontWeight: '400', marginBottom: '0.5rem' }}
                >
                  {subheading2}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {button && (
          <Chip
            sx={{ background: '#FFE6E6', color: '#BE0203' }}
            label={overdueData}
            color="primary"
          />
        )}
      </Box>
    </div>
  );
};

export default OverdueSectionContent;
