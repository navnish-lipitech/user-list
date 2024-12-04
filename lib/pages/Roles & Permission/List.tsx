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
import { CreateRole } from "./CreateRoles";

export type Filters = {
  search: string;
};

type Props = {
  onView?: (id: string) => void;
};

export const ListUsers: React.FC<Props> = ({ onView }) => {
  const [showRoles, setShowRoles] = useState(false);

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
          <Typography variant="h3">Roles & Permission</Typography>

          <Box gap={1} display="flex">
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setShowRoles(true);
                }}
              >
                Add New Role
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

      <CreateRole
        onClose={() => {
          setShowRoles(false);
        }}
        open={showRoles}
      />
    </>
  );
};
