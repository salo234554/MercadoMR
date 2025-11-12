import { Dialog, Grid } from '@mui/material';
import { IoIosInformationCircle } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

// Recibe solo open y onClose como props
function ModalAyudaBusqueda({ open, onClose }) {
  return (
    <Dialog
      open={open} // Abierto o cerrado según el estado que le mandes
      onClose={onClose} // Se ejecuta cuando clickean fuera o presionan Esc
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      PaperProps={{ sx: { width: "100%", maxWidth: "750px!important",  padding: { xs: "5px", sm: "25px" }, borderRadius: '11px' } }}
    >
      <div className='modal-ayuda-busqueda'>
        <div className='top-modal-ayuda-busqueda'>
          <IoIosInformationCircle />
          <p>Ejemplos de búsqueda</p>
          <IoIosClose onClick={onClose}/>
        </div>

        <Grid container spacing={0.5} columns={12} mt={2} mb={4}>
          {/* Primera columna: 6 columnas en todos los tamaños */}
          <Grid item xs={6} md={6} sx={{ flexDirection: 'column', display: 'flex', textAlign: 'left' }}>
            <div className='left-modal-ayuda'>
              <span>
                Criterio de búsqueda
              </span>
              <p className='show-above-525'>
                Nombre del producto + Especificaciones del vehículo
              </p>
              <p className='hide-above-525'>
                Nombre producto + Especificaciones 
              </p>
              <p className='show-above-525'>
                Nombre del producto + Marca del producto/fabricante
              </p>
              <p className='hide-above-525'>
                Nombre del pructo + Marca producto
              </p>
              <p className='show-above-525'>
                Nombre del producto + Número de parte
              </p>
              <p className='hide-above-525'>
                Nombre producto + Número parte
              </p>
              <p>Número de parte</p>
            </div>
          </Grid>

          {/* Segunda columna: 6 columnas en todos los tamaños */}
          <Grid item xs={6} md={6} sx={{ flexDirection: 'column', display: 'flex', textAlign: 'left' }}>
            <div className='right-modal-ayuda'>
              <span>
                Criterio de búsqueda
              </span>
              <p>
                Disco de freno Chevrolet Aveo 2009
              </p>
              <p>
                Filtro de aceite Motorcraft
              </p>
              <p>
                Limpiaparabrisas 578572
              </p>
              <p>578572</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

export default ModalAyudaBusqueda;