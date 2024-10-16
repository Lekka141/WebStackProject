import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarWidget() {
  /* State for managing events */
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), category: '' });
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* Load events from localStorage on component mount */
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    setEvents(storedEvents);
  }, []);

  /* Save events to localStorage whenever they change */
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  /* Handle opening and closing the event dialog */
  const handleClickOpen = (event = null) => {
    if (event) {
      /* Edit mode: populate the form with selected event data */
      setNewEvent({ ...event, start: new Date(event.start), end: new Date(event.end) });
      setSelectedEvent(event);
    } else {
      /* Create mode: reset the form */
      setNewEvent({ title: '', start: new Date(), end: new Date(), category: '' });
      setSelectedEvent(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* Handle adding or editing an event */
  const handleSaveEvent = () => {
    if (selectedEvent) {
      /* Edit existing event */
      const updatedEvents = events.map((event) =>
        event === selectedEvent ? newEvent : event
      );
      setEvents(updatedEvents);
    } else {
      /* Add new event */
      setEvents([...events, newEvent]);
    }
    handleClose();
  };

  /* Handle deleting an event */
  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Calendar
        </Typography>

        {/* Calendar component from react-big-calendar */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectEvent={(event) => handleClickOpen(event)} /* Open dialog for editing */
          onSelectSlot={({ start, end }) => {
            setNewEvent({ title: '', start, end, category: '' });
            setSelectedEvent(null);
            setOpen(true); /* Open dialog for new event */
          }}
        />

        {/* Dialog for adding/editing events */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              type="text"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              select
              label="Category"
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="appointment">Appointment</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            {selectedEvent && (
              <Button onClick={handleDeleteEvent} color="secondary">
                Delete
              </Button>
            )}
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSaveEvent} color="primary">
              {selectedEvent ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default CalendarWidget;
