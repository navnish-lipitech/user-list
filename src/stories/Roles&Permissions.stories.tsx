import { RolesAndPermission } from "@lib";

import { rtcTheme } from "@/theme";
import { CustomTheme } from "@lipihipi/rtc-ui-components";

/** Template to render the component with auth */
const Template = ({ Component, ...args }: any) => {
  /** Use this code when implementing authentication */
  return (
    <>
      <CustomTheme customTheme={rtcTheme}>
        <Component {...args} />
      </CustomTheme>
    </>
  );
};

export const Roles = () => {
  return <Template Component={RolesAndPermission} />;
};

export default {
  title: "Roles & Permissions",
};
