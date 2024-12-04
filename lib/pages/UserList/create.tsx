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

export const CreateUser: React.FC<ICreate> = ({ open, onClose }) => {
  const [users, setUsers] = useState<any[]>([]);

  const [formState, setFormState] = React.useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <TemporaryDrawer
      open={open}
      disableGutter={false}
      onClose={onClose}
      action={true}
      heading={"Create a user"}
      submitText="Submit"
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
                  placeholder="Enter First Name"
                  label="First name"
                  name={"name"}
                  size="small"
                  value={values.name}
                />
                <InputBox
                  fullWidth
                  required
                  placeholder="Enter Last Name"
                  label="Last name"
                  name={"name"}
                  size="small"
                  value={values.name}
                />
                <InputBox
                  fullWidth
                  required
                  placeholder="Enter email id"
                  label="Email ID"
                  name={"name"}
                  size="small"
                  value={values.name}
                />
                <InputBox
                  fullWidth
                  required
                  placeholder="Mobile No."
                  label="Mobile no"
                  name={"name"}
                  size="small"
                  value={values.name}
                />

                <FormControl>
                  <FormLabel required>Language</FormLabel>
                  <SelectBox
                    name="Role"
                    size="small"
                    placeholder="Chose a role"
                    required
                    options={Object.keys(RoleArr).map((key) => ({
                      value: key,
                      label: key,
                    }))}
                    onChange={handleChange}
                  />
                </FormControl>

                <Grid item xs={12} mb={2} lg={12}>
                  <Box>
                    <FormLabel required>Date of Birth</FormLabel>
                    <Datepicker
                      // Age should be greater than 18

                      onChange={(value: string) =>
                        setFieldValue("dateOfBirth", value)
                      }
                      value={values["dateOfBirth"]}
                      name={"dateOfBirth"}
                      variant="outlined"
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Box>
            </>
          );
        }}
      />
    </TemporaryDrawer>
  );
};
