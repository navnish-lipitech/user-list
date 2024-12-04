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
      open={open}
      onClose={onClose}
      action={false}
      header=<b>{"Create Role & Permissions"}</b>
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
                  placeholder="Enter Role Name"
                  label="Role Name"
                  name={"name"}
                  size="small"
                  value={values.name}
                />
              </Box>

              <Box
                position="sticky"
                bottom={-32}
                left={0}
                mx={-4}
                mb={-4}
                gap={2}
                display="flex"
                sx={{
                  borderTop: "0.0625rem solid #ECECEC",
                  p: "1rem 2rem",
                  background: "#fff",
                }}
              >
                <Button onClick={onClose} sx={{ flex: 1 }} variant="outlined">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty}
                  sx={{ flex: 1 }}
                  variant="contained"
                >
                  {"Next"}
                </Button>
              </Box>
            </>
          );
        }}
      />
    </TemporaryDrawer>
  );
};
