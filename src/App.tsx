import { useState } from "react";

import { ToastContainer } from "@lipihipi/rtc-ui-components";

const App = () => {
  const [userDetails, setUserDetails] = useState<Record<string, any> | null>(
    null
  );

  return (
    <>
      <ToastContainer />
      {userDetails && <></>}
    </>
  );
};

export default App;
