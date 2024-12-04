import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Button,
  Datepicker,
  Form,
  InputBox,
  SelectBox,
  TemporaryDrawer,
} from "@lipihipi/rtc-ui-components";

export interface ICreate {
  open: boolean;
  onClose: () => void;
}

export const CreateNewIndustry: React.FC<ICreate> = ({ open, onClose }) => {
  //   const [users, setUsers] = useState<any[]>([]);

  const [formState, setFormState] = React.useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <TemporaryDrawer
      disableGutter={false}
      open={open}
      onClose={onClose}
      action={true}
      heading={"Create New Industry"}
    >
      <Form
        initialValues={formState}
        enableReinitialize={true}
        onSubmit={async (values: any) => {
          console.log(values);
        }}
        render={({
          handleChange,
          dirty,
          isSubmitting,
          values,
          touched,
          handleBlur,
          errors,
          setFieldValue,
        }: any) => {
          return (
            <>
              <Box
                height={1}
                display="flex"
                pb={3}
                flexDirection="column"
                rowGap={3}
              >
                <InputBox
                  fullWidth
                  required
                  placeholder="Enter industry name"
                  label="Industry"
                  name={"name"}
                  size="small"
                  value={values.name}
                />
              </Box>
            </>
          );
        }}
      />
    </TemporaryDrawer>
  );
};
