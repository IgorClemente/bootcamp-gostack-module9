import React, { useState, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

  useEffect(() => {
    async function getNotifications() {
      api.defaults.headers[
        'Authorization'
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTcyMjM4MTQ2LCJleHAiOjE1NzI4NDI5NDZ9.gunYQaRk-nsguzMuWON5rXyGvH97wYYhLYAEVsf3D2w`;
      const response = await api.get('notifications');

      console.tron.warn(response.data);
      console.tron.warn(api.defaults.headers);

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }));

      setNotification(data);
    }

    getNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={() => handleToggleVisible()} hasUnread>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              <button type="button">Marcar como lida</button>
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
