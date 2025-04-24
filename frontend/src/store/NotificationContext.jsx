import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); // auto hide after 3s
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-md text-white transition-all duration-300 z-50
          ${notification.type === "success" && "bg-green-600"}
          ${notification.type === "error" && "bg-red-600"}
          ${notification.type === "info" && "bg-blue-600"}
        `}>
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
