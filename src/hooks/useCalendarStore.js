

import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";
import { showAlert } from "../utils/alert";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async(calendarEvent) => {

    try {

      Swal.fire({
        title: 'Guardando...',
        text: 'Por favor, espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      if(calendarEvent.id){
        // * actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        showAlert('El evento se guardó correctamente.', 'success');
      } else {
        // * Creando
        const { data } = await calendarApi.post('/events', calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventSaved.id, user }));
        showAlert('El evento se creó correctamente.', 'success');
      }
      
    } catch (error) {
      Swal.fire('Error al guadar', error.response.data.msg, 'error');
    }

  }

  const startDeletingEvent = async() => {
    // * Llegar al backend
    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      dispatch(onDeleteEvent());
      Swal.fire({ title: "¡Eliminado!", text: "El evento ha sido eliminado correctamente.",icon: "success" });
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
    }
  }

  return {
    // * Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // * Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  }
}