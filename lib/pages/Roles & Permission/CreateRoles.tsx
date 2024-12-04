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
export const RoleArr = {
  Role1: "Role1",
  Role2: "Role2",
};
export interface ICreate {
  open: boolean;
  onClose: () => void;
}

export const CreateRole: React.FC<ICreate> = ({ open, onClose }) => {
  const [users, setUsers] = useState<any[]>([]);

  const [formState, setFormState] = React.useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <TemporaryDrawer
      disableGutter={false}
      open={open}
      onClose={onClose}
      action={true}
      heading={"Create Role & Permissions"}
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
                <FormControl>
                  <FormLabel required>Role Name</FormLabel>
                  <SelectBox
                    name="Role"
                    size="small"
                    placeholder="Enter Role Name"
                    required
                    options={Object.keys(RoleArr).map((key) => ({
                      value: key,
                      label: key,
                    }))}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </>
          );
        }}
      />
    </TemporaryDrawer>
  );
};
