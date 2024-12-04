import { Box, TableRow, TableCell, IconButton, Chip } from "@mui/material";

import { useCallback, useImperativeHandle, useMemo, useState } from "react";
import {
  NoDataFound,
  EnhancedTableWithPagination,
  Text,
  AnimationWrapper,
  Button,
} from "@lipihipi/rtc-ui-components";
import { Filters } from "./List";
import dayjs from "dayjs";
import { Visibility } from "@mui/icons-material";
import { STATUS_BG, COLOR, BORDER } from "./constants";
import { dummyData } from "./Data";

const headCells: any = [
  {
    id: "Category name",
    numeric: false,
    disablePadding: false,
    label: "Category name",
  },
  {
    id: "Sub-Category Name",
    numeric: false,
    disablePadding: false,
    label: "Sub-Category Name",
  },
  {
    id: "Industry",
    numeric: true,
    disablePadding: false,
    label: "Industry",
  },
  {
    id: "Created on",
    numeric: true,
    disablePadding: false,
    label: "Created on",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "Actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

const createRow = (props: any) => {
  const { name, Role, Email, date, status, ...rest } = props;

  return (
    <TableRow>
      <TableCell component={"th"} scope="row" padding="normal">
        <Text variant="subtitle1">{name}</Text>
      </TableCell>
      <TableCell component={"th"} scope="row" padding="normal">
        {Role &&
          Role.map((Role: any) => (
            <Chip
              key={Role._id}
              label={Role.name}
              variant="outlined"
              color="primary"
              size="small"
              sx={{ marginRight: "5px" }}
            />
          ))}
      </TableCell>
      <TableCell component={"th"} scope="row" padding="normal">
        {dayjs(date).format("DD MMMM YYYY")}
      </TableCell>
      <TableCell component={"th"} scope="row" padding="normal">
        <Box>
          <Button
            variant="outlined"
            color="success"
            sx={{
              backgroundColor: STATUS_BG[status as keyof typeof STATUS_BG],
              Width: "max-content",
              padding: "2px 10px",
              height: "30px",
              borderRadius: "30px",
              fontSize: "14px",
              border: BORDER[status as keyof typeof BORDER],
              color: COLOR[status as keyof typeof COLOR],
            }}
          >
            {status}
          </Button>
        </Box>
      </TableCell>
      <TableCell component={"th"} scope="row" padding="normal">
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <IconButton
            sx={{
              background: "transparent",
              borderRadius: "50%",
            }}
            size="small"
            onClick={() => Email.view?.({ name, Role, date, ...rest })}
          >
            <Visibility />
          </IconButton>
        </Box>
      </TableCell>

      <TableCell component={"th"} scope="row" padding="normal">
        <Box display={"flex"} alignItems={"center"} gap={1}></Box>
      </TableCell>
    </TableRow>
  );
};

export const UsersTable = ({
  actionRef,
  onView,
}: {
  actionRef: any;
  filters: Filters;
  onView?: (id: string) => void;
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data] = useState<Record<string, any>[]>(dummyData);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const Email = {
    view: (row: Record<string, any>) => {
      onView?.(row._id);
    },
  };

  const tableData = useMemo(() => {
    return data.map(({ addedBy, Role, active, status, ...rest }: any) =>
      createRow({
        name: addedBy.firstName + " " + addedBy.lastName,
        Role,
        Email,
        active,
        status,
        ...rest,
      })
    );
  }, [data]);

  const handlePageChange = useCallback((page: number, pageSize: number) => {
    setRowsPerPage(pageSize);
  }, []);

  useImperativeHandle(actionRef, () => ({
    refresh: () => {
      setRefresh((p) => !p);
    },
  }));

  const content = useMemo(() => {
    return data ? (
      <AnimationWrapper>
        <EnhancedTableWithPagination
          headCells={headCells}
          pagination
          maxHeight={`600px`}
          numSelected={0}
          tableBodyNode={tableData}
          checkSelection={false}
          stickyHeader
          total={totalCount}
          rowsPerPageData={rowsPerPage}
          handlePageChange={handlePageChange}
        />
      </AnimationWrapper>
    ) : (
      <NoDataFound
        onClick={() => {}}
        description={{
          primary: "You haven’t created any Appointments Yet.",
          secondary: "",
        }}
      />
    );
  }, [data, rowsPerPage, tableData, totalCount, handlePageChange]);

  return <>{content}</>;
};

export default UsersTable;
