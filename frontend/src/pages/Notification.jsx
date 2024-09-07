import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationPopup from '../components/NotificationPopup'; // Correct import of NotificationPopup

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContractId, setSelectedContractId] = useState(null); // State to track the selected contract for the popup
  const [userType, setUserType] = useState(null); // State to track the userType
  const [activeTab, setActiveTab] = useState('unread'); // State to track the active tab ('unread' or 'read')

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userInfoResponse = await axios.get('http://localhost:8800/user/userinfo', { withCredentials: true });
        const userTypeFromResponse = userInfoResponse?.data?.userInfo?.userType;
        setUserType(userTypeFromResponse); // Store userType in state

        const endpoint = userTypeFromResponse === 'farmer'
          ? 'http://localhost:8800/notification/farmer'
          : 'http://localhost:8800/notification/buyer';

        const notificationsResponse = await axios.get(endpoint, { withCredentials: true });
        setNotifications(notificationsResponse.data.notifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (contractId) => {
    if (userType === 'buyer') {
      setSelectedContractId(contractId); // Open the popup with the selected contract ID only if userType is 'buyer'
    }
  };

  const handleClosePopup = () => {
    setSelectedContractId(null); // Close the popup
  };

  const handleMarkAsRead = async (notificationId, e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up and triggering the popup
    try {
      await axios.put(`http://localhost:8800/notification/${notificationId}/read`, {}, { withCredentials: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, status: 'Read' } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError("Failed to mark notification as read.");
    }
  };

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter((notification) =>
    activeTab === 'unread' ? notification.status !== 'Read' : notification.status === 'Read'
  );

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">All Notifications</h1>

      {/* Toggle tabs for Unread and Read messages */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'unread' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Unread messages
        </button>
        <button
          onClick={() => setActiveTab('read')}
          className={`px-4 py-2 mx-2 rounded ${activeTab === 'read' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Read messages
        </button>
      </div>

      {filteredNotifications.length === 0 ? (
        <p className="text-center text-red-500">
          {activeTab === 'unread' ? 'No unread notifications available.' : 'No read notifications available.'}
        </p>
      ) : (
        filteredNotifications.map((notification) => (
          <div
            key={notification._id}
            className={`border-2 border-solid border-black p-4 mb-2 flex justify-between rounded ${userType === 'buyer' ? 'cursor-pointer' : 'cursor-default'}`} // Conditionally apply cursor style
            onClick={() => handleNotificationClick(notification.contractId)} // Open popup when clicked if userType is 'buyer'
          >
            <p>{notification.message}</p>
            {notification.status !== 'Read' && (
              <button
                onClick={(e) => handleMarkAsRead(notification._id, e)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}

      {/* Show NotificationPopup if a contract is selected and userType is 'buyer' */}
      {selectedContractId && userType === 'buyer' && (
        <NotificationPopup contractId={selectedContractId} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default NotificationsPage;
