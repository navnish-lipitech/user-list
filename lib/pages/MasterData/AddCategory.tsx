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
export const CategoryArr = {
  Role1: "Categroy1",
  Role2: "Categroy2",
};
export interface ICreate {
  open: boolean;
  onClose: () => void;
}

export const CreateCategory: React.FC<ICreate> = ({ open, onClose }) => {
  //   const [users, setUsers] = useState<any[]>([]);

  const [formState, setFormState] = React.useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <TemporaryDrawer
      open={open}
      disableGutter={false}
      onClose={onClose}
      action={true}
      heading={"Create New Category"}
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
                  <FormLabel required>Industry</FormLabel>
                  <SelectBox
                    name="Role"
                    size="small"
                    placeholder="Select/search from the list"
                    required
                    options={Object.keys(CategoryArr).map((key) => ({
                      value: key,
                      label: key,
                    }))}
                    onChange={handleChange}
                  />
                </FormControl>

                <InputBox
                  fullWidth
                  required
                  placeholder="Enter category/subcategory name"
                  label="Category"
                  name={"name"}
                  size="small"
                  value={values.name}
                />

                <FormControl>
                  <FormLabel required>Parent Category</FormLabel>
                  <SelectBox
                    name="Role"
                    size="small"
                    placeholder="Select a parent category"
                    required
                    options={Object.keys(CategoryArr).map((key) => ({
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
