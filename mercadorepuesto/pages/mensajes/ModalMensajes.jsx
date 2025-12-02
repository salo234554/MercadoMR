import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Dialog } from "@mui/material";
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";

function ModalMensajes(props) {
    const { shown, close, titulo, mensaje, tipo, campoConError  } = props;
    const cerrarModal = () => {
        close(false);
       

        // Esperamos un poco para que el DOM se actualice
        setTimeout(() => {
            if (campoConError && campoConError?.current) {
               
                campoConError.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100); // Delay corto para que el scroll funcione después del cierre
    };

    return shown ? (
        <Dialog
            open={shown}
            onClose={cerrarModal}
            PaperProps={{
                className: "redondearventamensajes tamaModalFER",
                style: { borderRadius: 16, padding: 10 }
            }}
        >
            <div
                className="modalmensajesMiu"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div className="mainModalMsj"> 
                    <div className="topModalMsjs">
                        <IoIosInformationCircle />
                        <p>{titulo}</p>
                        <IoMdClose onClick={cerrarModal} className="Cursorpointer"/>
                    </div>
                    <div className="msjModalMsj">
                        <p>{mensaje}</p>
                    </div>
                    <div className="closeModalMsj">
                        <Button
                            variant="outline-light"
                            className="closeButtonModalMsj"
                            onClick={cerrarModal}
                        >
                            Cerrar
                        </Button>
                    </div> 
                </div>
            </div>
        </Dialog>
    ) : null;
}

export default ModalMensajes;
