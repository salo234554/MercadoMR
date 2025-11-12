// Importa las funcionalidades básicas de React y algunos hooks esenciales
import React, { useState, useEffect, useRef } from "react";

// Importa componentes de Material UI y otros componentes personalizados
import Container from '../../../components/layouts/Container'; // Contenedor personalizado 
import ModalMensajes from "../../mensajes/ModalMensajes"; // Modal para mensajes
import LocationOnIcon from "@material-ui/icons/LocationOn"; // Icono de ubicación de Material UI
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

// Importa funciones y constantes necesarias
import { useDispatch, useSelector } from "react-redux"; // Manejo de estado global con Redux
import axios from "axios"; // Biblioteca para realizar solicitudes HTTP
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../helpers/Constants"; // URLs y constantes
import { myNumber } from "../../../utilities/ArrayFunctions"; // Funciones de utilidad para manipular arrays
import { AiOutlineDown } from "react-icons/ai";
// Importa PropTypes para la validación de tipos de propiedades
import PropTypes, { func } from "prop-types";

// Importa el hook de enrutamiento para Next.js
import { useRouter } from "next/router";
import { getUserMenuPrimary } from "../../../store/usermenuprimary/action";

// Importa componentes de Material UI y React Bootstrap
import ReactTooltip from "react-tooltip"; // Tooltip de React
import ModalMensajesConfirmarEliminar from "../../mensajes/ModalMensajesConfirmarEliminar"; // Modal para confirmar o eliminar
import { Box, Grid } from '@mui/material'; // Componentes de Material UI
import {
    Button,
    Row,
    Col,
    Card,
    Form,
    ListGroup,
    Tooltip,
    Overlay,
    Dropdown,
} from "react-bootstrap"; // Componentes de React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de React Bootstrap
import CtlrInputData from "~/pages/CtlrInputData";
import { getCtlrLongCadena } from "~/store/ctlrlongcadena/action";

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchcity"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value.toLowerCase())}
                //value={value}
                />

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
                { }
            </div>
        );
    }
);

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const tipoCalle = [
    { value: 1, nombre: "Avenida" },
    { value: 2, nombre: "Avenida Calle" },
    { value: 3, nombre: "Avenida Carrera" },
    { value: 4, nombre: "Calle" },
    { value: 5, nombre: "Carrera" },
    { value: 6, nombre: "Circular" },
    { value: 7, nombre: "Circunvalar" },
    { value: 8, nombre: "Diagonal" },
    { value: 9, nombre: "Manzana" },
    { value: 10, nombre: "Transversal" },
    { value: 11, nombre: "Vía" },
];

let undsel = [];
let itemaddress = [];

