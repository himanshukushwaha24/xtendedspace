import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  GetUserNotification,
  UnreadUserNotification,
  UnreadAllUserNotification,
} from "@/service/storageService";
import { getUserId } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const applicationUserId = getUserId();
      if (applicationUserId) {
        try {
          const args = `?ApplicationUserId=${applicationUserId}`;

        

          const response = await GetUserNotification(args);
          if (response.success) {
            setNotifications(response?.success.data);
            
          }
        } catch (error) {
          console.error("Error fetching notifications", error);
        }
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    const applicationUserId = getUserId();
    if (applicationUserId) {
      try {
        const args = `?ApplicationUserId=${applicationUserId}&NotificationId=${notificationId}`;

      

        const response = await UnreadUserNotification(args);
        if (response.success) {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.notificationId !== notificationId)
          );
        }
      } catch (error) {
        console.error("Error marking notification as read", error);
      }
    }
  };
  const handleMarkAllAsRead = async () => {
    const applicationUserId = getUserId();
    if (applicationUserId) {
      try {
        const args = `?ApplicationUserId=${applicationUserId}`;
        const response = await UnreadAllUserNotification(args);
        if (response.success) {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error marking all notifications as read", error);
      }
    }
  };

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />
      <div className="w-full bg-gray-50 p-8 lg:px-[100px] min-h-[100vh]">
        <div className="flex justify-between "><h1 className="text-[20px] lg:text-[38px] font-bold lg:py-[30px] text-[#1b1c57]">
          Notifications
        </h1>
        <button
              onClick={handleMarkAllAsRead}
              className="bg-blue-500 rounded w-[80px] lg:w-[150px] p-2 lg:h-[50px] text-white flex items-center justify-center"
            >
              Clear All
            </button>
        {/* <div className="bg-blue-500 rounded w-[80px] lg:w-[150px] p-2 lg:h-[50px] text-white flex items-center justify-center">Clear All</div> */}
        </div>
        <div>
          {notifications.length > 0 ? (
            
            notifications.map((notification, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b-2 mb-4"
              >
                <div className="flex gap-4 w-full lg:px-8">
                  <div className="w-[50px] h-[50px] bg-blue-50 rounded flex justify-center items-center">
                    <IoNotificationsOutline className="text-20px lg:text-[30px] text-blue-700" />
                  </div>
                  <div className="w-[90%]">
                    <h2 className="text-[16px] lg:text-[22px] font-semibold leading-10">
                      {notification.title || "Notification Title"}
                    </h2>
                    <p className="text-[14px] lg:text-[18px] text-gray-400">
                      {notification.message || "No description available."}
                    </p>
                    <p className="text-[14px] lg:text-[18px] text-gray-400 leading-10">
                      {notification.notificationTime || "Just now"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkAsRead(notification.notificationId)}
                  className="bg-blue-500 rounded w-[80px] lg:w-[100px] h-[40px] lg:h-[50px] text-white"
                >
                  Clear
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No notifications available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
