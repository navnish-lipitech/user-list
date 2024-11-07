import React, { useEffect, useRef, useState } from "react";
import { Text, useApiContext } from "@lipihipi/rtc-ui-components";
import dayjs from "dayjs";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  IconButton,
  Popover,
} from "@mui/material";
import {
  DescriptionOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";

type Notification = {
  _id: string;
  notification: {
    title: string;
    body: string;
  };
  isRead: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
};

export const Notifications = () => {
  const { apiHandlers } = useApiContext();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pollingRef = useRef<number | null>(null); // To store requestAnimationFrame id
  const lastPollingTime = useRef(Date.now()); //
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNotifications = async () => {
    const response = await apiHandlers.fetchNotifications(); // Replace with your API endpoint
    setNotifications(response.data.data.list);
  };
  useEffect(() => {
    const pollServer = async () => {
      const now = Date.now();
      const POLLING_INTERVAL = 5000; // 5 seconds

      // Check if enough time has passed since the last poll
      if (now - lastPollingTime.current >= POLLING_INTERVAL) {
        setLoading(true);
        try {
          await fetchNotifications();
          lastPollingTime.current = Date.now(); // Update last polling time
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      }

      // Recursively call pollServer using requestAnimationFrame
      pollingRef.current = requestAnimationFrame(pollServer);
    };

    // Start polling
    pollingRef.current = requestAnimationFrame(pollServer);

    // Cleanup: Cancel requestAnimationFrame on component unmount
    return () => {
      if (pollingRef.current) {
        cancelAnimationFrame(pollingRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleRead = (id: string) => {
    apiHandlers
      .updateNotification(id, {
        isRead: true,
      })
      .then(() => {
        fetchNotifications();
      });
  };
  return (
    <>
      <Box>
        <IconButton
          sx={{
            borderRadius: "50%",
            background: "white",
          }}
          onClick={handleOpen}
        >
          <NotificationsNoneOutlined sx={{ color: "black" }} />
        </IconButton>
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={Boolean(anchorEl)}
        >
          <Popover
            id={"notifications"}
            open={Boolean(anchorEl)}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "10px",
                },
              },
            }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: -10,
              horizontal: "right",
            }}
          >
            <Card sx={{ width: "400px", height: "500px", overflow: "auto" }}>
              <CardContent>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <Box>
                    <Text variant="h5">Recent Notifications</Text>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} gap={2}>
                    {notifications.map((notification) => (
                      <Box
                        p={"10px"}
                        sx={{
                          border: "1px solid #DDDDDD",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        display={"flex"}
                        onClick={() => handleRead(notification._id)}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"} gap={1}>
                          <Box
                            borderRadius={"50%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{
                              background: "#F4F0E9",
                              height: "2.65rem",
                              width: "2.65rem",
                              minWidth: "2.65rem",
                            }}
                          >
                            <DescriptionOutlined sx={{ color: "black" }} />
                          </Box>
                          <Box>
                            <Text
                              variant="body1"
                              fontWeight={450}
                              color="#161458"
                            >
                              {notification.notification.title}
                            </Text>
                            <Text
                              variant="caption"
                              fontWeight={500}
                              fontSize={14}
                            >
                              {notification.notification.body}
                            </Text>
                          </Box>
                        </Box>
                        <Box>
                          <Text variant="body1" fontWeight={400} fontSize={14}>
                            {dayjs(notification.createdAt).format("DD/MM/YYYY")}
                          </Text>
                          <Text
                            variant="body1"
                            fontWeight={500}
                            color={notification.isRead ? "green" : "red"}
                          >
                            {notification.isRead ? "Read" : "Unread"}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Popover>
        </Backdrop>
      </Box>
    </>
  );
};

export default Notifications;
