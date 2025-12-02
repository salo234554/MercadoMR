import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SelectedVehicle from "../../selectedvehicle";
import { getTypesVehicles } from "../../../../store/typesvehicles/action";
import TypesVehiclesRepository from "~/repositories/TypesVehiclesRepository";
import CloseIcon from "@material-ui/icons/Close";
import BotoneraUbicacionInicio from "~/components/interactivesearchcomponets/BotoneraUbicacionInicio";
import { getYearsVehicles } from "../../../../store/yearsvehicles/action";
import YearsVehiclesRepository from "~/repositories/YearsVehiclesRepository";
import logo from "../../../../public/imgcarrusel/sedan/nombrelogomr.png";
import SearchInteractiveItems from "../../../search/searchinteractiveitems";
import SidebarShopInteractiveSearch from "~/components/shared/sidebar/SidebarShopInteractiveSearch";
import WidgetFilterByPriceRangeInteractive from "~/components/shared/widgets/WidgetFilterByPriceRangeInteractive";
import Alert from "react-bootstrap/Alert";
import ModalInformacionSearh from "../../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../../store/filtersearchinteractive/action";
import ExpandAndCloseSearch from "../../expandandclose/ExpandAndCloseSearch";

const SearchInteractiveEstacaDoble = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [productoBuscar, setProductoBuscar] = useState("Chevrolet");

    //Definie variables para zoom de tipos de vehículos y busqueda de productos
    const [zoomTipoVehiculo, setZoomTipoVehiculo] = useState("col-md-6");
    const [zoomBusquedaProductos, setZoomBusquedaProductos] =
        useState("col-md-6");
    const [zoomBusquedaItems, setZoomBusquedaItems] = useState("");
    const [optionSelect, setOptionSelect] = useState(0);
    const [maximizarOption, setMaximizarOption] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [ubicarProductos, setUbicarProductos] = useState("");

    const [textoTituloInformacion, setTextoTituloInformacion] = useState("Vehiculos estaca doble cabina");
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] = useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] = useState("");

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
    const [controlFijar, setControlFijar] = useState("");
    const [closeWindow, setCloseWindow] = useState(false);

      const zoomdatasearch = useSelector(
            (state) => state.zoomdatasearch.zoomdatasearch
        );

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos
    const [annos, setAnnos] = useState([]);
    // Arreglo modelos de los Vehiculos segun Marca Seleccionda
    let blockscreen = useSelector((state) => state.blockscreen.blockscreen);

    let viewSearch = useSelector((state) => state.viewsearch.viewsearch);
    let selectviewprd = useSelector((state) => state.selectviewprd.selectviewprd);
    //console.log("VIEW SEARCH : ", selectviewprd);

    useEffect(() => {
        if (selectviewprd > 0 && viewSearch) {
            cerrarVenta();
        }
    }, [viewSearch, selectviewprd]);

    const mostrarComentariolatoneria = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Aquí están ubicados los productos en la parte exterior del vehículo");
        setTextoDosModalInformacion("Aquí encuentras productos relacionados con Latonería, Pintura, Farolas, Parachoques, Guardabarros, Luces, Depósitos de combustible, Espejos, Cubiertas de motor, Maletero entre otras.");
    };

    const mostrarComentariohabitaculo = () => {
        setShowModalComentariosHabitaculo(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("El Interior es la parte del vehiculo, donde se ubican los pasajeros.");
        setTextoDosModalInformacion("Los componentes del Interior son: Volante, Tablero, Pedales, Puertas, Consola central, Elevavidrios,  Sensores e interruptores.");
    };

    const mostrarComentariomotor = () => {
        setShowModalComentariosMotor(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Aquí están ubicados los productos del tren motriz de la vehículo.");
        setTextoDosModalInformacion(
            "Es el sistema que transmite la potencia del motor a las ruedas, permitiendo que el vehículo se desplace. Componentes principales: Motor, Transmisión, Ejes, Ruedas, entre otros");
    };

    const mostrarComentariolatoneriaIzquierda = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Aquí están ubicados los productos en la parte exterior, izquierda del vehículo");
        setTextoDosModalInformacion("La carrocería izquierda es la estructura externa que encierra y salvaguarda los componentes internos del mismo, como el motor, el chasis y el habitáculo, al ser la parte visible, proporciona forma, aerodinámica y protección contra impactos.");
    };

    const mostrarComentariolatoneriaCentro = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Aquí están ubicados los productos en la parte exterior, centro del vehículo");
        setTextoDosModalInformacion("La carrocería es el armazón o estructura externa de un vehículo, formada por planchas de metal unidas entre sí. Esta estructura protege el espacio donde se sitúan el conductor, los pasajeros y la carga.");
    };

    const mostrarComentariolatoneriaDerecha = () => {
        setShowModalComentariosLatoneria(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Aquí están ubicados los productos en la parte exterior, derecha del vehículo");
        setTextoDosModalInformacion("La carrocería derecha es la estructura externa que encierra, y salvaguarda los componentes en la parte derecha, como el motor, el chasis y el habitáculo, al ser la parte visible, proporciona forma, aerodinámica y protección contra impactos.");
    };

    const seleccionaUbicarProductoLatoneria = () => {
        dispatch(getFilterSearchInteractive(1));
        setUbicarProductos("Latoneria ");
        localStorage.setItem("ubicacionproducto", JSON.stringify("Latoneria"));
        setUbicarProductoHabitaculo(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionetas/estacadoblechasis/searchestacadoblelatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
        setShowModalhabitaculo(true);
        setUbicarProductos("Habitáculo ");
        localStorage.setItem("ubicacionproducto", JSON.stringify("Habitáculo"));
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        router.push(
            "/searchinteractive/camionetas/estacadoblechasis/searchestacadoblehabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        setUbicarProductos("Motor electrico ");
        localStorage.setItem(
            "ubicacionproducto",
            JSON.stringify("Motor electrico")
        );
        setShowModalMotorElectrico(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        router.push(
            "/searchinteractive/camionetas/estacadoblechasis/searchestacadoblemotorelectrico"
        );
    };

    useEffect(() => {
        let bloquear = "";
        if (blockscreen == 1) bloquear = "mt-20 fijardatosvehiculo deshabilitardos";
        else bloquear = "mt-20 fijardatosvehiculo habilitar";

        if (maximizarOption != 0) setControlFijar(bloquear);
        else setControlFijar("");
    }, [maximizarOption, blockscreen]);

    // Lee de la base de datos los años de los Vehiculos
    useEffect(() => {
        async function yearsvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const YearsVehicles =
                await YearsVehiclesRepository.getYearsVehicles(0);
            //console.log("YEARS VEHICLES : ", YearsVehicles);
            setAnnos(YearsVehicles);

            // Coloca los datos en state arreglo de años de los vehiculos
            dispatch(getYearsVehicles(YearsVehicles));
            //location.reload();
        }
        yearsvehicles(0);
    }, [tipos]);

    // Lee de la base de datos los tipos de Vehiculos
    useEffect(() => {
        async function typesvehicles(dat) {
            // Lee la función creada en repositories - TypesIdentificationsRepository
            const TypesVehicles =
                await TypesVehiclesRepository.getTypesVehicles(0);
            //console.log("TYPES VEHICLES : ", TypesVehicles[0].header_supplies);
            setVehiculos(TypesVehicles[0].header_supplies);

            // Coloca los datos en state arreglo de categorias
            dispatch(getTypesVehicles(TypesVehicles));
        }
        typesvehicles(0);
    }, [tipos]);

    const minimizar = () => {
        if (maximizarOption != 0) {
            localStorage.setItem("activargrilla", JSON.stringify(0));
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
                                <div className="mt-3 centrartextosedankatoneria">
                                    Elige la ubicación de tu repuesto
                                </div>
                                <BotoneraUbicacionInicio
                                    onClickBoton1={seleccionaUbicarProductoLatoneria}
                                    infoBoton1={mostrarComentariolatoneria}
                                    labelBoton1="Exterior"
                                    onClickBoton2={seleccionaUbicarProductoHabitaculo}
                                    infoBoton2={mostrarComentariohabitaculo}
                                    labelBoton2="Interior"
                                    onClickBoton3={seleccionaUbicarProductoMotorElectrico}
                                    infoBoton3={mostrarComentariomotor}
                                    labelBoton3="Tren Motriz"
                                    seleccionado={0}
                                    colorActived={2}
                                />

                            </div>
                            <div className="mt-45">
                                <div className="cajatrespuertasimagenlatoneria">
                                    <video autoPlay="false">
                                        <source
                                            src="/buscadorinteractivo/camionetas/estacadoblechasis/camionetadoblechasis.mp4"
                                            type="video/mp4"></source>
                                    </video>
                                </div>
                            </div>
                            {maximizarOption == 0 ? (
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
                            ) : null}
                        </div>
                    ) : null}
                    {maximizarOption != 0 ? (
                        <div className="fijarfiltros maximizarbusquedafiltros">
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
                            zoom={zoom}
                            setZoom={setZoom}
                            setCloseWindow={setCloseWindow}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

// controls CHABILITAR CONTROLES EN EL VIDEO
/*
 <div className="auth__box-logo">
                                <img src={coupegris.src}  />
                            </div>
                            */
export default SearchInteractiveEstacaDoble;
