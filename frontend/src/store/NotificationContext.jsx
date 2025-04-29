import { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [progress, setProgress] = useState(100);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setProgress(100);

    let intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          setNotification(null);
          return 0;
        }
        return prev - 1; // Progress decrease
      });
    }, 30); // Progress bar speed (total 3s = 30ms * 100)
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed top-4 right-4 w-72 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
          <div
            className={`px-4 py-3 text-sm font-medium text-white 
              ${notification.type === "success" ? "bg-green-600" : ""}
              ${notification.type === "error" ? "bg-red-600" : ""}
              ${notification.type === "info" ? "bg-blue-500" : ""}
            `}
          >
            {notification.message}
          </div>
          <div className="h-1 bg-gray-300">
            <div
              className={`h-full
                ${notification.type === "success" ? "bg-green-400" : ""}
                ${notification.type === "error" ? "bg-red-400" : ""}
                ${notification.type === "info" ? "bg-blue-400" : ""}
              `}
              style={{ width: `${progress}%`, transition: "width 30ms linear" }}
            />
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
