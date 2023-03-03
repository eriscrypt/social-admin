import { v4 as uuid } from "uuid";

export const useNotificationsStore = defineStore("notifications-module", () => {
  const notifications = ref<INotification[]>([]);

  const pushNotification = (notification: INotification) => {
    notifications.value.push({ ...notification, id: uuid() });
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id
    );
  };

  return {
    notifications,
    pushNotification,
    removeNotification,
  };
});
