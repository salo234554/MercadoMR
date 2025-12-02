import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedVehicle from "../../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import ModalInformacionSearh from "../../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../../store/filtersearchinteractive/action";

//Importar Carrusel
import CalleLatoneria from "../../../CarruselVehiculos/Motos/Calle/CalleLatoneria";
import ExpandAndCloseSearch from "../../expandandclose/ExpandAndCloseSearch";

const CalleLatoneriaCentro = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    // Definicion Latoneria
    const [marcaBotonIzquierdo, setMarcaBotonIzquierdo] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonCentro, setMarcaBotonCentro] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonDerecho, setMarcaBotonDerecho] = useState(
        "botoncarroceriaexteriordos"
    );
    const [informacionMarcaBotonIzquierdo, setInformacionMarcaBotonIzquierdo] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonCentro, setInformacionMarcaBotonCentro] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonDerecho, setInformacionMarcaBotonDerecho] =
        useState("informacionbotoncarroceriaexteriordos");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);

    // Asignamos Datos seleccionado en el exterior vehículo
    const datoseleccinoexterior = useSelector(
        (state) => state.dataselectedexternal.dataselectedexternal
    );
    const [controlFijar, setControlFijar] = useState("");
    const [closeWindow, setCloseWindow] = useState(false);

    const [textoTituloInformacion, setTextoTituloInformacion] =
        useState("Motos Deportivas");
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] =
        useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] =
        useState("");

    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

    useEffect(() => {
        setMarcaBotonCentro("botoncarroceriasedanseleccionadados");
        setInformacionMarcaBotonCentro(
            "informacionbotoncarroceriasedanseleccionada"
        );

        setMarcaBotonIzquierdo("botoncarroceriaexterior");
        setInformacionMarcaBotonIzquierdo("informacionbotoncarroceriaexterior");

        setMarcaBotonDerecho("botoncarroceriaexteriordos");
        setInformacionMarcaBotonDerecho(
            "informacionbotoncarroceriaexteriordos"
        );
    }, []);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos en la parte exterior del vehículo"
        );
        setTextoDosModalInformacion(
            "Aquí encuentras productos relacionados con Latonería, Pintura, Farolas, Parachoques, Guardabarros, Luces, Depósitos de combustible, Espejos, Cubiertas de motor, Maletero entre otras."
        );
    };
    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Este tipo de vehículo no incluye otras opciones"
        );
        setTextoDosModalInformacion(
            "Por las características del vehículo no hay otras opciones disponibles."
        );
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos del tren motriz de la motocicleta."
        );
        setTextoDosModalInformacion(
            "Es el sistema que transmite la potencia del motor a las ruedas, permitiendo que el vehículo se desplace. Componentes principales: Motor, Transmisión, Ejes, Ruedas, entre otros"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {
        dispatch(getFilterSearchInteractive(1));
        router.push("/searchinteractive/motos/motocarro/searchcallelatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        router.push(
            "/searchinteractive/motos/motocarro/searchcallemotorelectrico"
        );
    };

    const irLatoneriaIzquierda = () => {
        dispatch(getFilterSearchInteractive(11));
        router.push(
            "/searchinteractive/motos/motocarro/searchcallelatoneriaizquierda"
        );
    };

    const irLatoneriaCentro = () => {
        dispatch(getFilterSearchInteractive(12));
        router.push(
            "/searchinteractive/motos/motocarro/searchcallelatoneriacentro"
        );
    };

    const irLatoneriaDerecha = () => {
        dispatch(getFilterSearchInteractive(13));
        router.push(
            "/searchinteractive/motos/motocarro/searchcallelatoneriaderecha"
        );
    };

     let blockscreen = useSelector((state) => state.blockscreen.blockscreen);

    useEffect(() => {
        let bloquear = "";
        if (blockscreen == 1)
            bloquear = "mt-20 fijardatosvehiculo deshabilitardos";
        else bloquear = "mt-20 fijardatosvehiculo habilitar";

        if (maximizarOption != 0) setControlFijar(bloquear);
        else setControlFijar("");
    }, [maximizarOption, blockscreen]);

    const minimizar = () => {
        if (maximizarOption != 0) {
            setMaximizarOption(0);
        }
    };

    const cerrarVenta = () => {
        setCloseWindow(true);
    };

    // Restaura datos del buscador interactivo
    useEffect(() => {
        if (maximizarOption == 0) setCloseWindow(false);
    }, [maximizarOption]);

    return (
        <Container title="Mi Cuenta">
            <div className="App">
                <ModalInformacionSearh
                    shown={showModalComentariosLatoneria}
                    close={() => {
                        setShowModalComentariosLatoneria(false);
                    }}
                    textoTituloInformacion={textoTituloInformacion}
                    textoUnoModalInformacion={textoUnoModalInformacion}
                    textoDosModalInformacion={textoDosModalInformacion}
                />
            </div>
            <div className="row ps-page ps-page--inner" id="searchmr">
                <div className={zoomTipoVehiculo}>
                    {!closeWindow ? (
                        <div className={controlFijar}>
                            {maximizarOption != 0 ? (
                                <ExpandAndCloseSearch
                                    maximizarOption={maximizarOption}
                                    setMaximizarOption={setMaximizarOption}
                                    setCloseWindow={setCloseWindow}
                                />
                            ) : null}

                            <div className="ml-20">
                                <SelectedVehicle />
                            </div>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={2}></Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriasedanseleccionada"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoLatoneria
                                                        }>
                                                        Exterior
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriasedanseleccionada"
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariolatoneria
                                                        }>
                                                        {!ubicarProductoLatoneria ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="botoncarroceriaexteriorcentrodos"
                                                        variant="outline-light"
                                                        onClick={
                                                            seleccionaUbicarProductoMotorElectrico
                                                        }>
                                                        Tren Motriz
                                                    </Button>
                                                </Col>
                                                <Col xs lg={2}>
                                                    <Button
                                                        className="informacionbotoncarroceriaexterior"
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariomotor
                                                        }>
                                                        {!ubicarProductoMotor ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <div className="mt-3 centrartextosexterior">
                                Elige en que parte del exterior está ubicado tu
                                repuesto
                            </div>
                            <Row>
                                <Col xs lg={11}>
                                    <ButtonGroup>
                                        <div className="espaciosposicionproductocarroceriaexterior">
                                            <Row>
                                                <Col xs lg={6}></Col>
                                                <Col xs lg={3} className="ml-4">
                                                    <Button
                                                        className={
                                                            marcaBotonCentro
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            irLatoneriaCentro
                                                        }>
                                                        Unica selección
                                                    </Button>
                                                </Col>
                                                <Col xs lg={1} className="ml-3">
                                                    <Button
                                                        className={
                                                            informacionMarcaBotonCentro
                                                        }
                                                        variant="outline-light"
                                                        onClick={
                                                            mostrarComentariohabitaculo
                                                        }>
                                                        {!ubicarProductoHabitaculo ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <div>
                                <Row>
                                    <Col xs lg={6}>
                                        <div className="cajaimagenesmotos auth__box-logo ">
                                            <CalleLatoneria
                                                ubicacion={"centro"}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {!zoomdatasearch || zoomdatasearch == "0" ? (
                                <Row>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <h1 className="textobuscadorintecractivomessage">
                                            ** Las imágenes a continuación son
                                            con fines ilustrativos, por ello
                                            pueden no corresponder exactamente
                                            con tu vehículo.
                                        </h1>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3}>
                                        <img
                                            className="logobuscadormr"
                                            src={logo.src}
                                            alt="First slide"
                                        />
                                    </Col>
                                </Row>
                            ) : null}
                        </div>
                    ) : null}
                    {maximizarOption != 0 ? (
                        <div className="fijarfiltros mt-90 maximizarbusquedafiltros">
                            <SidebarShopInteractiveSearch />
                        </div>
                    ) : null}
                </div>

                <div className={zoomBusquedaProductos}>
                    <div className="espacioiconosderechamotorelectrico">
                        <SearchInteractiveItems
                            productoBuscar={productoBuscar}
                            zoomTipoVehiculo={zoomTipoVehiculo}
                            setZoomTipoVehiculo={setZoomTipoVehiculo}
                            zoomBusquedaProductos={zoomBusquedaProductos}
                            setZoomBusquedaProductos={setZoomBusquedaProductos}
                            zoomBusquedaItems={zoomBusquedaItems}
                            setZoomBusquedaItems={setZoomBusquedaItems}
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            setMaximizarOption={setMaximizarOption}
                            maximizarOption={maximizarOption}
                            setCloseWindow={setCloseWindow}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CalleLatoneriaCentro;
