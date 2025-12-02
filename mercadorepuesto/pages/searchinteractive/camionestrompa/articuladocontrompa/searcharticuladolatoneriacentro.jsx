import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/ContainerInteractive";
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
import BotoneraCamiones from "~/components/interactivesearchcomponets/BotoneraCamiones";
//Importar Carrusel
import ArticuladoLatoneria from "../../../CarruselVehiculos/Camionestrompa/ArticuladoConTrompa/ArticuladoLatoneria";
import ModalInformacionSearh from "../../../mensajes/ModalInformacionSearch";
import { getFilterSearchInteractive } from "../../../../store/filtersearchinteractive/action";
import ExpandAndCloseSearch from "../../expandandclose/ExpandAndCloseSearch";

const ArticuladoLatoneriaCentro = (props) => {
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

    const [textoTituloInformacion, setTextoTituloInformacion] = useState("Articulado con trompa");
    const [textoUnoModalInformacion, setTextoUnoModalInformacion] = useState("");
    const [textoDosModalInformacion, setTextoDosModalInformacion] = useState("");

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
        setInformacionMarcaBotonDerecho("informacionbotoncarroceriaexteriordos");
    }, []);

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

    const mostrarComentarioUnicaSeleccion = () => {
        setShowModalComentariosHabitaculo(true);
        setShowModalComentariosLatoneria(true);
        setTextoUnoModalInformacion("Este tipo de vehículo no incluye otras opciones");
        setTextoDosModalInformacion("Por las características del vehículo no hay otras opciones disponibles.");
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
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladolatoneria"
        );
    };

    const seleccionaUbicarProductoHabitaculo = () => {
        dispatch(getFilterSearchInteractive(2));
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladohabitaculo"
        );
    };

    const seleccionaUbicarProductoMotorElectrico = () => {
        dispatch(getFilterSearchInteractive(3));
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladomotorelectrico"
        );
    };

    const irLatoneriaIzquierda = () => {
        dispatch(getFilterSearchInteractive(11));
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladolatoneriaizquierda"
        );
    };

    const irLatoneriaCentro = () => {
        dispatch(getFilterSearchInteractive(12));
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladolatoneriacentro"
        );
    };

    const irLatoneriaDerecha = () => {
        dispatch(getFilterSearchInteractive(13));
        router.push(
            "/searchinteractive/camionestrompa/articuladocontrompa/searcharticuladolatoneriaderecha"
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
                            <BotoneraCamiones
                                onClickBoton1={mostrarComentariolatoneria}
                                infoBoton1={mostrarComentariolatoneria}
                                labelBoton1="Exterior"
                                onClickBoton2={seleccionaUbicarProductoHabitaculo}
                                infoBoton2={mostrarComentariohabitaculo}
                                labelBoton2="Interior"
                                onClickBoton3={seleccionaUbicarProductoMotorElectrico}
                                infoBoton3={mostrarComentariomotor}
                                labelBoton3="Tren Motriz"
                                seleccionado={1}
                                colorActived={1}
                                tercerboton={2}
                                onClickBoton4={irLatoneriaCentro}
                                infoBoton4={mostrarComentarioUnicaSeleccion}
                                labelBoton4="Unica Selección"
                            />
                            <div>
                                <Row>
                                    <div className="cajacincopuertasimagenlatoneriaCarrusel auth__box-logo ">
                                        <ArticuladoLatoneria
                                            ubicacion={"centro"}
                                        />
                                    </div>
                                </Row>
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

export default ArticuladoLatoneriaCentro;
