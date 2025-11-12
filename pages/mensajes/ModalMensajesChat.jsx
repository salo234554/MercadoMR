import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { IoCheckmarkCircle, IoCloseOutline } from "react-icons/io5";

function ModalMensajesChat(props) {
    const {
        shown,
        close,
        titulo,
        mensaje,
        tipo,
        setActivarCity,
        textoBoton,
        textoBotonDos,
    } = props;
    const router = useRouter();

    const cerrar = () => {
        close(false);
        //router.push(`/search?keyword=${""}`);
        router.push("/");
    };

    const miscompras = () => {
        close(false);
        //router.push(`/search?keyword=${""}`);
        router.push({
            pathname: "/MisCompras/misCompras",
            query: {
                ctlredirigir: "91209012",
            },
        });
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                cerrar();
            }}>
            <div
                className="modal-mensajes-chat-dos"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div className="mainModalMensajesChat">
                    <div className="topDivModalMensajesChat">
                        <IoCheckmarkCircle className="closeInfoGreen" />
                        <p>{titulo}</p>
                        <IoCloseOutline
                            className="closeIconRed"
                            onClick={() => {
                                cerrar();
                            }}
                        />
                    </div>
                    <div className="contentModalMensajesChat">
                        <p>{mensaje}</p>
                    </div>
                    <div className="buttonsModalMensajesChat">
                        <Button
                            variant="outline-light"
                            className="botonchatir redondearborde"
                            onClick={() => miscompras()}>
                            {" "}
                            {textoBoton}
                        </Button>
                        <Button
                            variant="outline-light"
                            className="botonchatmiscompras redondearborde"
                            onClick={() => cerrar()}>
                            {" "}
                            {textoBotonDos}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalMensajesChat;
