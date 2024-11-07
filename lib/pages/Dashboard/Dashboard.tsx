import React, { useEffect, useState } from "react";

import { Box, IconButton } from "@mui/material";
import {
  AnimationWrapper,
  Loader,
  Text,
  useApiContext,
} from "@lipihipi/rtc-ui-components";
import HeaderBox from "@lib/pages/Dashboard/components/HeaderBox";
import LiveStatusSwitchButton from "./components/LiveStatusSwitchButton";
import DisplayInfo from "./components/DisplayInfo";
import OverdueSectionContent from "./components/OverdueSectionContent";
import OverdueMilestoneContent from "./components/OverdueMilestoneContent";

import LightIcon from "../../assets/LightIcon.svg";
import StatusIcon from "../../assets/StatusIcon.svg";
import PendingIconsvg from "../../assets/PendingIconsvg.svg";
import DownArrowIcon from "../../assets/DownArrowIcon.svg";
import DocumentIcon from "../../assets/DocumentIcon.svg";
import DividerLine from "../../assets/DividerLine.svg";
import dayjs from "dayjs";
import {
  CalendarTodayOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";
import { downloadFile } from "@lib/utils";
import { APPOINTMENT_STATUS } from "../UserList/constants";
import Notifications from "./components/Notification";

export const Dashboard = (props: any) => {
  const { apiHandlers, state } = useApiContext();
  const user = state?.user;
  const [appointmentData, setAppointmentData] = useState<Record<string, any>>();
  const [recentDocumentsData, setRecentDocumentsData] =
    useState<Record<string, any>>();
  const [documentsData, setDocumentsData] = useState<Record<string, any>>({});
  const [milestonesData, setMilestonesData] = useState<Record<string, any>>({});
  const [dashboardData, setDashboardData] = useState<Record<string, any>>();

  const [liveStatus, setLiveStatus] = useState(state.user.isOnline);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiHandlers.fetchDocuments({
        recent: true,
      }),
      apiHandlers.fetchAppointments({
        lawyer: state.user._id,
        isRecent: true,
      }),
      apiHandlers.fetchDocuments({
        overdue: true,
      }),
      apiHandlers.fetchMilestones({
        overdue: true,
      }),
      apiHandlers.fetchLawyerDashboard(),
    ]).then((res) => {
      const [
        recentDocuments,
        appointmentData,
        documentsData,
        milestonesData,
        dashboardData,
      ] = res;
      setAppointmentData(appointmentData.data.data);

      let recentDocCount = 0;
      setRecentDocumentsData({
        total: recentDocuments.data?.data?.list
          .map((item: any) => item.documents)
          .flat().length,
        data: recentDocuments.data?.data?.list?.reduce(
          (acc: Array<any>, item: any) => {
            const newItem = { ...item, documents: [] };
            if (recentDocCount <= 3) {
              item.documents.forEach((doc: any) => {
                if (recentDocCount <= 3) {
                  newItem.documents.push(doc);
                  recentDocCount++;
                }
              });
            }
            acc.push(newItem);
            return acc;
          },
          []
        ),
      });

      let docCount = 0;
      setDocumentsData({
        total: documentsData.data.data.list
          .map((item: any) => item.documents)
          .flat().length,
        data: documentsData.data?.data?.list?.reduce(
          (acc: Array<any>, item: any) => {
            const newItem = { ...item, documents: [] };
            if (docCount <= 3) {
              item.documents.forEach((doc: any) => {
                if (docCount <= 3) {
                  newItem.documents.push(doc);
                  docCount++;
                }
              });
            }
            acc.push(newItem);
            return acc;
          },
          []
        ),
      });

      let milestoneCount = 0;
      setMilestonesData({
        total: milestonesData?.data?.data?.list
          ?.map((item: any) => item.milestones)
          .flat().length,
        data: milestonesData?.data?.data?.list?.reduce(
          (acc: Array<any>, item: any) => {
            const newItem = { ...item, milestones: [] };
            if (milestoneCount <= 3) {
              item.milestones.forEach((doc: any) => {
                if (milestoneCount <= 3) {
                  newItem.milestones.push(doc);
                  milestoneCount++;
                }
              });
            }
            acc.push(newItem);
            return acc;
          },
          []
        ),
      });
      setDashboardData(dashboardData.data.data);
      setLoading(false);
    });
  }, []);

  const upcomingAppointments = (appointments: Array<Record<string, any>>) => {
    if (!appointments?.length) return [];
    return appointments.filter(
      (item) =>
        item.status === APPOINTMENT_STATUS.Converted &&
        dayjs(item.date).isAfter(dayjs())
    );
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setUpdatingStatus(true);
    setLiveStatus(checked);
    apiHandlers
      .updateLawyer(state.user._id, {
        isOnline: checked,
      })
      .then(() => {
        setUpdatingStatus(false);
      })
      .catch(() => {
        setLiveStatus(!checked);
      });
  };

  return (
    <Box padding={2}>
      {/* Header Box */}
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Text variant="body2">Welcome,</Text>
            <Text variant="h3" fontWeight={800}>
              {user?.firstName} {user?.lastName}
            </Text>
          </Box>
          <Notifications />
        </Box>
        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          <HeaderBox
            icon={LightIcon}
            header="Active  Cases"
            link={props.casesLink}
            content={`${dashboardData?.cases?.pending ?? "-"}/${dashboardData?.cases?.total ?? "-"}`}
          />
          <HeaderBox
            icon={DownArrowIcon}
            header="Appointment Request"
            link={props.appointmentsLink}
            content={dashboardData?.appointments ?? "-"}
          />
          <HeaderBox
            icon={PendingIconsvg}
            header="Pending Leads"
            link={props.leadsLink}
            content={dashboardData?.leads ?? "-"}
          />
          <HeaderBox
            icon={StatusIcon}
            header="Live Status"
            showArrow={false}
            content={
              <LiveStatusSwitchButton
                disabled={updatingStatus}
                defaultChecked={state.user.isOnline}
                checked={liveStatus}
                onChange={handleStatusChange}
              />
            }
          />
        </Box>
      </Box>

      {/* second section */}
      <Box
        sx={{
          display: "flex",
          mt: "2rem",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Box sx={{ background: "#fff", borderRadius: "16px", p: "1.5rem" }}>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  cursor: "default",
                  pointerEvents: "none",
                }}
                size="small"
              >
                <DescriptionOutlined sx={{ color: "black", width: "22px" }} />
              </IconButton>
              <Text variant="h5" sx={{ fontWeight: "bold" }}>
                Recent Document Uploads ({recentDocumentsData?.total})
              </Text>
            </Box>
            {!loading ? (
              <AnimationWrapper>
                {recentDocumentsData?.data?.length ? (
                  recentDocumentsData?.data?.map((item: any) =>
                    item.documents.map((doc: any) => (
                      <DisplayInfo
                        heading={item.title}
                        subheading1={doc.name}
                        subheading2={`Requested Date - ${dayjs(doc.deadline || doc.updatedDate).format("DD/MM/YY")}`}
                        button="View"
                        onButtonClick={() => {
                          apiHandlers
                            .getPrivateFile(doc.file)
                            .then((res: any) => {
                              if (res?.data?.data) {
                                downloadFile(
                                  res.data.data.url ||
                                    res.data.data.relativeUrl,
                                  res.data.data.name ||
                                    res.data.data.key ||
                                    new Date().getTime().toString()
                                );
                              }
                            });
                        }}
                      />
                    ))
                  )
                ) : (
                  <Text variant="body1" textAlign={"center"} mt={2}>
                    No records found
                  </Text>
                )}
              </AnimationWrapper>
            ) : (
              <Loader />
            )}
          </Box>
        </Box>
        {/* second box */}
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  cursor: "default",
                  pointerEvents: "none",
                }}
                size="small"
              >
                <CalendarTodayOutlined sx={{ color: "black", width: "22px" }} />
              </IconButton>
              <Text variant="h5" sx={{ fontWeight: "bold" }}>
                Upcoming Appointments (
                {upcomingAppointments(appointmentData?.list).length})
              </Text>
            </Box>

            {!loading ? (
              <AnimationWrapper>
                {upcomingAppointments(appointmentData?.list)?.length ? (
                  upcomingAppointments(appointmentData?.list)
                    .slice(0, 3)
                    ?.map((item: any) => (
                      <DisplayInfo
                        key={item._id}
                        button={"View"}
                        onButtonClick={() => {
                          props.onAppointmentView?.(item._id);
                        }}
                        heading={`${item.addedBy.firstName} ${item.addedBy.lastName}`}
                        subheading2={`Date & Time - ${dayjs(item.date).format("DD MMM YYYY")} | ${item.startTime} ${dayjs().hour() >= 12 ? "PM" : "AM"}`}
                      />
                    ))
                ) : (
                  <Text variant="body1" textAlign={"center"} mt={2}>
                    No records found
                  </Text>
                )}
              </AnimationWrapper>
            ) : (
              <Loader />
            )}
          </Box>
        </Box>
      </Box>

      {/* third section */}
      <Box sx={{ display: "flex", mt: "2rem", gap: "2rem", width: "100%" }}>
        {/* first Box */}
        <Box width={"50%"}>
          <Box
            sx={{
              padding: "1.5rem",
              border: "1px solid #E2E2E2",
              borderRadius: "16px",
            }}
          >
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Box display={"flex"} gap={2} alignItems={"center"}>
                <IconButton
                  sx={{
                    borderRadius: "50%",
                    cursor: "default",
                    pointerEvents: "none",
                  }}
                  size="small"
                >
                  <CalendarTodayOutlined
                    sx={{ color: "black", width: "22px" }}
                  />
                </IconButton>
                <Text variant="h5" sx={{ fontWeight: "800" }}>
                  Overdue Document Request ({documentsData.total})
                </Text>
              </Box>
              <Box>
                {!loading ? (
                  <AnimationWrapper>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                      {documentsData?.data?.length ? (
                        documentsData?.data?.map((item: any) =>
                          item.documents.map((document: any) => (
                            <OverdueSectionContent
                              heading={item.title}
                              subheading1={document.name}
                              subheading2={`Requested Date- ${dayjs(document.deadline).format("DD/MM/YYYY")}`}
                              button
                              icon={DocumentIcon}
                              overdueData={`Overdue by ${dayjs(dayjs()).diff(document.deadline, "days")} days`}
                            />
                          ))
                        )
                      ) : (
                        <Text variant="body1" textAlign={"center"} mt={2}>
                          No records found
                        </Text>
                      )}
                    </Box>
                  </AnimationWrapper>
                ) : (
                  <Loader />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Second Box */}
        <Box width={"50%"}>
          <Box
            sx={{
              padding: "1.5rem",
              border: "1px solid #E2E2E2",
              borderRadius: "16px",
            }}
          >
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Box display={"flex"} gap={2} alignItems={"center"}>
                <IconButton
                  sx={{
                    borderRadius: "50%",
                    cursor: "default",
                    pointerEvents: "none",
                  }}
                  size="small"
                >
                  <CalendarTodayOutlined
                    sx={{ color: "black", width: "22px" }}
                  />
                </IconButton>
                <Text variant="h5" sx={{ fontWeight: "800" }}>
                  Overdue Milestones ({milestonesData.total})
                </Text>
              </Box>
              {!loading ? (
                <AnimationWrapper>
                  <Box display={"flex"} flexDirection={"column"} gap={2}>
                    {!!milestonesData?.data?.length ? (
                      milestonesData?.data?.map((item: any) =>
                        item.milestones.map((milestone: any) => (
                          <OverdueMilestoneContent
                            heading={item.title}
                            subheading1={milestone.name}
                            subheading2={`Actual Date - ${dayjs(milestone.expectedDate).format("DD/MM/YYYY")}`}
                            button
                            icon={DividerLine}
                            overdueData={`Overdue by ${dayjs(dayjs()).diff(milestone.expectedDate, "days")} days`}
                          />
                        ))
                      )
                    ) : (
                      <Text variant="body1" textAlign={"center"} mt={2}>
                        No records found
                      </Text>
                    )}
                  </Box>
                </AnimationWrapper>
              ) : (
                <Loader />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
