
import { useCalendarStore } from "../../hooks";
import { showDeleteConfirmation } from "../../utils/alert";
import Swal from "sweetalert2";

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = async() => {

    const isConfirmed = await showDeleteConfirmation();
    if(isConfirmed){
      startDeletingEvent();
    }
  }
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}