


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../api/api';
import EditEventPopup from './EditEventPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        const data = await getEvents(token);
        setEvents(data);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching events');
      }
    };

    fetchEvents();
  }, [token, navigate]);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(token, eventId);
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting event');
    }
  };

  const handleEdit = (eventId) => {
    setEditingEventId(eventId);
  };

  const handleUpdate = () => {
    setEditingEventId(null);
    const fetchEvents = async () => {
      try {
        const data = await getEvents(token);
        setEvents(data);
        toast.success('Events updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Error updating events');
      }
    };

    fetchEvents();
  };

  return (
    <div className="event-list-container">
      <div className="header">
        <h2>Your Events</h2>
        <button className="primary-button" onClick={() => navigate('/create-event')}>Create New Event</button>
      </div>
      <ul className='event-list'>
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <div className="event-info" onClick={() => navigate(`/events/${event._id}`)}>
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="event-actions">
              <button className="edit-button" onClick={() => handleEdit(event._id)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingEventId && (
        // <EditEventPopup
        //   eventId={editingEventId}
        //   token={token}
        //   onClose={() => setEditingEventId(null)}
        //   onUpdate={handleUpdate}
        // />
        <EditEventPopup
  eventId={editingEventId}
  token={token}
  onClose={() => setEditingEventId(null)}
  onUpdate={handleUpdate}
/>

      )}
      <ToastContainer />
    </div>
  );
};

export default EventList;