const FormDomicilio = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);
    const [addUpdateAddress, setAddUpdateAddress] = useState(
        "Agregar nueva dirección"
    );
    const [addUpdate, setAddUpdate] = useState(0);
    const [textoBoton, setTextoBoton] = useState("Guardar dirección");
    const [addressSelect, setAddressSelect] = useState([]);
    const [itemCompra, setItemCompra] = useState([]);
    const [fecha, setFecha] = useState(null);
    const [idSelect, setIdSelect] = useState(null);

    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");

    const [selectdepto, setSelectDepto] = useState("Seleccione departamento");
    const [selectciudad, setSelectCiudad] = useState("Seleccione ciudad");
    const [selecttipocalle, setSelectTipoCalle] = useState("Tipo de calle");
    const [enableCiudad, setEnableCiudad] = useState(true);
    const [enableTipoCalle, setEnableTipoCalle] = useState(true);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);

    const [alertBtnDpto, setAlertBtnDpto] = useState("dropdowncustomaddress");
    const [alertBtnCiudad, setAlertBtnCiudad] = useState(
        "dropdowncustomaddress"
    );
    const [alertBtnTipoCalle, setAlertBtnTipoCalle] = useState(
        "dropdowncustomtipocalle"
    );
    const [alertBtnCalle, setAlertBtnCalle] = useState("cajacalle");
    const [alertBtnNumeroUno, setAlertBtnNumeroUno] =
        useState("cajanumerocalle");
    const [alertBtnNumeroDos, setAlertBtnNumeroDos] =
        useState("cajanumerocalle");
    const [alertBtnComplemento, setAlertBtnComplemento] = useState(
        "dropdowncustomtipocalle"
    );
    const [alertBtnNombre, setAlertBtnNombre] = useState(
        "nombreapellidorecibe"
    );
    const [alertBtnTelefono, setAlertBtnTelefono] = useState("telefonorecibe");

    const [tituloDescripcion, setTituloDescripcion] = useState(null);
    const [textoDescripcion, setTextoDescripcion] = useState(
        "Aquí puedes escribir el nombre del edificio, conjunto, numero de apartamento, torre, o puntos de referencia de tu dirección."
    );

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesEliminar, setShowModalMensajesEliminar] =
        useState(false);
    const [continuarEliminar, setContinuarEliminar] = useState(false);
    const [abandonarEliminar, setAbandonarEliminar] = useState(false);
    const [itemSelect, setItemSelect] = useState(0);

    const [dptoSeleccionado, setDptoSeleccionado] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
    const [barrioSeleccionado, setBarrioSeleccionado] = useState(null);
    const [calleSeleccionada, setCalleSeleccionada] = useState(null);
    const [numeroUnoSeleccionado, setNumeroUnoSeleccionado] = useState(null);
    const [numeroDosSeleccionado, setNumeroDosSeleccionado] = useState(null);
    const [nombreRecibeSeleccionado, setNombreRecibeSeleccionado] =
        useState(null);
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] =
        useState(null);

    const [tipoCalleSeleccionada, setTipoCalleSeleccionada] = useState(null);
    const [ciudadDepto, setCiudadDepto] = useState([]);
    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input complementoaddress colorboder"
    );
    const [actualiza, setActualiza] = useState(false);
    const [actualizaLimpiar, setActualizaLimpiar] = useState(false);
    const [editarSelect, setEditarSelect] = useState(
        "form-control cajaiconoeditaraddress textoeditardatosvehiculo tamañoiconoadvertencia"
    );

    const [deleteSelect, setDeleteSelect] = useState(
        "form-control cajaiconodeleteaddress textoeditardatosvehiculo tamañoiconoadvertencia"
    );
    const [nombreDirecciones, setNombreDirecciones] =
        useState("Tus direcciones");
    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [inputDataCtlr, setInputDataCtlr] = useState(null);

    const ctlrlongcadena = useSelector((state) => state.ctlrlongcadena.ctlrlongcadena);
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    let departamentos = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_departamentos
    );
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            className="separarCustom"
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
            <span>{children}</span>

            <span> &#x25bc;</span>
        </a>
    ));
    const irA = useRef(null);
    // Refs para cada campo
    const dptoRef = useRef(null);
    const ciudadRef = useRef(null);
    const tipoCalleRef = useRef(null);
    const calleRef = useRef(null);
    const barrioRef = useRef(null);
    const descripcionRef = useRef(null);
    const numeroUnoRef = useRef(null);
    const numeroDosRef = useRef(null);
    const nombreRecibeRef = useRef(null);
    const telefonoRecibeRef = useRef(null);

    //console.log("DATOS GEN : ", datosciu)
    useEffect(() => {
        let datitem = JSON.parse(localStorage.getItem("itemcompra"));
        dispatch(getUserMenuPrimary(false));
        //console.log("DAITEM : ", datitem);
        setItemCompra(datitem);
        const leerItems = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    res.data.listardireccionesusuario;

                    setDireccionesUsuarios(res.data.listardireccionesusuario);
                    setDireccion(
                        res.data.listardireccionesusuario[0].direccion
                    );
                    setCiudad(
                        res.data.listardireccionesusuario[0].nombreciudad
                    );
                    setDepartamento(
                        res.data.listardireccionesusuario[0].nombre_dep
                    );
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
            setActualiza(false);
        };
        leerItems();
    }, [datosusuarios, actualiza]);

    //console.log("DATOS GEN : ", datosciu)
    useEffect(() => {
        if (direccionesUsuarios.length > 0) {
            setNombreDirecciones("Tus direcciones");
        } else {
            setNombreDirecciones("Tus direcciones");
        }
    }, [direccionesUsuarios]);

    const reiniciardpto = () => {
        /*
        if (direccionesUsuarios.length > 4 && addUpdate == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes("El maximo de direcciones permitidas es cinco!");
            return;
        }
*/
        setAlertBtnDpto("dropdowncustomaddress");
    };

    const reiniciarciudad = () => {
        setAlertBtnCiudad("dropdowncustomaddress");
    };

    const reiniciartipocalle = () => {
        setAlertBtnTipoCalle("dropdowncustomtipocalle");
    };

    const reiniciarcalle = () => {
        setAlertBtnCalle("cajacalle");
    };

    const reiniciarDescripcion = () => {
        setInputDescripcionProducto(
            "form-control ps-form__input complementoaddress colorboder"
        );
    };

    const reiniciarNumeroUno = () => {
        setAlertBtnNumeroUno("cajanumerocalle");
    };

    const reiniciarNumeroDos = () => {
        setAlertBtnNumeroDos("cajanumerocalle");
    };

    const reiniciarNombre = () => {
        setAlertBtnNombre("nombreapellidorecibe");
    };

    const reiniciarTelefono = () => {
        setAlertBtnTelefono("telefonorecibe");
    };

    const SelectDepto = (data, name) => {
        setSelectDepto(name);
        setSelectCiudad("Seleccione ciudad");
        let ciud = [];
        ciudades &&
            ciudades.map((item) => {
                if (item.departamento_ciu == data) {
                    ciud.push(item);
                }
            });
        setDptoSeleccionado(data);
        setCiudadDepto(ciud);
        if (ciud.length > 0) setEnableCiudad(false);
    };

    useEffect(() => {
        if (irA.current) {
            irA.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [])


    const SelectCiudad = (data, name) => {
        setSelectCiudad(name);
        setCiudadSeleccionada(data);
        setEnableTipoCalle(false);
    };

    const SelectTipoCalle = (data, name) => {
        setSelectTipoCalle(name);
        setTipoCalleSeleccionada(data);
    };

    const handleChangeInputBarrio = (event) => {
        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (ctlrlongcadena) {
            setTituloMensajes("Revisar Datos");
            setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
            setShowModalMensajes(true);

            dispatch(getCtlrLongCadena(false));
            let newcadena = barrioSeleccionado.substring(0, barrioSeleccionado.length - 2);
            setInputDataCtlr(newcadena + " ");
            setBarrioSeleccionado(newcadena + " ");
        } else {
            if (event.target.value.length > 23)
                event.target.value.substring(0, 23);
            setInputDataCtlr(event.target.value);
            setBarrioSeleccionado(event.target.value);
        }

        //setBarrioSeleccionado(event.target.value);
        //setInputevent.target.valueCtlr(data);
    };

    const handleChangeInputCalle = (event) => {

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (ctlrlongcadena) {
            setTituloMensajes("Revisar Datos");
            setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
            setShowModalMensajes(true);

            dispatch(getCtlrLongCadena(false));
            let newcadena = calleSeleccionada.substring(0, calleSeleccionada.length - 2);
            setInputDataCtlr(newcadena + " ");
            setCalleSeleccionada(newcadena + " ");
        } else {
            if (event.target.value.length > 23)
                event.target.value.substring(0, 23);
            setInputDataCtlr(event.target.value);
            setCalleSeleccionada(event.target.value);
        }

    };

    const handleChangeInputNumeroUno = (data) => {
        setNumeroUnoSeleccionado(data);
    };

    const handleChangeInputNumeroDos = (data) => {
        setNumeroDosSeleccionado(data);
    };

    const handleChangeInputNombreApellido = (event) => {

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (ctlrlongcadena) {
            setTituloMensajes("Revisar Datos");
            setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
            setShowModalMensajes(true);

            dispatch(getCtlrLongCadena(false));
            let newcadena = nombreRecibeSeleccionado.substring(0, nombreRecibeSeleccionado.length - 2);
            setInputDataCtlr(newcadena + " ");
            setNombreRecibeSeleccionado(newcadena + " ");
        } else {
            if (event.target.value.length > 23)
                event.target.value.substring(0, 23);
            setInputDataCtlr(event.target.value);
            setNombreRecibeSeleccionado(event.target.value);
        }

    };

    const handleChangeInputTelefonoRecibe = (data) => {
        setTelefonoRecibeSeleccionado(data);
    };

    //console.log("BARRIO : ", barrioSeleccionado);

    const descripcionOnChange = (event) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        let datacadena = event.target.value;

        var strLength = datacadena?.length;
        //console.log("DESCRIPCION : ", strLength);
        let descripcion = "";
        let letra;
        for (var i = 0; i < 139; i++) {
            letra = datacadena?.substr(i, 1);
            descripcion = descripcion + letra;
        }

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (ctlrlongcadena) {
            setTituloMensajes("Revisar Datos");
            setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
            setShowModalMensajes(true);

            dispatch(getCtlrLongCadena(false));
            let newcadena = tituloDescripcion.substring(0, tituloDescripcion.length - 2);
            setInputDataCtlr(newcadena + " ");
            setTituloDescripcion(newcadena + " ");
        } else {
            if (event.target.value > 23)
                event.target.value.substring(0, 23);
            setInputDataCtlr(event.target.value);
            setTituloDescripcion(event.target.value);
        }

        if (strLength > 139) {
            setShowModalMensajes(true);
            setTituloMensajes("Información adicional");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 140 permitido!"
            );
            return;
        }
    };

    const addAddress = () => {
        if (direccionesUsuarios.length > 4 && addUpdate == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes("El maximo de direcciones permitidas es cinco!");
            return;
        }
        const campos = [
            { ref: dptoRef, value: dptoSeleccionado, alertClass: "dropdowncustomaddressalert", setAlert: setAlertBtnDpto },
            { ref: ciudadRef, value: ciudadSeleccionada, alertClass: "dropdowncustomaddressalert", setAlert: setAlertBtnCiudad },
            { ref: tipoCalleRef, value: tipoCalleSeleccionada, alertClass: "dropdowncustomtipocallealert", setAlert: setAlertBtnTipoCalle },
            { ref: calleRef, value: calleSeleccionada, alertClass: "cajacalle alertboton", setAlert: setAlertBtnCalle },
            { ref: descripcionRef, value: tituloDescripcion, alertClass: "form-control ps-form__input complementoaddressalert", setAlert: setInputDescripcionProducto },
            { ref: numeroUnoRef, value: numeroUnoSeleccionado, alertClass: "cajanumerocalle alertboton", setAlert: setAlertBtnNumeroUno },
            { ref: numeroDosRef, value: numeroDosSeleccionado, alertClass: "cajanumerocalle alertboton", setAlert: setAlertBtnNumeroDos },
            { ref: nombreRecibeRef, value: nombreRecibeSeleccionado, alertClass: "nombreapellidorecibe alertboton", setAlert: setAlertBtnNombre },
            { ref: telefonoRecibeRef, value: telefonoRecibeSeleccionado, alertClass: "telefonorecibe alertboton", setAlert: setAlertBtnTelefono }
        ];


        let control = false;
        for (let campo of campos) {
            if (!campo.value) {

                campo.setAlert(campo.alertClass);
                control = true;
            }
        }

        for (let campo of campos) {
            if (!campo.value) {
                campo.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            }
        }


        let validarid;
        let haycaracterid = false;
        for (var i = 0; i < telefonoRecibeSeleccionado.length; i++) {
            validarid = telefonoRecibeSeleccionado.substr(i, 1);
            if (
                validarid != 0 &&
                validarid != 1 &&
                validarid != 2 &&
                validarid != 3 &&
                validarid != 4 &&
                validarid != 5 &&
                validarid != 6 &&
                validarid != 7 &&
                validarid != 8 &&
                validarid != 9
            ) {
                haycaracterid = true;
                console.log("CARACTER", i, validarid);
            } else console.log("ES UN NUMERO ", i, validarid);
        }

        if (haycaracterid) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes("Por favor, ingresa solo números en el telefono!");
            setAlertBtnTelefono("telefonorecibe alertboton");
            return;
        }

        if (telefonoRecibeSeleccionado.length < 10) {
            setAlertBtnTelefono("telefonorecibe alertboton");
            control = true;
        }

        if (control) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes("Por favor ingresa todos los campos correctamente!");
            return;
        }

        if (addUpdate == 0 && !control) {
            const grabardireccion = async () => {
                let params = {
                    usuario: datosusuarios.uid,
                    direccion:
                        calleSeleccionada +
                        " # " +
                        numeroUnoSeleccionado +
                        " - " +
                        numeroDosSeleccionado,
                    tipocalle: selecttipocalle,
                    calle: calleSeleccionada,
                    numerouno: numeroUnoSeleccionado,
                    numerodos: numeroDosSeleccionado,
                    ciudad: ciudadSeleccionada,
                    telefonorecibe: telefonoRecibeSeleccionado,
                    nombrerecibe: nombreRecibeSeleccionado,
                    comentario: tituloDescripcion,
                    barrio: barrioSeleccionado,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "64",
                    params,
                })
                    .then((res) => {
                        //console.log("DIRECIONES : ", res.data);
                        setShowModalMensajes(true);
                        setTituloMensajes("Direcciones usuarios");
                        setTextoMensajes("Dirección agregada!");
                        confirmarCrearCuenta()
                    })
                    .catch(function (error) {
                        console.log("Error Guardando direcciones");
                    });
                setActualiza(true);
            };
            grabardireccion();
        } else if (addUpdate == 1 && !control) {
            const actualizadireccion = async () => {
                let params = {
                    id: idSelect,
                    usuario: datosusuarios.uid,
                    direccion:
                        calleSeleccionada +
                        " # " +
                        numeroUnoSeleccionado +
                        " - " +
                        numeroDosSeleccionado,
                    tipocalle: selecttipocalle,
                    calle: calleSeleccionada,
                    numerouno: numeroUnoSeleccionado,
                    numerodos: numeroDosSeleccionado,
                    ciudad: ciudadSeleccionada,
                    telefonorecibe: telefonoRecibeSeleccionado,
                    nombrerecibe: nombreRecibeSeleccionado,
                    comentario: tituloDescripcion,
                    barrio: barrioSeleccionado,
                    fechacreacion: fecha,
                };

                //console.log("ACTUALIZA : ", params);
                //return;

                await axios({
                    method: "post",
                    url: URL_BD_MR + "67",
                    params,
                })
                    .then((res) => {
                        //console.log("DIRECIONES : ", res.data);
                        setShowModalMensajes(true);
                        setTituloMensajes("Direcciones usuarios");
                        setTextoMensajes("Dirección actualizada!");
                        confirmarCrearCuenta()
                    })
                    .catch(function (error) {
                        console.log("Error Actualizando direcciones");
                    });
                setActualiza(true);
            };
            actualizadireccion();
        }
    };

    function confirmarCrearCuenta() {
        //console.log("DATXX : ", datosToken)
        //return
        const dataCreaUsr = {
            "remitente": datosusuarios.email,
            "asunto": "¡ACTUALIZASTE TUS DATOS EN MERCADO REPUESTO!",
            "plantilla": "info",
            "to": "Mercado Repuesto",
            "contenido_html": {
                "title": "Actualización de datos",
                "subtitle": "Realizaste la actualización de datos",
                "body": "<p>Puedes revisar tus nuevos datos, iniciando sesión en nuestra pagina web, <strong>si no fuiste tu por favor contáctanos de manera inmediata.</strong>.</p>",
                "tipo": "01"
            }
        };

        const config = {
            headers: {
                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                "Content-Type": "application/json" || x < z
            }
        };

        const sendMessage = async () => {
            try {
                const response = await axios.post("https://mercadorepuesto.gimcloud.com/api/endpoint/mail", dataCreaUsr, config);
                console.log(response.data);
            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
        sendMessage();
    }

    const resetInputsAdress = () => {
        setAlertBtnDpto("dropdowncustomaddress")
        setAlertBtnCiudad("dropdowncustomaddress")
        setAlertBtnTipoCalle("dropdowncustomtipocalle")
        setAlertBtnNumeroUno("cajanumerocalle")
        setAlertBtnNumeroDos("cajanumerocalle")
        setAlertBtnComplemento("dropdowncustomtipocalle")
        setAlertBtnNombre(" nombreapellidorecibe")
        setAlertBtnTelefono("telefonorecibe")
        setAlertBtnCalle("cajacalle")
        setInputDescripcionProducto("form-control ps-form__input complementoaddress colorboder")

    }

    const editAddress = (dat, row) => {
        setAddUpdate(1);
        //console.log("DATSDD : ", dat);
        setAddUpdateAddress("Actualizar dirección");
        setTextoBoton("Guardar cambios");
        let item = [];
        item.push(row);
        setAddressSelect(item);
        setIdSelect(dat.id);
        setDptoSeleccionado(dat.codigo_dep);
        setCiudadSeleccionada(dat.ciudad);
        setTipoCalleSeleccionada(dat.tipocalle);
        setSelectDepto(dat.nombre_dep);
        setSelectCiudad(dat.nombreciudad);
        setSelectTipoCalle(dat.tipocalle);
        setBarrioSeleccionado(dat.barrio);
        setCalleSeleccionada(dat.calle);
        setNumeroUnoSeleccionado(dat.numerouno);
        setNumeroDosSeleccionado(dat.numerodos);
        setNombreRecibeSeleccionado(dat.nombrerecibe);
        setTelefonoRecibeSeleccionado(dat.telefonorecibe);
        setTituloDescripcion(dat.comentario);
        setFecha(dat.fechacreacion);
        resetInputsAdress();
    };

    const clearAddress = () => {
        if (direccionesUsuarios.length > 4 && addUpdate == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Direcciones usuarios");
            setTextoMensajes("El maximo de direcciones permitidas es cinco!");
            return;
        }

        setAddUpdate(0);
        //console.log("DATSDD : ", dat);
        setActualizaLimpiar(true);
    };

    //console.log("DATOS GEN : ", datosciu)
    useEffect(() => {
        setAddUpdateAddress("Agregar nueva dirección");
        setTextoBoton("Guardar dirección");
        let item = [];
        setAddressSelect([]);
        setIdSelect(null);
        setDptoSeleccionado(null);
        setCiudadSeleccionada(null);
        setTipoCalleSeleccionada(null);

        setSelectDepto("Seleccione departamento");
        setSelectCiudad("Seleccione ciudad");
        setSelectTipoCalle("Tipo de calle");

        setBarrioSeleccionado("");
        setCalleSeleccionada("");
        setNumeroUnoSeleccionado("");
        setNumeroDosSeleccionado("");
        setNombreRecibeSeleccionado("");
        setTelefonoRecibeSeleccionado("");
        setTituloDescripcion("");
        setFecha(null);
        setActualizaLimpiar(false);
    }, [actualizaLimpiar]);

    const confirmarBorrarUnItem = (item) => {
        setItemSelect(item);
        setShowModalMensajesEliminar(true);
        setTituloMensajes("Carrito de compra");
        setTextoMensajes("¿Estas seguro de querer eliminar la dirección?");
        //continuarRegistro, setContinuarRegistro
    };

    useEffect(() => {
        if (continuarEliminar) {
            deleteAddressUser(itemSelect);
        }
    }, [continuarEliminar]);

    const deleteAddressUser = (dat) => {
        const borrarDireccion = async () => {
            let params = {
                iddireccion: dat.id,
                usuario: datosusuarios.uid,
            };

            //console.log("borrar", params);
            //return;
            await axios({
                method: "post",
                url: URL_BD_MR + "69",
                params,
            })
                .then((res) => {
                    //console.log("DIRECIONES : ", res.data);
                    setActualiza(true);
                    setShowModalMensajes(true);
                    setTituloMensajes("Direcciones usuarios");
                    setTextoMensajes("Dirección eliminada");
                    setContinuarEliminar(false);
                    confirmarCrearCuenta()
                })
                .catch(function (error) {
                    console.log("Error borrar direcciones");
                });
        };
        borrarDireccion();
    };



    const onEdit = () => {
        setShowEdit(true);
    };
    const offEdit = () => {
        setShowEdit(false);
    };
    const onCopy = () => {
        setShowCopy(true);
    };
    const offCopy = () => {
        setShowCopy(false);
    };
    const onDelete = () => {
        setShowDelete(true);
    };
    const offDelete = () => {
        setShowDelete(false);
    };

    const actualizaSelect = (index, item) => {
        direccionesUsuarios &&
            direccionesUsuarios.map((row) => {
                if (row.id == item) {
                    const updateDireccion = async () => {
                        let params = {
                            id: row.id,
                            seleccion: 1
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "280",
                            params,
                        })
                            .then((res) => {
                                console.log("DIRECION ACTUALIZADA ");
                            })
                            .catch(function (error) {
                                console.log("Error Guardando direccion");
                            });
                        setActualiza(true);
                    };
                    updateDireccion();
                } else {
                    const updateDireccion = async () => {
                        let params = {
                            id: row.id,
                            seleccion: 0
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "280",
                            params,
                        })
                            .then((res) => {
                                console.log("DIRECION ACTUALIZADA ");
                            })
                            .catch(function (error) {
                                console.log("Error Guardando direccion");
                            });
                        setActualiza(true);
                    };
                    updateDireccion();
                }
                //console.log("ITEMS : ", row)
            });
        setActualiza(true);
    }
    const direcciones = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const isMobile = window.innerWidth <= 1200; // Verifica el tamaño de la ventana al montar el componente
        setIsMobile(isMobile); // Establece el estado basado en el tamaño de la ventana
    }, []); // El arr


    return (
        <>
            <Container title="Checkout">
                <div className="ps-page ps-page--inner" id="myaccount">
                    <div className="container">
                        <div className="ps-page__header"> </div>
                        <div className="ps-page__content ps-account">
                            <ModalMensajes
                                shown={showModalMensajes}
                                close={setShowModalMensajes}
                                titulo={tituloMensajes}
                                mensaje={textoMensajes}
                                tipo="1"
                            />
                            <ModalMensajesConfirmarEliminar
                                shown={showModalMensajesEliminar}
                                setShowModalMensajesEliminar={setShowModalMensajesEliminar}
                                setContinuarEliminar={setContinuarEliminar}
                                setAbandonarEliminar={setAbandonarEliminar}
                                titulo={tituloMensajes}
                                mensaje={textoMensajes}
                                tipo="1"
                            />
                            <div className="container no-transition">
                                <div>
                                    <Grid container spacing={{ xs: 2, sm: 1 }}>
                                        <Grid item xs={12} sm={5} >
                                            <div className="titulodireccionenvio titulodireccionenviotext">
                                                {nombreDirecciones}
                                            </div>
                                            {direccionesUsuarios.length > 0 ? (
                                                direccionesUsuarios &&
                                                direccionesUsuarios.map((item, index) => {
                                                    return (
                                                        <div>

                                                            <div className="cajadirecciones">

                                                                <div className="flex flex-col justify-center">
                                                                    <div className="textodirecciones">
                                                                        {
                                                                            item.tipocalle
                                                                        }{" "}
                                                                        {
                                                                            item.calle
                                                                        }{" "}
                                                                        {
                                                                            " # "
                                                                        }
                                                                        {
                                                                            item.numerouno
                                                                        }
                                                                        {
                                                                            " - "
                                                                        }
                                                                        {
                                                                            item.numerodos
                                                                        }
                                                                    </div>


                                                                    <div className="textodirecciones">
                                                                        {item.nombreciudad +
                                                                            ", " +
                                                                            item.nombre_dep
                                                                                .charAt(
                                                                                    0
                                                                                )
                                                                                .toUpperCase() +
                                                                            item.nombre_dep
                                                                                .slice(
                                                                                    1
                                                                                )
                                                                                .toLowerCase()}
                                                                    </div>

                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                    <div
                                                                        onClick={() => actualizaSelect(index, item.id)}
                                                                    >
                                                                        <span>
                                                                            <input
                                                                                className='checkdomicilio'
                                                                                type="radio"
                                                                                //checked={Number(dataAplication?.thirdyear) === 1}
                                                                                checked={item.seleccion}
                                                                            //onChange={handleYearChange3}
                                                                            />
                                                                        </span>
                                                                    </div>

                                                                    <div
                                                                        className={
                                                                            editarSelect
                                                                        }
                                                                        onMouseEnter={() =>
                                                                            onEdit()
                                                                        }
                                                                        onMouseLeave={() =>
                                                                            offEdit()
                                                                        }>
                                                                        <i
                                                                            onClick={() => {
                                                                                editAddress(
                                                                                    item,
                                                                                    index
                                                                                )
                                                                                setTimeout(() => {
                                                                                    const target = document.getElementById('edit-address-block');
                                                                                    if (target) {
                                                                                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                                    }
                                                                                }, 100);
                                                                            }}
                                                                            className="mlrem-4 fa fa-edit d-flex justify-content-center"
                                                                            data-tip
                                                                            data-for="registerEdit"></i>
                                                                        {!isMobile && showEdit && (
                                                                            <ReactTooltip
                                                                                className="ubicartooltipproducto "
                                                                                id="registerEdit"
                                                                                arrowColor="#2D2E83"
                                                                                place="top"
                                                                                effect="solid">

                                                                                Editar

                                                                            </ReactTooltip>
                                                                        )}
                                                                    </div>



                                                                    <div
                                                                        className={
                                                                            deleteSelect
                                                                        }>
                                                                        <i
                                                                            onClick={() =>
                                                                                confirmarBorrarUnItem(
                                                                                    item
                                                                                )
                                                                            }
                                                                            className="mt-1 ml-4 fa fa-trash d-flex justify-content-center"
                                                                            data-tip
                                                                            data-for="registerDelete"
                                                                            onMouseEnter={() =>
                                                                                onDelete()
                                                                            }
                                                                            onMouseLeave={() =>
                                                                                offDelete()
                                                                            }></i>
                                                                    </div>
                                                                </div>


                                                                {!isMobile && showDelete && (
                                                                    <ReactTooltip
                                                                        className="ubicartooltipproducto "
                                                                        id="registerDelete"
                                                                        arrowColor="#2D2E83"
                                                                        place="top"
                                                                        effect="solid">

                                                                        Eliminar

                                                                    </ReactTooltip>
                                                                )}



                                                            </div>

                                                            {direccionesUsuarios.length ==
                                                                index +
                                                                1 ? (
                                                                <Grid
                                                                    container
                                                                    alignItems="center"
                                                                    spacing={2}>

                                                                    <Grid
                                                                        item
                                                                        xs={
                                                                            6
                                                                        }
                                                                        md={
                                                                            6
                                                                        }
                                                                    >
                                                                        <div
                                                                            className="botoncontinuardirecciondos"
                                                                            onClick={() => {
                                                                                clearAddress()
                                                                                setTimeout(() => {
                                                                                    const target = document.getElementById('edit-address-block');
                                                                                    if (target) {
                                                                                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                                    }
                                                                                }, 100);
                                                                            }}>
                                                                            Agregar dirección
                                                                        </div>

                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={
                                                                            6
                                                                        }
                                                                        md={
                                                                            6
                                                                        }
                                                                    >
                                                                        <div
                                                                            className="botonagregardireccion"
                                                                            onClick={() => router.push("/EditUsers/MisDatos")}>
                                                                            Ir a mis datos
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            ) : null}

                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="cajadirecciones">
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} sm={11} >
                                                            <div className="textodirecciones mb-3">
                                                                Aquí apareceran las
                                                                direcciones que agregues
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            )}
                                        </Grid>


                                        <Grid item xs={12} sm={7}>
                                            <div id="edit-address-block">
                                                <div className="tituloaddupdateaddress titulodireccionenviotext">
                                                    {addUpdateAddress}
                                                </div>
                                                <div className="boxaddaddress">
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} md={1} lg={1}>
                                                            <div className="iconlocatetres">
                                                                <LocationOnIcon
                                                                    className="locationoniconaddressdos"
                                                                    style={{
                                                                        fontSize: 36,
                                                                    }}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} md={6} lg={6}>
                                                            <div className="mt-20 eliminarborde">
                                                                <div className="tituloaddress pb-3" ref={dptoRef}>
                                                                    * Departamento
                                                                </div>
                                                                <Dropdown
                                                                    style={{ width: '100%' }}
                                                                    onClick={() =>
                                                                        reiniciardpto()
                                                                    }>
                                                                    <div className={
                                                                        alertBtnDpto
                                                                    }>
                                                                        <Dropdown.Toggle
                                                                            as={
                                                                                CustomToggle
                                                                            }
                                                                            id="dropdown-custom-components"
                                                                            arrowColor="#2D2E83"


                                                                            variant="outline-light"
                                                                        //</Dropdown>value={marcaVeh}
                                                                        >

                                                                            {
                                                                                selectdepto
                                                                            }

                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu
                                                                            as={CustomMenu}
                                                                            variant="outline-light"
                                                                            className="tamañocajaoptionsaddress">
                                                                            {departamentos &&
                                                                                departamentos.map(
                                                                                    (item) => {
                                                                                        return (
                                                                                            <Dropdown.Item
                                                                                                className="itemsdropdowncustomcity"
                                                                                                onClick={() =>
                                                                                                    SelectDepto(
                                                                                                        item.codigo_dep,
                                                                                                        item.label
                                                                                                    )
                                                                                                }
                                                                                                eventKey={
                                                                                                    item.codigo_dep
                                                                                                }>
                                                                                                {
                                                                                                    item.label
                                                                                                }
                                                                                            </Dropdown.Item>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </Dropdown.Menu>
                                                                    </div>
                                                                </Dropdown>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} lg={6}>
                                                            <div className="mt-20 eliminarborde">
                                                                <div className="tituloaddress pb-3" ref={ciudadRef}>
                                                                    * Ciudad
                                                                </div>
                                                                <Dropdown
                                                                    style={{ width: '100%' }}
                                                                    onClick={() =>
                                                                        reiniciarciudad()
                                                                    } className={
                                                                        alertBtnCiudad
                                                                    }>
                                                                    <Dropdown.Toggle
                                                                        as={CustomToggle}
                                                                        id="dropdown-custom-components"
                                                                        arrowColor="#2D2E83"

                                                                        variant="outline-light"
                                                                    //</Dropdown>value={marcaVeh}
                                                                    >
                                                                        <div className="ajustecity">
                                                                            <a>
                                                                                {selectciudad}
                                                                            </a>
                                                                        </div>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu
                                                                        as={CustomMenu}
                                                                        variant="outline-light"
                                                                        className="tamañocajaoptionsaddress">
                                                                        {ciudadDepto &&
                                                                            ciudadDepto.map(
                                                                                (item) => {
                                                                                    return (
                                                                                        <Dropdown.Item
                                                                                            className="itemsdropdowncustomcity"
                                                                                            onClick={() =>
                                                                                                SelectCiudad(
                                                                                                    item.id_ciu,
                                                                                                    item.label
                                                                                                )
                                                                                            }
                                                                                            eventKey={
                                                                                                item.codigo_ciu
                                                                                            }>
                                                                                            {
                                                                                                item.label
                                                                                            }
                                                                                        </Dropdown.Item>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} sm={5} >
                                                            <div className="mt-20 eliminarborde">
                                                                <div className="tituloaddress pb-3" ref={barrioRef}>
                                                                    Barrio
                                                                </div>
                                                                <input
                                                                    className="cajabarrios"
                                                                    type="text"
                                                                    placeholder="Nombre del barrio o sector"
                                                                    value={barrioSeleccionado}
                                                                    onChange={(event) =>
                                                                        handleChangeInputBarrio(
                                                                            event
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} sm={6} md={3.5}>
                                                            <div className="mt-20 eliminarborde">
                                                                <div className="tituloaddress pb-3" ref={tipoCalleRef}>
                                                                    * Tipo de calle
                                                                </div>
                                                                <Dropdown
                                                                    style={{ width: '100%' }}
                                                                    onClick={() =>
                                                                        reiniciartipocalle()
                                                                    } className={
                                                                        alertBtnTipoCalle
                                                                    }>
                                                                    <Dropdown.Toggle
                                                                        as={CustomToggle}
                                                                        id="dropdown-custom-components"
                                                                        arrowColor="#2D2E83"

                                                                        variant="outline-light"
                                                                    //</Dropdown>value={marcaVeh}
                                                                    >
                                                                        <div className="ajustecity">
                                                                            <a>
                                                                                {
                                                                                    selecttipocalle
                                                                                }
                                                                            </a>
                                                                        </div>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu
                                                                        as={CustomMenu}
                                                                        variant="outline-light"
                                                                        className="tamañocajaoptionsaddress">
                                                                        {tipoCalle &&
                                                                            tipoCalle.map(
                                                                                (item) => {
                                                                                    return (
                                                                                        <Dropdown.Item
                                                                                            className="itemsdropdowncustomcity"
                                                                                            onClick={() =>
                                                                                                SelectTipoCalle(
                                                                                                    item.value,
                                                                                                    item.nombre
                                                                                                )
                                                                                            }
                                                                                            eventKey={
                                                                                                item.value
                                                                                            }>
                                                                                            {
                                                                                                item.nombre
                                                                                            }
                                                                                        </Dropdown.Item>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={5.5}>
                                                            <div
                                                                className="mt-20 eliminarborde"
                                                                onClick={() =>
                                                                    reiniciarcalle()
                                                                }>
                                                                <div className="tituloaddress pb-3" ref={calleRef}>
                                                                    * Calle
                                                                </div>
                                                                <input
                                                                    className={alertBtnCalle}
                                                                    type="text"
                                                                    placeholder="Nombre y el prefijo. Ej: 22 Sur."
                                                                    value={calleSeleccionada}
                                                                    onChange={(event) =>
                                                                        handleChangeInputCalle(
                                                                            event
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={1.5}>
                                                            <div
                                                                className="mt-20 eliminarborde"
                                                                onClick={() =>
                                                                    reiniciarNumeroUno()
                                                                }>
                                                                <div className="tituloaddress pb-3" ref={numeroUnoRef}>
                                                                    Número
                                                                </div>
                                                                <input
                                                                    className={
                                                                        alertBtnNumeroUno
                                                                    }
                                                                    type="text"
                                                                    value={
                                                                        numeroUnoSeleccionado
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeInputNumeroUno(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder="#"
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6} sm={6} md={1.5}>
                                                            <div
                                                                className=" mt-43 eliminarborde"
                                                                onClick={() =>
                                                                    reiniciarNumeroDos()
                                                                }>
                                                                <div className="tituloaddress pb-3" ref={numeroDosRef}></div>
                                                                <input
                                                                    className={
                                                                        alertBtnNumeroDos
                                                                    }
                                                                    type="text"
                                                                    placeholder="-"
                                                                    value={
                                                                        numeroDosSeleccionado
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeInputNumeroDos(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={12}>
                                                        <div
                                                            className="ps-form__group"
                                                            onClick={() =>
                                                                reiniciarDescripcion()
                                                            }>
                                                            <div className="tituloaddress mt-10 pb-3" ref={descripcionRef}>
                                                                Complemento o referencias
                                                                adicionales
                                                            </div>
                                                            <textarea
                                                                className={
                                                                    inputDescripcionProducto
                                                                }
                                                                placeholder={textoDescripcion}
                                                                value={tituloDescripcion}
                                                                name="descripcionproducto"
                                                                onChange={(event) =>
                                                                    descripcionOnChange(
                                                                        event
                                                                    )
                                                                }
                                                                type="text"
                                                            />
                                                            <div className="textocontadoraddress">
                                                                <span>{contadorLetrasDescripcion}{" "}
                                                                    {"/"} 140</span>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={12}>
                                                        <div
                                                            className="ps-form__group"
                                                            onClick={() => reiniciarNombre()}>
                                                            <div className="tituloaddress mtmenos10 pb-3" ref={nombreRecibeRef}>
                                                                Nombre y apellido de quien
                                                                recibe
                                                            </div>
                                                            <input
                                                                className={alertBtnNombre}
                                                                type="text"
                                                                placeholder="Nombre y apellido de quien recibe"
                                                                value={nombreRecibeSeleccionado}
                                                                onChange={(event) =>
                                                                    handleChangeInputNombreApellido(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        spacing={1}>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <div
                                                                className="ps-form__group"
                                                                onClick={() =>
                                                                    reiniciarTelefono()
                                                                }>
                                                                <div className="tituloaddress mt-10  pb-3" ref={telefonoRecibeRef}>
                                                                    Teléfono de quien recibe
                                                                </div>
                                                                <input
                                                                    className={alertBtnTelefono}
                                                                    type="text"
                                                                    idSelected
                                                                    placeholder="Teléfono de quien recibe"
                                                                    value={
                                                                        telefonoRecibeSeleccionado
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChangeInputTelefonoRecibe(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6}>
                                                            <div className="ps-form__group">
                                                                <div
                                                                    className="botongrabardireccion mt-10  pb-3"
                                                                    onClick={() =>
                                                                        addAddress()
                                                                    }>
                                                                    {textoBoton}
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>
                                </div>
                            </div>
                            <CtlrInputData
                                datainput={inputDataCtlr}
                            />

                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default FormDomicilio;