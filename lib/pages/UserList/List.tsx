import React, { useRef, useState } from "react";
import { Box, CardContent, Typography } from "@mui/material";
import {
  SearchBar,
  Form,
  AnimationWrapper,
  Button,
} from "@lipihipi/rtc-ui-components";

import debounce from "lodash/debounce";
import UsersTable from "./UsersTable";
import { APPOINTMENT_FIELD_NAMES } from "./constants";
import { CreateUser } from "./create";

export type Filters = {
  search: string;
};

type Props = {
  onView?: (id: string) => void;
};

export const ListUsers: React.FC<Props> = ({ onView }) => {
  const [showUser, setShowUser] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    [APPOINTMENT_FIELD_NAMES.search]: "",
  });

  const actionRef = useRef<Record<string, any>>({});

  const handleInputChange = debounce(({ target: { value } }: any) => {
    setFilters((prev) => ({
      ...prev,
      [APPOINTMENT_FIELD_NAMES.search]: value,
    }));
  }, 500);

  return (
    <>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
        >
          <Typography variant="h3">User List</Typography>

          <Box gap={1} display="flex">
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setShowUser(true);
                }}
              >
                Add New User
              </Button>
            </Box>
          </Box>
        </Box>

        <CardContent>
          <AnimationWrapper>
            <UsersTable
              onView={onView}
              filters={filters}
              actionRef={actionRef}
            />
          </AnimationWrapper>
        </CardContent>
      </Box>

      <CreateUser
        onClose={() => {
          setShowUser(false);
        }}
        open={showUser}
      />
    </>
  );
};
