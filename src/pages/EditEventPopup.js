


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEventById, updateEvent } from '../api/api';
import '../styles/EditEventPopup.css';

const EditEventPopup = ({ eventId, token, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(eventId, token);
        setName(event.name);
        setDate(event.date);
        setLocation(event.location);
        setDescription(event.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
  }, [eventId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(token, eventId, { name, date, location, description });
      toast.success('Event updated successfully!');
      if (onUpdate) onUpdate(); // Ensure onUpdate is called if provided
      if (onClose) onClose();   // Ensure onClose is called if provided
    } catch (error) {
      toast.error('Failed to update event. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="edit-event-popup">
      <div className="edit-event-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='btn-container'>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPopup;
