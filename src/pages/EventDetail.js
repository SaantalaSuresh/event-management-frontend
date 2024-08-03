


import React, { useState, useEffect } from 'react';
import { TailSpin } from "react-loader-spinner";
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEvent } from '../api/api';
import '../styles/EventDetail.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id, token);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Error fetching event');
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await deleteEvent(token, id);
      toast.success('Event deleted successfully');
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    }
  };

  if (!event) return <div className='event-detail-container'>
     <TailSpin color="red" radius={"8px"} />
  </div>;

  return (
    <div className="event-detail-container">
      <div className="event-detail">
        <h2>{event.name}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        
        <div className="buttons">
          <button className="primary-button" onClick={() => navigate('/events')}>Back to Events</button>
          <button className="delete-button" onClick={handleDelete}>Delete Event</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventDetail;
