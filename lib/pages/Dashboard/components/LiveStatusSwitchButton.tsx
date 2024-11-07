import * as React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
const LiveStatusSwitchButton = (props: SwitchProps) => {
  return (
    <div>
      <Switch inputProps={{ "aria-label": "Switch demo" }} {...props} />
    </div>
  );
};

export default LiveStatusSwitchButton;
