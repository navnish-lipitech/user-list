import React, { useRef, useState } from "react";
import {
  Box,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  SearchBar,
  Form,
  AnimationWrapper,
  Button,
} from "@lipihipi/rtc-ui-components";

import debounce from "lodash/debounce";
import UsersTable from "./UsersTable";
import { APPOINTMENT_FIELD_NAMES } from "./constants";
import { values } from "lodash";

export type Filters = {
  search: string;
};

type Props = {
  onView?: (id: string) => void;
};

export const ListUsers: React.FC<Props> = ({ onView }) => {
  const [filters, setFilters] = useState<Filters>({
    [APPOINTMENT_FIELD_NAMES.search]: "",
  });

  const [sortby, setSortby] = useState({
    age: 0,
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
          <Typography variant="h3">Partner Listing</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
            />
            <label className="btn btn-light" htmlFor="btnradio1">
              All Partners
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
            />
            <label className="btn btn-light" htmlFor="btnradio2">
              New Partners
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
            />
            <label className="btn btn-light" htmlFor="btnradio3">
              Pending Partners
            </label>
          </div>

          <Box width={150} marginRight={2.5}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select value={sortby} label="Age">
                <MenuItem value={10}>Recent</MenuItem>
                <MenuItem value={20}>Most Recent</MenuItem>
                <MenuItem value={30}>Delayed</MenuItem>
              </Select>
            </FormControl>
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
    </>
  );
};
