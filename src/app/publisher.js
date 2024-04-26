import React, { useEffect, useContext } from 'react';
import Pusher from 'pusher-js';
import { AppContext } from './AppContext'; // Contexte ou store pour partager les données

const PusherComponent = () => {
  const { setRealTimeData } = useContext(AppContext); // Utiliser le contexte pour partager les données

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('your-channel');
    channel.bind('your-event', function(data) {
      // Mise à jour du contexte ou du store avec les données reçues
      setRealTimeData(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [setRealTimeData]);

  return null; // Le composant n'a pas besoin de rendre une UI
};

export default PusherComponent;
