import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification
} from './styles';

import api from '~/services/api';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotification] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await api.get('notifications');

        const data = response.data.map(notification => ({
          ...notification,
          timeDistance: formatDistance(
            parseISO(notification.createdAt),
            new Date(),
            { addSuffix: true, locale: pt }
          )
        }));

        setNotification(data);
      } catch (err) {
        console.tron.log(err);
        toast.error('Falha ao carregar notificações');
      }
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    try {
      await api.put(`notifications/${id}`);

      setNotification(
        notifications.map(notification =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.tron.log(err);
      toast.error('Não possível marcar notificação, tente novamente');
    }
  }

  return (
    <Container>
      <Badge onClick={() => handleToggleVisible()} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
