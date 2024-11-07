import { Box, Button } from "@mui/material";
import React from "react";
import { Text } from "@lipihipi/rtc-ui-components";

const DisplayInfo = ({
  heading,
  subheading1,
  subheading2,
  button,
  noBorder,
  onButtonClick,
}: any) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 1.5rem 1rem",
          borderBottom: noBorder ? "none" : "1px solid #E2E2E2",
        }}
      >
        <Box>
          <Box className="heading">
            <Box>
              <Text
                variant="body1"
                sx={{ fontWeight: "800", width: "100%", mb: "5px" }}
              >
                {heading}
              </Text>
            </Box>
          </Box>
          <Box className="subheading1">
            <Box>
              <Text
                variant="body1"
                sx={{ fontWeight: "400", marginBottom: "5px" }}
              >
                {subheading1}
              </Text>
            </Box>
          </Box>
          <Box className="subheading2">
            <Box>
              <Text
                variant="body2"
                sx={{ fontWeight: "400", marginBottom: "0.5rem" }}
              >
                {subheading2}
              </Text>
            </Box>
          </Box>
        </Box>
        {button && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={onButtonClick}
            sx={{
              height: "42px",
            }}
          >
            {button}
          </Button>
        )}
      </Box>
    </div>
  );
};

export default DisplayInfo;
