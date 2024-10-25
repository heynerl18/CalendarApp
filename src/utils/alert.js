
import Swal from "sweetalert2";

export const showDeleteConfirmation = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: 'Cancelar'
  });
  return result.isConfirmed;
}

export const showAlert = (title, icon, timer = 1500) => {
  Swal.fire({
    position: 'top-end',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
};