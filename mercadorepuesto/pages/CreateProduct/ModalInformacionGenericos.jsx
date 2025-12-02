import React from 'react';
import { Button, Row, Col, Card, Tooltip, Overlay} from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";

function ModalInformacionGenericos(props) {
    const { shown, close } = props;

    return shown ? (
        <div
            className="modal-fondo px-[15px]"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <button
                                type="button"
                                className="cerrarmodal colorbase"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={10} lg={10} md={10} sm={10}>
                            <div className="titulodetaildescription">
                                Texto sobre lo que que queremos indicar al
                                usuario
                            </div>
                        </Col>
                       
                            
                        
                    </Row>
                </div>
                <div className="mt-50 textoventanamensajes pb-[18px] sm:pb-0">
                    <div className="textoventanamensajes">
                        {" "}
                        Contenido, o explicación, o opciones para selección
                    </div>
                    <br />
                    <br />
                    <div className="textoventanamensajes mtmenos20">
                        Información adiciona, explicando sobre lo que debe
                        realizar.
                    </div>
                </div>
                <div className=" mt-30">
                    
                            <Button
                                variant="outline-light"
                                className="ps-btn redondearborde"
                                onClick={() => close()}>
                                {" "}
                                Cerrar
                            </Button>
                        
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalInformacionGenericos;