import { Box } from "@mui/material";
import { Text } from "@lipihipi/rtc-ui-components";
import { ArrowForwardRounded } from "@mui/icons-material";

const HeaderBox = ({ link, icon, header, content, showArrow = true }: any) => {
  return (
    <Box component={"a"} href={link}>
      <Box
        sx={{
          padding: "1rem",
          width: "280px",
          display: "inline-block",
          borderRadius: "1.5rem",
          border: "2px solid #E4E4E7",
          background: "#FFFFFF",
        }}
      >
        <img src={icon} width="38px" alt="" />
        <Text variant="body1" sx={{ fontWeight: "500", margin: "0.5rem 0" }}>
          {header}
        </Text>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text variant="h4" sx={{ fontWeight: "500" }}>
            {content}
          </Text>
          {showArrow && (
            <ArrowForwardRounded
              sx={{
                color: "black",
                padding: "2px",
                width: "24px",
                height: "24px",
                border: "1px solid lightgray",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderBox;
