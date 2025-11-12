import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "../../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
import BotoneraUbicacion from "~/components/interactivesearchcomponets/BotoneraUbicacion";
//Importafotos
import vanshabitaculo from "~/public/buscadorinteractivo/vansybuses/vans/interior/general.jpg";
import vanshabitaculoconsola from "~/public/buscadorinteractivo/vansybuses/vans/interior/tablero.jpg";
import vanshabitaculoasientos from "~/public/buscadorinteractivo/vansybuses/vans/interior/asientos.jpg";
import vanshabitaculotecho from "~/public/buscadorinteractivo/vansybuses/vans/interior/techo.jpg";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import ModalInformacionSearh from "../../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../../store/filtersearchinteractive/action";
import ExpandAndCloseSearch from "../../expandandclose/ExpandAndCloseSearch";
import { getPosicionHabitaculo } from "~/store/posicionhabitaculo/action";

const VansLatoneriaHabitaculo = (props) => {
    const router = useRouter();
    const [productoBuscar, setProductoBuscar] = useState("BMW");
    const dispatch = useDispatch();

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    const [textoTituloInformacion, setTextoTituloInformacion] =
        useState("Automóvil Vans");
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] =
        useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] =
        useState("");

    // Definicion Latoneria
    const [marcaBotonConsola, setMarcaBotonConsola] = useState(
        "botoncarroceriahabitaculotechoeitNew"
    );
    const [marcaBotonAsiento, setMarcaBotonAsiento] = useState(
        "botoncarroceriahabitaculotechoeitNew"
    );
    const [marcaBotontecho, setMarcaBotontecho] = useState(
        "botoncarroceriahabitaculotechoeitNew"
    );
    const [informacionMarcaBotonConsola, setInformacionMarcaBotonConsola] =
        useState("informacionbotoncarroceriasedancdidosNew");
    const [informacionMarcaBotonAsiento, setInformacionMarcaBotonAsiento] =
        useState("informacionbotonhabitaculocdiNew");
    const [informacionMarcaBotontecho, setInformacionMarcaBotontecho] =
        useState("informacionbotoncarroceriasedancditresNew");

    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);

    const [ubicarProductoConsola, setUbicarProductoConsola] = useState(false);
    const [ubicarProductoAsientoGeneral, setUbicarProductoAsientoGeneral] =
        useState(false);
    const [ubicarProductoTecho, setUbicarProductoTecho] = useState(false);

    const [habilitarMarcacion, setHabilitarMarcacion] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(true);
    const [marcarHabitaculo, setMarcarHabitaculo] = useState(false);

    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    const [habilitarCategoriaHabitaculo, setHabilitarCategoriaHabitaculo] =
        useState(true);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);
    // Definición Motor Eléctrico
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);
    const [controlFijar, setControlFijar] = useState("");
    const [closeWindow, setCloseWindow] = useState(false);

    const [classBotonera, setClassBotonera] = useState("");

    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

    const posicionhabitaculo = useSelector(
        (state) => state.posicionhabitaculo.posicionhabitaculo
    );

      const activarviewprd = useSelector(
            (state) => state.activarviewprd.activarviewprd
        );

    useEffect(() => {
        if (zoomdatasearch != "0" && zoomdatasearch != 0) {
            setClassBotonera("ubicarSearchIntButtons");
        } else {
            setClassBotonera("");
        }
    }, [zoomdatasearch]);

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
            "El Interior es la parte del vehiculo, donde se ubican los pasajeros."
        );
        setTextoDosModalInformacion(
            "Los componentes del Interior son: Volante, Tablero, Pedales, Puertas, Consola central, Elevavidrios,  Sensores e interruptores."
        );
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos del tren motriz de la vehículo."
        );
        setTextoDosModalInformacion(
            "Es el sistema que transmite la potencia del motor a las ruedas, permitiendo que el vehículo se desplace. Componentes principales: Motor, Transmisión, Ejes, Ruedas, entre otros"
        );
    };

    const mostrarComentariolatoneriaIzquierda = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos en la parte exterior, izquierda del vehículo"
        );
        setTextoDosModalInformacion(
            "La carrocería izquierda es la estructura externa que encierra y salvaguarda los componentes internos del mismo, como el motor, el chasis y el habitáculo, al ser la parte visible, proporciona forma, aerodinámica y protección contra impactos."
        );
    };

    const mostrarComentariolatoneriaCentro = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos en la parte exterior, centro del vehículo"
        );
        setTextoDosModalInformacion(
            "La carrocería es el armazón o estructura externa de un vehículo, formada por planchas de metal unidas entre sí. Esta estructura protege el espacio donde se sitúan el conductor, los pasajeros y la carga."
        );
    };

    const mostrarComentariolatoneriaDerecha = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion(
            "Aquí están ubicados los productos en la parte exterior, derecha del vehículo"
        );
        setTextoDosModalInformacion(
            "La carrocería derecha es la estructura externa que encierra, y salvaguarda los componentes en la parte derecha, como el motor, el chasis y el habitáculo, al ser la parte visible, proporciona forma, aerodinámica y protección contra impactos."
        );
    };

    const seleccionaParteConsola = () => {
        dispatch(getPosicionHabitaculo(1));
        dispatch(getFilterSearchInteractive(21));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - consola")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);

        setUbicarProductoConsola(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoTecho(false);

        setMarcaBotonConsola("botonsedanizquierdaderechacentromarcadoNew");
        setMarcaBotonAsiento("botoncarrocerianoseleccionasientosNew");
        setMarcaBotontecho("botoncarrocerianoseleccionasientosNew");

        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedanseleccionadaNew"
        );
        setInformacionMarcaBotonAsiento(
            "informacionbotonnoseleccionasientosNew"
        );
        setInformacionMarcaBotontecho("informacionbotonnoselecciontechoNew");
    };

    const seleccionaParteAsientosGeneral = () => {
        dispatch(getPosicionHabitaculo(2));
        dispatch(getFilterSearchInteractive(22));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - asiento")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoAsientoGeneral(true);
        setUbicarProductoConsola(false);
        setUbicarProductoTecho(false);
        setMarcaBotonConsola("botoncarrocerianoseleccionconsolaNew");
        setMarcaBotonAsiento("botonsedanizquierdaderechacentromarcadoNew");
        setMarcaBotontecho("botoncarrocerianoseleccionconsolaNew");

        setInformacionMarcaBotonConsola("informacionbotonnoselecciontechoNew");
        setInformacionMarcaBotonAsiento(
            "informacionbotoncarroceriasedanseleccionadaNew"
        );
        setInformacionMarcaBotontecho("informacionbotonnoselecciontechoNew");
    };

    const seleccionaParteTecho = () => {
        dispatch(getPosicionHabitaculo(3));
        dispatch(getFilterSearchInteractive(23));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Interior - techo")
        );
        setUbicarProductoHabitaculo(false);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoTecho(true);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoConsola(false);
        setMarcaBotonConsola("botoncarrocerianoseleccionconsolaNew");
        setMarcaBotonAsiento("botoncarrocerianoseleccionasientosNew");
        setMarcaBotontecho("botonsedanizquierdaderechacentromarcadoNew");
        //router.push("/searchinteractive/sedan/searchsedanlatoneriaderecha");

        setInformacionMarcaBotonConsola("informacionbotonnoselecciontechoNew");
        setInformacionMarcaBotonAsiento(
            "informacionbotonnoseleccionasientosNew"
        );
        setInformacionMarcaBotontecho(
            "informacionbotoncarroceriasedanseleccionadaNew"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {
        dispatch(getFilterSearchInteractive(1));
        router.push("/searchinteractive/vansybuses/vans/searchvanslatoneria");
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
        setUbicarProductoHabitaculo(true);
        setHabilitarCategoriaHabitaculo(true);
        setUbicarProductoTecho(false);
        setUbicarProductoAsientoGeneral(false);
        setUbicarProductoConsola(false);
        setInformacionMarcaBotonConsola(
            "informacionbotoncarroceriasedancdidosNew"
        );
        setInformacionMarcaBotonAsiento("informacionbotonhabitaculocdiNew");
        setInformacionMarcaBotontecho(
            "informacionbotoncarroceriasedancditresNew"
        );
        setMarcaBotonConsola("botoncarroceriahabitaculotechoeitNew");
        setMarcaBotonAsiento("botoncarroceriahabitaculotechoeitNew");
        setMarcaBotontecho("botoncarroceriahabitaculotechoeitNew");
        router.push("/searchinteractive/vansybuses/vans/searchvanshabitaculo");
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        router.push(
            "/searchinteractive/vansybuses/vans/searchvansmotorelectrico"
        );
    };

    useEffect(() => {
        if (maximizarOption != 0)
            setControlFijar("mt-20 fijardatosvehiculohabitaculo");
        else setControlFijar("");
    }, [maximizarOption]);

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

    useEffect(() => {
        if (posicionhabitaculo == 1)
            setMarcaBotonConsola("botonsedanizquierdaderechacentromarcadoNew");
        else if (posicionhabitaculo == 2)
            setMarcaBotonAsiento("botonsedanizquierdaderechacentromarcadoNew");
        else if (posicionhabitaculo == 3)
            setMarcaBotontecho("botonsedanizquierdaderechacentromarcadoNew");
    }, [activarviewprd]);

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
            <div className="rowMobile ps-page ps-page--inner" id="searchmr">
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
                            <div className=" ">
                                <SelectedVehicle />
                            </div>
                            <BotoneraUbicacion
                                onClickBoton1={
                                    seleccionaUbicarProductoLatoneria
                                }
                                infoBoton1={mostrarComentariolatoneria}
                                labelBoton1="Exterior"
                                onClickBoton2={
                                    seleccionaUbicarProductoHabitaculo
                                }
                                infoBoton2={mostrarComentariohabitaculo}
                                labelBoton2="Interior"
                                onClickBoton3={
                                    seleccionaUbicarProductoMotorElectrico
                                }
                                infoBoton3={mostrarComentariomotor}
                                labelBoton3="Tren Motriz"
                                seleccionado={2}
                                colorActived={1}
                            />
                            <div className="mt-3 centrartextosexterior">
                                Elige en que parte del interior está ubicado tu
                                repuesto
                            </div>

                            <div className={classBotonera}>
                                <Row className="topSearchIntButtons">
                                    <div className="contSearchIntButtons">
                                        <div>
                                            <Button
                                                className={marcaBotonConsola}
                                                variant="outline-light"
                                                onClick={
                                                    seleccionaParteConsola
                                                }>
                                                Consola
                                            </Button>
                                            <Button
                                                className={
                                                    informacionMarcaBotonConsola
                                                }
                                                variant="outline-light"
                                                onClick={
                                                    mostrarComentariolatoneria
                                                }>
                                                {!habilitarMarcacion ? (
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </Button>
                                        </div>

                                        <div>
                                            <Button
                                                className={marcaBotonAsiento}
                                                variant="outline-light"
                                                onClick={
                                                    seleccionaParteAsientosGeneral
                                                }>
                                                Asientos
                                            </Button>
                                            <Button
                                                className={
                                                    informacionMarcaBotonAsiento
                                                }
                                                variant="outline-light"
                                                onClick={
                                                    mostrarComentariohabitaculo
                                                }>
                                                {!habilitarMarcacion ? (
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </Button>
                                        </div>

                                        <div>
                                            <Button
                                                className={marcaBotontecho}
                                                variant="outline-light"
                                                onClick={seleccionaParteTecho}>
                                                Techo
                                            </Button>
                                            <Button
                                                className={
                                                    informacionMarcaBotontecho
                                                }
                                                variant="outline-light"
                                                onClick={
                                                    mostrarComentariomotor
                                                }>
                                                {!habilitarMarcacion ? (
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                ) : (
                                                    <i
                                                        className="fa fa-check-square-o d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="buttonstopIntMobile">
                                        <div className="topSearchIntButtonsMobile">
                                            <div>
                                                <Button
                                                    className={
                                                        ubicarProductoConsola
                                                            ? "botonSelectWhite"
                                                            : "botonPartCarroceriaMobileDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        seleccionaParteConsola
                                                    }>
                                                    Consola
                                                </Button>
                                                <Button
                                                    className={
                                                        ubicarProductoConsola
                                                            ? "infoButtonWhite"
                                                            : "infoButtonNewSearchDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        mostrarComentariolatoneria
                                                    }>
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    className={
                                                        ubicarProductoAsientoGeneral
                                                            ? "botonSelectWhite"
                                                            : "botonPartCarroceriaMobileDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        seleccionaParteAsientosGeneral
                                                    }>
                                                    Asientos
                                                </Button>
                                                <Button
                                                    className={
                                                        ubicarProductoAsientoGeneral
                                                            ? "infoButtonWhite"
                                                            : "infoButtonNewSearchDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        mostrarComentariohabitaculo
                                                    }>
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="bottomSearchIntButtonsMobile">
                                            <div>
                                                <Button
                                                    className={
                                                        ubicarProductoTecho
                                                            ? "botonSelectWhite"
                                                            : "botonPartCarroceriaMobileDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        seleccionaParteTecho
                                                    }>
                                                    Techo
                                                </Button>
                                                <Button
                                                    className={
                                                        ubicarProductoTecho
                                                            ? "infoButtonWhite"
                                                            : "infoButtonNewSearchDeseleccionado"
                                                    }
                                                    variant="outline-light"
                                                    onClick={
                                                        mostrarComentariomotor
                                                    }>
                                                    <i
                                                        className="fa fa-info d-flex justify-content-center"
                                                        aria-hidden="true"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                            <br />
                            <Row>
                                <Col xs={12} md={12} lg={12}>
                                    {ubicarProductoHabitaculo ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculocincopuertas"
                                                src={vanshabitaculo.src}
                                            />
                                        </div>
                                    ) : ubicarProductoConsola ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculocincopuertas"
                                                src={vanshabitaculoconsola.src}
                                            />
                                        </div>
                                    ) : ubicarProductoAsientoGeneral ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculocincopuertas"
                                                src={vanshabitaculoasientos.src}
                                            />
                                        </div>
                                    ) : ubicarProductoTecho ? (
                                        <div>
                                            <img
                                                className="tamañoimageneshabitaculocincopuertas"
                                                src={vanshabitaculotecho.src}
                                            />
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <div className="textImgBottomBuscadorInt">
                                {!zoomdatasearch || zoomdatasearch == "0" ? (
                                    <>
                                                                           <h1 className="txtButtonP">
                                                                               ** Las imágenes a continuación son
                                                                               con fines ilustrativos, por ello
                                                                               pueden no corresponder exactamente
                                                                               con tu vehículo.
                                                                           </h1>
                                                                           <img
                                                                               className="logobuscadormrBuscInt"
                                                                               src={logo.src}
                                                                               alt="First slide"
                                                                           />
                                                                       </>
                                ) : null}
                            </div>
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

export default VansLatoneriaHabitaculo;
