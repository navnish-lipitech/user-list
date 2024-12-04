import { APIContextProvider } from "@lipihipi/rtc-ui-components";
import { ListAppointments } from "./pages/UserList";
import { ListAppointments as RolesPermission } from "./pages/Roles & Permission";
import { ListAppointments as MasterData } from "./pages/MasterData";
import { IndustryManagement } from "./pages/IndustryManagement";
import { ListAppointments as ConnectionAndApprovallist } from "./pages/ConnectionApprovalList";
import { ManageBusinessList } from "./pages/Manage Businesses";
import { ListAppointments as ManagePartners } from "./pages/ManagePartners";
import { ListAppointments as RolesAndPermission } from "./pages/Manage Role & Permission";

import "./index.scss";

// const LawyerDashboard = ({ state, appData, ...props }: any) => {
//   return (
//     <APIContextProvider apiHandlers={props} state={state} appData={appData}>
//       <Dashboard {...props} />
//     </APIContextProvider>
//   );
// };

const AppointmentList = ({ state, appData, ...props }: any) => {
  return (
    <APIContextProvider apiHandlers={props} state={state} appData={appData}>
      <ListAppointments {...props} />
    </APIContextProvider>
  );
};

export {
  AppointmentList,
  RolesPermission,
  MasterData,
  IndustryManagement,
  ConnectionAndApprovallist,
  ManageBusinessList,
  ManagePartners,
  RolesAndPermission,
};
