import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/ContainerInteractive";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedVehicle from "../selectedvehicle";
import CloseIcon from "@material-ui/icons/Close";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import logo from "../../../public/imgcarrusel/sedan/nombrelogomr.png";
import BotoneraUbicacion from "~/components/interactivesearchcomponets/BotoneraUbicacion";
import { useDispatch, useSelector } from "react-redux";
//Importar Carrusel
import CincoPuertasLatoneria from "../../CarruselVehiculos/CarruselCincoPuertas/CincoPuertasLatoneria";
import SearchInteractive from "../../search/searchinteractive.jsx";
import SearchInteractiveItems from "../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import ModalInformacionSearh from "../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../store/filtersearchinteractive/action";
import ExpandAndCloseSearch from "../expandandclose/ExpandAndCloseSearch";

let tipovehsel = 0;

const SearchInteractiveCincoPuertasLatoneriaDerecha = (props) => {
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
        "Automóvil 5 puertas"
    );
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] =
        useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] =
        useState("");

    // Definicion Latoneria
    const [marcaBotonIzquierdo, setMarcaBotonIzquierdo] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonCentro, setMarcaBotonCentro] = useState(
        "botoncarroceriaexterior"
    );
    const [marcaBotonDerecho, setMarcaBotonDerecho] = useState(
        "botoncarroceriasedanseleccionadatres"
    );
    const [informacionMarcaBotonIzquierdo, setInformacionMarcaBotonIzquierdo] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonCentro, setInformacionMarcaBotonCentro] =
        useState("informacionbotoncarroceriaexterior");
    const [informacionMarcaBotonDerecho, setInformacionMarcaBotonDerecho] =
        useState("informacionbotoncarroceriaderechaseleccionada");

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
    const [controlFijar, setControlFijar] = useState("");
    const [closeWindow, setCloseWindow] = useState(false);

    const zoomdatasearch = useSelector(
        (state) => state.zoomdatasearch.zoomdatasearch
    );

    // Inicializamos el arrego de Tipos de Vehiculos
    useEffect(() => {
        setMarcaBotonDerecho("botoncarroceriasedanseleccionadatres");
        setInformacionMarcaBotonDerecho(
            "informacionbotoncarroceriaderechaseleccionada"
        );

        setMarcaBotonIzquierdo("botoncarroceriaexterior");
        setInformacionMarcaBotonIzquierdo("informacionbotoncarroceriaexterior");

        setMarcaBotonCentro("botoncarroceriaexterior");
        setInformacionMarcaBotonCentro("informacionbotoncarroceriaexterior");
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

    const seleccionaUbicarProductoLatoneria = () => {
        dispatch(getFilterSearchInteractive(1));
        router.push(
            "/searchinteractive/automovilcincopuertas/searchcincopuertaslatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
        router.push(
            "/searchinteractive/automovilcincopuertas/searchcincopuertashabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        if (tipovehsel != 4) {
            router.push(
                "/searchinteractive/automovilcincopuertas/searchcincopuertasmotorelectrico"
            );
        } else {
            router.push(
                "/searchinteractive/automoviltrespuertas/searchtrespuertassistemasvehelectrico"
            );
        }
    };

    useEffect(() => {
        tipovehsel = JSON.parse(localStorage.getItem("tipovehselect"));
    }, []);

    const irLatoneriaIzquierda = () => {
        dispatch(getFilterSearchInteractive(11));
        router.push(
            "/searchinteractive/automovilcincopuertas/searchcincopuertaslatoneriaizquierda"
        );
    };

    const irLatoneriaCentro = () => {
        console.log("irLatoneriaCentro");
        dispatch(getFilterSearchInteractive(12));
        router.push(
            "/searchinteractive/automovilcincopuertas/searchcincopuertaslatoneriacentro"
        );
    };

    const irLatoneriaDerecha = () => {
        dispatch(getFilterSearchInteractive(13));
        router.push(
            "/searchinteractive/automovilcincopuertas/searchcincopuertaslatoneriaderecha"
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
                                seleccionado={1}
                                colorActived={1}
                            />
                            <div className="mt-3 centrartextosexterior">
                                Elige en que parte del exterior está ubicado tu
                                repuesto
                            </div>
                            <BotoneraUbicacion
                                onClickBoton1={irLatoneriaIzquierda}
                                infoBoton1={mostrarComentariolatoneria}
                                labelBoton1="Izquierda"
                                onClickBoton2={irLatoneriaCentro}
                                infoBoton2={mostrarComentariohabitaculo}
                                labelBoton2="Centro"
                                onClickBoton3={irLatoneriaDerecha}
                                infoBoton3={mostrarComentariomotor}
                                labelBoton3="Derecha"
                                seleccionado={3}
                                colorActived={1}
                            />
                            <Row>
                                <div className="cajacincopuertasimagenlatoneriaCarrusel auth__box-logo">
                                    <CincoPuertasLatoneria
                                        ubicacion={"derecha"}
                                    />
                                </div>
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
/*
 <div className="auth__box-logo">
                                <img src={sedangris.src}  />
                            </div>
                            */
export default SearchInteractiveCincoPuertasLatoneriaDerecha;
