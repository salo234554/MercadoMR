import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import BotoneraCamiones from "~/components/interactivesearchcomponets/BotoneraCamiones";
import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "../../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//Importafotos
import volquetasencillagris from "~/public/buscadorinteractivo/camionessintrompa/volquetasencillasintrompa/exterior/basegris.jpg";
import { getDataSelectedExternal } from "../../../../store/dataselectedexternal/action";
//import SearchInteractive from "../../../search/searchinteractive.jsx";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import ModalInformacionSearh from "../../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../../store/filtersearchinteractive/action";
import ExpandAndCloseSearch from "../../expandandclose/ExpandAndCloseSearch";

const SearchInteractiveVolquetaLatoneria = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("BMW");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);

    const [textoTituloInformacion, setTextoTituloInformacion] = useState(
        "Volqueta sencilla sin trompa"
    );
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] =
        useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] =
        useState("");

    // Definicion Latoneria
    const [showModalComentariosLatoneria, setShowModalComentariosLatoneria] =
        useState(false);
    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);

    // Definicion Habitácuolo
    const [showModalHabitaculo, setShowModalhabitaculo] = useState(false);
    const [showModalComentariosHabitaculo, setShowModalComentariosHabitaculo] =
        useState(false);

    // Definición Motor Eléctrico
    const [showModalMotorElectrico, setShowModalMotorElectrico] =
        useState(false);
    const [showModalComentariosMotor, setShowModalComentariosMotor] =
        useState(false);

    // Asignamos Datos al arreglo de Tipos de Vehiculos desde el state
    const tiposvehiculos = useSelector(
        (state) => state.typesvehicles.typesvehicles
    );
    // Asignamos Datos al arrego de Marcas de Vehiculos desde el state
    const marcasvehiculos = useSelector(
        (state) => state.vehiclesbrands.vehiclesbrands
    );
    // Asignamos Datos al arrego de Años de los Vehiculos desde el state
    const annosvehiculos = useSelector(
        (state) => state.yearsvehicles.yearsvehicles
    );
    // Asignamos Datos al arrego de modelos segun marca de los Vehiculos desde el state
    const modelosvehiculos = useSelector(
        (state) => state.modelsvehicles.modelsvehicles
    );
    // Asignamos Datos al arrego de carrocerias segun tipo de Vehiculos desde el state
    const carroceriasvehiculos = useSelector(
        (state) => state.bodiesvehicles.bodiesvehicles
    );
    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );
    //console.log("DATOS BUSCADOR : ", datosbuscadorinteractivo);
    const [controlFijar, setControlFijar] = useState("");
    const [closeWindow, setCloseWindow] = useState(false);

    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

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

    const mostrarComentarioUnicaSeleccion = () => {
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

    const seleccionaUbicarProductoLatoneriaIzquierda = () => {
        dispatch(getFilterSearchInteractive(11));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - izquierda")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 1,
        };

        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencillalatoneriaizquierda"
        );
    };

    const seleccionaUbicarProductoLatoneriaCentro = () => {
        dispatch(getFilterSearchInteractive(12));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - centro")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 2,
        };

        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencillalatoneriacentro"
        );
    };

    const seleccionaUbicarProductoLatoneriaDerecha = () => {
        dispatch(getFilterSearchInteractive(13));
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Latoneria - derecha")
        );
        const DatoSeleccionadoLatoneria = {
            exterior: 3,
        };

        //console.log(`DATOS BUSCADOR INTERACTIVO : `, DatoSeleccionadoLatoneria);
        dispatch(getDataSelectedExternal(DatoSeleccionadoLatoneria));
        router.push(
            "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencillalatoneriaderecha"
        );
    };

    const seleccionaUbicarProductoLatoneria = () => {
        dispatch(getFilterSearchInteractive(1));
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
        router.push(
            "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencillahabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        router.push(
            "/searchinteractive/camionessintrompa/volquetasencillasintrompa/searchvolquetasencillamotorelectrico"
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

    // Lee de la base de datos los años de los Vehiculos
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
                                <BotoneraCamiones
                                    onClickBoton1={mostrarComentariolatoneria}
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
                                    seleccionado={1}
                                    colorActived={1}
                                    tercerboton={1}
                                    onClickBoton4={
                                        seleccionaUbicarProductoLatoneriaCentro
                                    }
                                    infoBoton4={mostrarComentarioUnicaSeleccion}
                                    labelBoton4="Unica Selección"
                                />
                            </div>
                            <div className="cajatrespuertasimagenlatoneria">
                                <div className="auth__box-logo">
                                    <img src={volquetasencillagris.src} />
                                </div>
                            </div>
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

export default SearchInteractiveVolquetaLatoneria;
