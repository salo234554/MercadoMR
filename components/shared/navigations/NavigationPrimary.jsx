import { useEffect, useState, useRef } from "react";
//import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
import ModuleHeaderSupplies from "~/components/shared/headers/modules/ModuleHeaderSupplies";
import ModuleHeaderVender from "~/components/shared/headers/modules/ModuleHeaderVender";
import MainMenuRepository from "~/repositories/MainMenuRepository";
import menu from "~/public/static/data/menu.json";
import InteractiveShopping from "../InteractiveShopping/InteractiveShopping";
import { useDispatch, useSelector } from "react-redux";
//import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import ModuleHeaderHistorial from "../headers/modules/ModuleHeaderHistorial";
import ModuleHeaderAyudaPQR from "../headers/modules/ModuleHeaderAyudaPQR";
import { getFilterGarage } from "../../../store/filtergarage/action";
import { getFiltroOrderByPrd } from "../../../store/filtroorderbyprd/action";
import { getCambioDireccion } from "@/store/cambiodireccion/action";
import { getIraComprar } from "@/store/iracomprar/action";
import { IoChevronForward, IoLocationSharp } from "react-icons/io5";
import { URL_BD_MR } from "~/helpers/Constants";
import axios from "axios";
import { useRouter } from "next/router";
import ModalDenegarAcceso from "~/pages/mensajes/ModalDenegarAcceso";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { RxBell } from "react-icons/rx";
import { getUserMenuPrimary } from "../../../store/usermenuprimary/action";
import { getCtlrInputSuccess } from "~/store/ctlrinput/action";

