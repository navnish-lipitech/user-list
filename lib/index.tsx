import { APIContextProvider } from "@lipihipi/rtc-ui-components";
import { ListAppointments } from "./pages/UserList";

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

export { AppointmentList };
