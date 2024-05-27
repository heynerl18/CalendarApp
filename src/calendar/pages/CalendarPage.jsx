
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { addHours } from 'date-fns';
import { localizer, getMessagesEs } from '../../helpers';
import { useState } from 'react';

const events = [{
  title: 'Cumpleanos del jefe',
  note: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bdColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Heyner'
  }
}];


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  }
  const onSelect = (event) => {
    console.log({click: event});
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    console.log({viewChanged: event});
  }
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  )
}