const NavigationPrimary = (props) => {
    const irA = useRef(null); //PosiciónTopPage
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [mainMenu, setMainMenu] = useState(menu.main_menu);
    //console.log("MAIN MENU : ",menu.main_menu)
    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const cambiodireccion = useSelector(
        (state) => state.cambiodireccion.cambiodireccion
    );
    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos
    const [direccion, setDireccion] = useState(null);
    const opencategorias = useSelector(
        (state) => state.ctlrinput.viewcategorias
    );
    const router = useRouter();

    const [showModalDenegarAcceso, setShowModalDenegarAcceso] = useState(false);
    const [tituloControlAcceso, setTituloControlAcceso] = useState("");
    const [textoControlAcceso, setTextoControlAcceso] = useState("");

    const numberitemswishlist = useSelector(
        (state) => state.wishlist.datawishlist
    );
    const iracomprar = useSelector((state) => state.iracomprar.iracomprar);

    const [preguntas, setPreguntas] = useState([]);
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [notificacionesgen, setNotificacionesGen] = useState([]);
    const [notificacionesRecientes, setNotificacionesRecientes] = useState([]);
    const [respuestas, setRespuestas] = useState([]);

    useEffect(() => {
        const leerComrpasUsuario = async () => {
            let params = {
                uidcomprador: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "1031",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log(
                            "Compras del usuario para notificaciones:",
                            res.data.listarmiscompras
                        );
                        const comprasConTipo = res.data.listarmiscompras.map(
                            (compra) => ({ ...compra, tipo: "compra" })
                        );
                        setCompras(comprasConTipo);
                    } else if (
                        res.data.type === 0 ||
                        res.data === "ERROR al leer compra notificaciones"
                    ) {
                        console.error(
                            "Error del servidor al leer compra notificaciones:",
                            res.data
                        );
                    } else {
                        console.error(
                            "Respuesta inesperada del servidor al leer compra notificaciones:",
                            res.data
                        );
                    }
                })
                .catch(function (error) {
                    console.error(
                        "Error al hacer la petición al leer compra notificaciones:",
                        error
                    );
                });
        };

        leerComrpasUsuario();
    }, []);

    useEffect(() => {
        const leerVentasUsuario = async () => {
            let params = {
                uidvendedor: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "1061",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log(
                            "Ventas del usuario para notificaciones ventas:",
                            res.data.listarmisventas
                        );
                        const ventasConTipo = res.data.listarmisventas.map(
                            (venta) => ({ ...venta, tipo: "venta" })
                        );
                        setVentas(ventasConTipo);
                    } else if (
                        res.data.type === 0 ||
                        res.data === "ERROR ventas"
                    ) {
                        console.error("Error del servidor ventas:", res.data);
                    } else {
                        console.error(
                            "Respuesta inesperada del servidor ventasx:",
                            res.data
                        );
                    }
                })
                .catch(function (error) {
                    console.error("Error al hacer la petición ventas:", error);
                });
        };
        leerVentasUsuario();
    }, []);

    useEffect(() => {
        const leerNotificacionesActivas = async () => {
            let params = {
                uidusuario: datosusuarios.uid,
            };

            //console.log("USER ID:", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "825",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        //console.log("Notificación ACTIVAS Usuario:", res.data.listarnotificacionesactivas);
                        let datanotificacion =
                            res.data.listarnotificacionesactivas;
                        localStorage.setItem(
                            "notificacionesusuario",
                            JSON.stringify(datanotificacion)
                        );
                    } else if (
                        res.data.type === 0 ||
                        res.data === "ERROR de notificaciones"
                    ) {
                        console.error(
                            "Error notificaciones activas:",
                            res.data
                        );
                    } else {
                        console.error(
                            "Respuesta inesperada notificaciones activas:",
                            res.data
                        );
                    }
                })
                .catch(function (error) {
                    console.error(
                        "Error petición notificaciones activas:",
                        error
                    );
                });
        };

        //leerNotificacionesActivas();

        const leerNotificacionesGeneral = async () => {
            let params = {
                uidusuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "824",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log(
                            "Notificación General Usuario:",
                            res.data.listarnotificaciones
                        );
                        let datanotificacion = res.data.listarnotificaciones;
                        localStorage.setItem(
                            "notificacionesusuario",
                            JSON.stringify(datanotificacion)
                        );

                        let notificacionesFiltradas = [];
                        let notificacionesConTipo = [];
                        if (res.data.listarnotificaciones.length > 0) {
                            //alert(res.data.listarnotificaciones.length)
                            notificacionesFiltradas =
                                res.data.listarnotificaciones.filter(
                                    (notificacion) =>
                                        (notificacion.estado == 90 ||
                                            notificacion.estado == 91) &&
                                        res.data.listarnotificaciones.some(
                                            (p) =>
                                                p.idnotificacion ===
                                                    notificacion.idnotificacion &&
                                                (p.estado === 90 ||
                                                    p.estado === 91)
                                        )
                                );
                            notificacionesConTipo = notificacionesFiltradas.map(
                                (notificacion) => ({
                                    ...notificacion,
                                    tipo: "notificacion",
                                })
                            );
                        }

                        //console.log("notificaciones fILTRADAS:", notificacionesConTipo);
                        setNotificacionesGen(notificacionesConTipo);
                    } else if (
                        res.data.type === 0 ||
                        res.data === "ERROR de notificaciones"
                    ) {
                        console.error(
                            "Error del servidor  de notificaciones:",
                            res.data
                        );
                    } else {
                        console.error(
                            "Respuesta inesperada del servidor  de notificaciones:",
                            res.data
                        );
                    }
                })
                .catch(function (error) {
                    console.error(
                        "Error al hacer la petición notificación:",
                        error
                    );
                });
        };

        leerNotificacionesGeneral();
    }, []);

    useEffect(() => {
        const leerRespuestas = async () => {
            let params = {
                uidcomprador: datosusuarios.uid,
            };

            //console.log("PARAMSRESP:", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "5211",
                params,
            })
                .then((res) => {
                    if (res.data.type === 1) {
                        console.log(
                            "Respuestas del usuario para notificaciones:",
                            res.data.listpreguntacompra
                        );
                        const comprasConTipo = res.data.listpreguntacompra.map(
                            (respuesta) => ({ ...respuesta, tipo: "respuesta" })
                        );
                        setRespuestas(comprasConTipo);
                    } else if (
                        res.data.type === 0 ||
                        res.data === "ERROR de respuestas"
                    ) {
                        console.error(
                            "Error del servidor de respuestas:",
                            res.data
                        );
                    } else {
                        console.error(
                            "Respuesta inesperada del servidor de respuestas:",
                            res.data
                        );
                    }
                })
                .catch(function (error) {
                    console.error(
                        "Error al hacer la petición de respuestas:",
                        error
                    );
                });
        };

        leerRespuestas();
    }, []);

    useEffect(() => {
        //Verificamos que las variables estén definidas y no estén vacías
        //console.log("TRANSACCIONXXXX:", preguntas);
        if (compras && ventas && preguntas && respuestas && notificacionesgen) {
            // Unimos las compras, las ventas, las preguntas y las respuestas en una sola lista
            const transacciones = [
                ...compras,
                ...ventas,
                ...preguntas,
                ...respuestas,
                ...notificacionesgen,
            ];
            // Mostramos las transacciones recientes en la consola
            // Ordenamos las transacciones por fecha
            transacciones.sort(
                (a, b) =>
                    new Date(b.fechacompra || b.fechacreacion) -
                    new Date(a.fechacompra || a.fechacreacion)
            );
            //console.log("TRANSACCIONXXXX:", transacciones);
            // Nos quedamos con las 4 transacciones más recientes
            const recientes = transacciones.slice(0, 8);
            //console.log("Transacciones recientes:", recientes); // Mostramos las transacciones recientes en la consola
            let ctlrnotificacion = JSON.parse(
                localStorage.getItem("ctlrnotificacion")
            );

            if (ctlrnotificacion == 0) {
                localStorage.setItem(
                    "arraynotificacion",
                    JSON.stringify(recientes)
                );
                setNotificacionesRecientes(recientes);
                //dispatch(getCtlrNotificacion(1));
            } else {
                let arraynotificacion = JSON.parse(
                    localStorage.getItem("arraynotificacion")
                );
                setNotificacionesRecientes(arraynotificacion);
            }
        } else {
            console.error(
                "Error: Las variables compras, ventas, preguntas o respuestas están vacías o no definidas"
            );
        }
    }, [compras, ventas, preguntas, respuestas, notificacionesgen]);

    useEffect(() => {
        let queries;
        async function getMainMenu(dat) {
            const MenuPrincipal = await MainMenuRepository?.getMainMenu(0);
            //console.log("DATOS MENU BD : ", MenuPrincipal[0])
            //console.log("DATOS JSON : ", menu.main_menu)
            setMainMenu(MenuPrincipal[0]?.main_menu);
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getMainMenu(queries);
    }, [stateInf]);
    //<ModuleHeaderCategories categorias={categorias} setCategorias={setCategorias} />
    //<ModuleHeaderSupplies />

    const handleClick = (event) => {
        localStorage.setItem("ctrlposicionprd", JSON.stringify(0));
        localStorage.setItem("orderbyprd", JSON.stringify(0));
        localStorage.setItem("textoorderbyprd", JSON.stringify("Ordenar por"));
        dispatch(getFiltroOrderByPrd(0));
        dispatch(getFilterGarage(false));
        dispatch(getCtlrInputSuccess(false));

        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        //dispatch(getUserMenuPrimary(false));
    };

    // Función para obtener dirección de usuario
    useEffect(() => {
        let activacompra = JSON.parse(localStorage.getItem("activacompra"));

        if (activacompra) {
            setShowModalDenegarAcceso(true);
            setTituloControlAcceso("Compras MR");
            setTextoControlAcceso(
                "Proceso de compra se completo de manera correcta!"
            );
            localStorage.setItem("activacompra", JSON.stringify(false));
        }

        const obtenerDireccionUsuario = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "281",
                    params,
                });
                // Ordenamos las direcciones por fecha de creación y seleccionamos la más reciente
                const direccionesOrdenadas =
                    res.data.listardireccionesusuario.sort(
                        (a, b) =>
                            new Date(b.fechacreacion).getTime() -
                            new Date(a.fechacreacion).getTime()
                    );
                setDireccion(direccionesOrdenadas[0]);
                dispatch(getCambioDireccion(0));
            } catch (error) {
                // console.error("Error al leer la dirección del usuario", error);
            }
        };
        obtenerDireccionUsuario();
    }, [datosusuarios, cambiodireccion]);

    const cambiarDireccion = () => {
        let ruta = "/EditUsers/FormsEditUsers/FormDomicilio/";
        router.push(ruta);
    };

    const handleCreateAccount = () => {
        router.push("/my-account");
    };

    const handleLogin = () => {
        router.push("/loginaccount");
    };

    const handleIrVerificado = (path) => {
        if (!datosusuarios || !datosusuarios?.uid) {
            // Si el usuario NO está logueado, lo manda al login
            router.push("/loginaccount");
        } else {
            // Si está logueado, va a la ruta que le mandes
            router.push(path);
        }
    };

    useEffect(() => {
        dispatch(getIraComprar(false));
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [iracomprar]);

    return (
        <nav className="navigation--primary positionnavprimary">
            <div ref={irA}>
                <ModalDenegarAcceso
                    shown={showModalDenegarAcceso}
                    close={setShowModalDenegarAcceso}
                    titulo={tituloControlAcceso}
                    mensaje={textoControlAcceso}
                    tipo="1"
                />

                <div
                    className="container show1050Nav"
                    onClick={() => handleClick()}>
                    <div className="navigation__left posicion">
                        <ModuleHeaderSupplies opencategorias={opencategorias} />
                        <InteractiveShopping />
                        <ModuleHeaderVender />
                        <ModuleHeaderHistorial />
                        <ModuleHeaderAyudaPQR />
                    </div>
                    <div className="navigation__right">
                        <ModuleHeaderActions />
                    </div>
                </div>
                <div className="hidde1050Nav" onClick={() => handleClick()}>
                    {datosusuarios && datosusuarios.uid ? (
                        <div className="hidde850NavIcons">
                            <div
                                onClick={() => cambiarDireccion()}
                                className="ubiMobileNav">
                                <IoLocationSharp />{" "}
                                <p>
                                    Enviar a {direccion?.nombreciudad}{" "}
                                    <IoChevronForward />
                                </p>
                            </div>

                            <div className="iconsRightNavMobile">
                                <div className="kart-mobile-menu-main-primary">
                                    <div
                                        className={`kart-mobile-menu ${
                                            !datosusuarios || !datosusuarios.uid
                                                ? "kart-unable"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (
                                                !datosusuarios ||
                                                !datosusuarios.uid
                                            )
                                                return;
                                            handleIrVerificado("/Notification");
                                        }}>
                                        <RxBell />

                                        {/* El círculo de cantidad */}
                                        <div className="cart-count-badge">
                                            {notificacionesRecientes &&
                                            notificacionesRecientes.length
                                                ? notificacionesRecientes.length
                                                : 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="kart-mobile-menu-main-primary">
                                    <div
                                        className={`kart-mobile-menu ${
                                            !datosusuarios || !datosusuarios.uid
                                                ? "kart-unable"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (
                                                !datosusuarios ||
                                                !datosusuarios.uid
                                            )
                                                return;
                                            handleIrVerificado(
                                                "/shop/wishlist"
                                            );
                                        }}>
                                        <GoHeart />

                                        {/* El círculo de cantidad */}
                                        <div className="cart-count-badge">
                                            {numberitemswishlist
                                                ? numberitemswishlist
                                                : 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <span>
                            <h4 onClick={handleCreateAccount}>
                                Crea tu cuenta
                            </h4>
                            <h4 onClick={handleLogin}>Ingresa</h4>
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};
//  <ModuleHeaderContactNumber />
//<ModuleHeaderSwichers/>
export default NavigationPrimary;
