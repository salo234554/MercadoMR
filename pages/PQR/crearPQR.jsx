import Container from "../../components/layouts/Container";
import {
    Breadcrumbs,
    Grid,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { URL_BD_MR } from "../../helpers/Constants";
import axios from "axios";
import ModalMensajes from "../mensajes/ModalMensajes";
import shortid from "shortid";
import Link from "@mui/material/Link";
import { GrNext } from "react-icons/gr";
import { useRouter } from "next/router";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa"; // Importa el icono de verificación de 'react-icons'
import { FaCheckCircle } from "react-icons/fa";
import LoadingPQR from "~/components/elements/Loading/LoadingPQR";
import CtlrInputData from "../CtlrInputData";
import { getCtlrLongCadena } from "~/store/ctlrlongcadena/action";

import { useSelector, useDispatch } from "react-redux";

export default function crearPQR() {
    const dispatch = useDispatch();
    const [campoConError, setCampoConError] = useState(null);
    const [contadorAsunto, setContadorAsunto] = useState(0);
    const [contadorDescripcion, setContadorDescripcion] = useState(0);
    const irA = useRef(null); //PosiciónTopPage
    const irA2 = useRef(null); //PosiciónTopPage
    const router = useRouter(); //NextRouter
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    const [isOpen, setIsOpen] = useState(true); // Estado para el primer contenedor
    const [isNextOpen, setIsNextOpen] = useState(false); // Estado para el segundo contenedor
    const [text, setText] = useState(
        "Para nosotros es muy importante tus preguntas, quejas, reclamos o felicitaciones. Para poder gestionarlos de la mejor manera, te invitamos a completar la siguiente información:"
    );
    const [tipoIdentificacion, setTipoIdentificacion] = useState(""); // Agrega esta línea
    const [selectedTipoIdentificacion, setSelectedTipoIdentificacion] =
        useState("Seleccione tipo de identificación");
    const [selectedCiudad, setSelectedCiudad] = useState(
        "Seleccione la ciudad"
    );
    const [selectedMotivo, setSelectedMotivo] = useState(
        "Seleccione el motivo"
    );
    const [inputDataCtlr, setInputDataCtlr] = useState(null);
    const ctlrlongcadena = useSelector((state) => state.ctlrlongcadena.ctlrlongcadena);

    const [aceptaTerminos, setAceptaTerminos] = useState(false); // Estado para saber si el usuario ha aceptado los términos
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [numeroPeticion, setNumeroPeticion] = useState(null);
    const [errorNombres, setErrorNombres] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorApellidos, setErrorApellidos] = useState(false);
    const [errorIdentificacion, setErrorIdentificacion] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    const [errorBarrio, setErrorBarrio] = useState(false);
    const [errorCiudad, setErrorCiudad] = useState(false);
    const [errorTipoIdentificacion, setErrorTipoIdentificacion] =
        useState(false);
    const [errorMotivo, setErrorMotivo] = useState(false);
    const [errorAceptaTerminos, setErrorAceptaTerminos] = useState(false);
    const [errorAsunto, setErrorAsunto] = useState(false);
    const [errorDescripcion, setErrorDescripcion] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);

    const [showAll, setShowAll] = useState(false);

    const [tipoFile, setTipoFile] = useState(0);
    const [tipoFile2, setTipoFile2] = useState(0);
    const [tipoFile3, setTipoFile3] = useState(0);

    const [selectedPDF, setSelectedPDF] = useState(null);
    const [selectedPDF2, setSelectedPDF2] = useState(null);
    const [selectedPDF3, setSelectedPDF3] = useState(null);

    const [mostrarNombre, setMostrarNombre] = useState("");
    const [mostrarNombre2, setMostrarNombre2] = useState("");
    const [mostrarNombre3, setMostrarNombre3] = useState("");

    const [imageName, setImageName] = useState("");
    const [imageName2, setImageName2] = useState("");
    const [imageName3, setImageName3] = useState("");
    const maxImageSize = 819200; // 800 KB en bytes
    const maxImageWidth = 1024;
    const maxImageHeight = 1024;
    const [isLoading, setIsLoading] = useState(false);
    const nombreRef = useRef(null);
    const apellidosRef = useRef(null);
    const tipoIdentificacionRef = useRef(null);
    const numeroIdentificacionRef = useRef(null);
    const emailRef = useRef(null);
    const telefonoRef = useRef(null);
    const ciudadRef = useRef(null);
    const direccionRef = useRef(null);
    const barrioRef = useRef(null);
    const asuntoRef = useRef(null);



    //abrir o cerrar ver más en recomendaciones de archivos
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    //abrir dialog de confirmación de envío
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //Handle dropdown tipo ident
    const handleSelectTipoIdentificacion = (value, nombre) => {
        setSelectedTipoIdentificacion(nombre);
        setForm({ ...form, tipoidentificacion: value });

        if (nombre === "Seleccione tipo de identificación") {
            setErrorTipoIdentificacion(true);
        } else {
            setErrorTipoIdentificacion(false);
        }
    };

    //Handle dropdown motivo
    const handleSelectMotivo = (value, nombre) => {
        setSelectedMotivo(nombre);
        setForm({ ...form, motivo: value });

        if (nombre === "Seleccione el motivo") {
            setErrorMotivo(true);
        } else {
            setErrorMotivo(false);
        }
    };

    //Handle dropdown ciudad
    const handleSelectCiudad = (value, nombre) => {
        setSelectedCiudad(nombre);
        setForm({ ...form, ciudad: value });

        if (nombre === "Seleccione la ciudad") {
            setErrorCiudad(true);
        } else {
            setErrorCiudad(false);
        }
    };

    //Función para leer ciudades
    let ciudades = useSelector(
        (state) => state.datosgenerales.datosgenerales.vgl_ciudades
    );

    //Función para handle De imagen 1
    const handleImagen = async (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        let nombre = "";
        if (file.name.length <= 10) nombre = file.name.length;
        else nombre = file.name.slice(0, 10) + "...";

        setMostrarNombre(nombre);

        if (!file) {
            // No se seleccionó ningún archivo
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();
        //img.onload = function () {

        //};
        img.src = url;

        if (file) {
            let maxSize = maxImageSize; // 800 KB para imágenes

            // Permitir hasta 1 MB para archivos PDF
            if (file.type === "application/pdf") {
                maxSize = 1048576; // 1 MB en bytes
            }

            if (file.size > maxSize) {
                setTituloMensajes("Tamaño incorrecto");
                setTextoMensajes(
                    file.type === "application/pdf"
                        ? "Los archivos PDF deben pesar máximo 1 MB."
                        : "Las imágenes deben pesar máximo 800 KB."
                );
                file = null;
                setSelectedPDF(null);
                setImageName(null);
                setSelectedImage(null);
                setTipoFile(0);
                setShowModal(true);
                return;
            }

            if (file.type === "application/pdf") {
                setSelectedPDF(e.target.files[0]);
                setTipoFile(2);
                const nombreImagen =
                    shortid.generate().substring(0, 11) + ".pdf";
                setImageName(nombreImagen);
            } else {
                // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)

                const maxImageSize = 819200; // 800 KB in bytes
                const maxImageWidth = 1024;
                const maxImageHeight = 1024;

                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes("Tamaño incorrecto");
                    setTextoMensajes("Las imágenes deben pesar máximo 800 KB.");
                    return;
                }

                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise((resolve) => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }

                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    // Convertir la imagen a base64
                    const base64Image = reader.result;
                    // Generar un ID único para la imagen
                    let uniqueImageName = shortid.generate();
                    uniqueImageName = uniqueImageName.substring(0, 11);

                    let extension =
                        "." +
                        base64Image.substring(
                            base64Image.indexOf("/") + 1,
                            base64Image.indexOf(";base64")
                        );

                    const nombreImagen =
                        shortid.generate().substring(0, 11) + extension;
                    setImageName(nombreImagen);
                    setSelectedImage(base64Image);
                    setTipoFile(1);
                };
            }

            if (file.type !== "application/pdf") {
                const image = new Image();
                image.src = URL.createObjectURL(file);

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }
            }
        } else {
            setShowModal(true);
            setTituloMensajes("Archivo incorrecto");
            setTextoMensajes("Solo se permiten archivos JPG, JPEG, PNG y PDF.");
        }
    };

    //handle para segunda imagen
    const handleImagen2 = async (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
            return;
        }

        const url = URL.createObjectURL(file);
        const img = new Image();

        let nombre = "";
        if (file.name.length <= 10) nombre = file.name.length;
        else nombre = file.name.slice(0, 10) + "...";

        setMostrarNombre2(nombre);

        if (file) {
            let maxSize = maxImageSize; // 800 KB para imágenes

            // Permitir hasta 1 MB para archivos PDF
            if (file.type === "application/pdf") {
                maxSize = 1048576; // 1 MB en bytes
            }

            if (file.size > maxSize) {
                setShowModal(true);
                setTituloMensajes("Tamaño incorrecto");
                setTextoMensajes(
                    file.type === "application/pdf"
                        ? "Los archivos PDF deben pesar máximo 1 MB."
                        : "Las imágenes deben pesar máximo 800 KB."
                );
                file = null;
                setSelectedPDF2(null);
                setImageName2(null);
                setSelectedImage2(null);
                setTipoFile2(0);
                return;
            }

            if (file.type === "application/pdf") {
                setSelectedPDF2(e.target.files[0]);
                setTipoFile2(2);
                const nombreImagen =
                    shortid.generate().substring(0, 11) + ".pdf";
                setImageName2(nombreImagen);
            } else {
                // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)

                const maxImageSize = 819200; // 800 KB in bytes
                const maxImageWidth = 1024;
                const maxImageHeight = 1024;

                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes("Tamaño incorrecto");
                    setTextoMensajes("Las imágenes deben pesar máximo 800 KB.");
                    return;
                }

                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise((resolve) => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }

                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    // Convertir la imagen a base64
                    const base64Image = reader.result;
                    // Generar un ID único para la imagen
                    let uniqueImageName = shortid.generate();
                    uniqueImageName = uniqueImageName.substring(0, 11);

                    let extension =
                        "." +
                        base64Image.substring(
                            base64Image.indexOf("/") + 1,
                            base64Image.indexOf(";base64")
                        );

                    const nombreImagen =
                        shortid.generate().substring(0, 11) + extension;
                    setImageName2(nombreImagen);
                    setSelectedImage2(base64Image);
                    setTipoFile2(1);
                };
            }
            img.src = url;

            if (file.type !== "application/pdf") {
                const image = new Image();
                image.src = URL.createObjectURL(file);

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }
            }
        } else {
            setShowModal(true);
            setTituloMensajes("Archivo incorrecto");
            setTextoMensajes("Solo se permiten archivos JPG, JPEG, PNG y PDF.");
        }
    };

    //handle para tercera imagen
    const handleImagen3 = async (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        // Verifica el tamaño del archivo (no debe ser mayor a 800 KB)
        const url = URL.createObjectURL(file);
        const img = new Image();

        let nombre = "";
        if (file.name.length <= 10) nombre = file.name.length;
        else nombre = file.name.slice(0, 10) + "...";

        setMostrarNombre3(nombre);

        if (file) {
            let maxSize = maxImageSize; // 800 KB para imágenes

            // Permitir hasta 1 MB para archivos PDF
            if (file.type === "application/pdf") {
                maxSize = 1048576; // 1 MB en bytes
            }

            if (file.size > maxSize) {
                setShowModal(true);
                setTituloMensajes("Tamaño incorrecto");
                setTextoMensajes(
                    file.type === "application/pdf"
                        ? "Los archivos PDF deben pesar máximo 1 MB."
                        : "Las imágenes deben pesar máximo 800 KB."
                );

                file = null;
                setSelectedPDF3(null);
                setImageName3(null);
                setSelectedImage3(null);
                setTipoFile3(0);
                return;
            }

            if (file.type === "application/pdf") {
                setSelectedPDF3(e.target.files[0]);
                setTipoFile3(2);
                const nombreImagen =
                    shortid.generate().substring(0, 11) + ".pdf";
                setImageName3(nombreImagen);
            } else {
                // Verifica el tamaño de la imagen (no debe ser mayor a 1024*1024)

                const maxImageSize = 819200; // 800 KB in bytes
                const maxImageWidth = 1024;
                const maxImageHeight = 1024;

                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes("Tamaño incorrecto");
                    setTextoMensajes("Las imágenes deben pesar máximo 800 KB.");
                    return;
                }

                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise((resolve) => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }

                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    // Convertir la imagen a base64
                    const base64Image = reader.result;
                    // Generar un ID único para la imagen
                    let uniqueImageName = shortid.generate();
                    uniqueImageName = uniqueImageName.substring(0, 11);

                    let extension =
                        "." +
                        base64Image.substring(
                            base64Image.indexOf("/") + 1,
                            base64Image.indexOf(";base64")
                        );

                    const nombreImagen =
                        shortid.generate().substring(0, 11) + extension;
                    setImageName3(nombreImagen);
                    setSelectedImage3(base64Image);
                    setTipoFile3(1);
                };
            }
            img.src = url;

            if (file.type !== "application/pdf") {
                const image = new Image();
                image.src = URL.createObjectURL(file);

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (
                    imageWidth > maxImageWidth ||
                    imageHeight > maxImageHeight
                ) {
                    setShowModal(true);
                    setTituloMensajes("Dimensiones incorrectas");
                    setTextoMensajes(
                        `Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`
                    );
                    return;
                }
            }
        } else {
            setShowModal(true);
            setTituloMensajes("Archivo incorrecto");
            setTextoMensajes("Solo se permiten archivos JPG, JPEG, PNG y PDF.");
        }
    };

    //Verifica los datos antes de pasar a siguiente
    const verificarDatos = () => {

        const campos = [
            {
                ref: nombreRef,
                value: form.nombres,
                alertClass: true,
                setAlert: setErrorNombres,

            },
            {
                ref: apellidosRef,
                value: form.apellidos,
                alertClass: true,
                setAlert: setErrorApellidos,

            },
            {
                ref: tipoIdentificacionRef,
                value: selectedTipoIdentificacion,
                alertClass: true,
                setAlert: setErrorTipoIdentificacion,

            },
            {
                ref: numeroIdentificacionRef,
                value: form.identificacion,
                alertClass: true,
                setAlert: setErrorIdentificacion,

            },
            {
                ref: emailRef,
                value: form.email,
                alertClass: true,
                setAlert: setErrorEmail,

            },
            {
                ref: telefonoRef,
                value: form.telefono,
                alertClass: true,
                setAlert: setErrorTelefono,

            },
            {
                ref: ciudadRef,
                value: selectedCiudad,
                alertClass: true,
                setAlert: setErrorCiudad,

            },
            {
                ref: direccionRef,
                value: form.direccion,
                alertClass: true,
                setAlert: setErrorDireccion,

            },
            {
                ref: barrioRef,
                value: form.barrio,
                alertClass: true,
                setAlert: setErrorBarrio,

            },
            {
                ref: asuntoRef,
                value: selectedMotivo,
                alertClass: true,
                setAlert: setErrorAsunto,

            }

        ];

        let isValid = true;
        for (let campo of campos) {
            if (!campo.value) {

                campo.setAlert(campo.alertClass);
                isValid = false;
            }
        }

        for (let campo of campos) {
            if (!campo.value) {
                setCampoConError(campo.ref);
                break;
            }
        }

        return isValid; // Devuelve el valor actual de isValid
    };

    //Verificación de asunto y descripción antes de envíar
    const verificarAsuntoDescripcion = () => {
        // Verificar que el campo "asunto" no esté vacío, solo contenga letras y no esté completamente lleno
        //const regexTexto = /^[a-zA-Z\s]*$/;
        if (
            !form.asunto ||
            form.asunto.length > 100
        ) {
            setErrorAsunto(true);
            setTituloMensajes("¡Cuidado!");
            setTextoMensajes("Por favor, ingresa un asunto válido.");
            setShowModal(true);
            return false; //Detiene la ejecución de la función y retorna "false"
        } else {
            setErrorAsunto(false);
        }

        // Verificar que el campo "descripcion" no esté vacío, solo contenga letras y no esté completamente lleno
        if (
            !form.descripcion ||
            //!regexTexto.test(form.descripcion) ||
            form.descripcion.length > 500
        ) {
            setErrorDescripcion(true);
            setTituloMensajes("¡Cuidado!");
            setTextoMensajes("Por favor, ingresa una descripción válida.");
            setShowModal(true);
            return false; // Detiene la ejecución de la función y retorna "false"
        } else {
            setErrorDescripcion(false);
        }

        // Si todos los controles pasan, retorna "true"
        return true;
    };

    //función para ir a siguiente que verifica que estén bien todos los campos
    const irASiguiente = () => {
        // Verificar los datos antes de proceder

        if (!verificarDatos()) {
            setTituloMensajes("¡Cuidado!");
            setTextoMensajes(
                "Por favor, asegúrate de que todos los campos estén correctamente llenados."
            );
            setShowModal(true);
            return; // Detiene la ejecución de la función
        }


        if (!aceptaTerminos) {
            setErrorAceptaTerminos(true);
            setTituloMensajes("¡Cuidado!");
            setTextoMensajes("Por favor, acepta los términos y condiciones.");
            setShowModal(true);
            return; // Detiene la ejecución de la función
        } else {
            setErrorAceptaTerminos(false);
        }

        setIsOpen(false);
        setText("Describe tu solicitud:");

    };

    //form  para enviar todos los datos
    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        tipoidentificacion: "",
        identificacion: "",
        email: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        barrio: "",
        motivo: "",
        asunto: "",
        descripcion: "",
        estado: 110,
    });

    //Handlechange de los campos de inputs y textArea del form
    const handleChange = (e) => {
        let { name, value } = e.target;

        //if (name != "email")
        //setInputDataCtlr(value);

        window.addEventListener("keydown", (e) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (e.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (e) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (e.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (ctlrlongcadena) {
            setTituloMensajes("Revisar Datos");
            setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
            setShowModal(true);

            dispatch(getCtlrLongCadena(false));
            let newcadena = value.substring(0, value.length - 2);
            setInputDataCtlr(newcadena + " ");
            value = newcadena + " ";
            setForm((prevState) => ({ ...prevState, [name]: newcadena + " " }));
        } else {

            if (name != "email")
                setInputDataCtlr(value);
            
            // Actualiza el valor del campo
            setForm((prevState) => ({ ...prevState, [name]: value }));

            // Verifica el campo "nombres"
            if (name === "nombres") {
                if (!value) {
                    setErrorNombres(true);
                } else {
                    setErrorNombres(false);
                }
            }

            // Verifica el campo "email"
            if (name === "email") {
                const regexEmail =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!value || !regexEmail.test(value)) {
                    setErrorEmail(true);
                } else {
                    setErrorEmail(false);
                }
            }

            if (name === "apellidos") {
                if (!value) {
                    setErrorApellidos(true);
                } else {
                    setErrorApellidos(false);
                }
            }

            if (name === "identificacion") {
                if (!value || value.length < 6) {
                    setErrorIdentificacion(true);
                } else {
                    setErrorIdentificacion(false);
                }
            }

            if (name === "telefono") {
                if (!value || value.length !== 10) {
                    setErrorTelefono(true);
                } else {
                    setErrorTelefono(false);
                }
            }

            if (name === "direccion") {
                if (!value) {
                    setErrorDireccion(true);
                } else {
                    setErrorDireccion(false);
                }
            }

            if (name === "barrio") {
                //const regexBarrio = /^[a-zA-Z\s]*$/;
                //if (!value || !regexBarrio.test(value)) {
                if (!value) {
                    setErrorBarrio(true);
                } else {
                    setErrorBarrio(false);
                }
            }

            if (name === "asunto") {
                //const regexTexto = /^[a-zA-Z\s]*$/;
                //if (!value || !regexTexto.test(value) || value.length === 100) {
                if (!value) {
                    setErrorAsunto(true);
                } else {
                    setErrorAsunto(false);
                }
                setContadorAsunto(value.length);
            }

            if (name === "descripcion") {
                // const regexTexto = /^[a-zA-Z\s]*$/;
                //if (!value || !regexTexto.test(value) || value.length === 500) {
                if (!value) {
                    setErrorDescripcion(true);
                } else {
                    setErrorDescripcion(false);
                }
                setContadorDescripcion(value.length);
            }
        }
    };

    const borrarimg = (item) => {

        if (item == 1) {
            setSelectedImage(selectedImage2);
            setSelectedPDF(selectedPDF2);
            setTipoFile(tipoFile2);
            setMostrarNombre(mostrarNombre2);

            setSelectedImage2(selectedImage3);
            setSelectedPDF2(selectedPDF3);
            setTipoFile3(tipoFile3);
            setMostrarNombre2(mostrarNombre3);

            setSelectedImage3(null);
            setSelectedPDF3(null);
            setTipoFile3(null);
            setMostrarNombre3(null);
        } else if (item == 2) {
            setSelectedImage2(selectedImage3);
            setSelectedPDF2(selectedPDF3);
            setTipoFile3(tipoFile3);
            setMostrarNombre2(mostrarNombre3);

            setSelectedImage3(null);
            setSelectedPDF3(null);
            setTipoFile3(null);
            setMostrarNombre3(null);
        } else if (item == 3) {
            setSelectedImage3(null);
            setSelectedPDF3(null);
            setTipoFile3(null);
            setMostrarNombre3(null);
        }
    };

    //Función para hacer petición
    const hacerPeticion = async (e) => {
        let datauser = JSON.parse(localStorage.getItem("datauser"));
        e.preventDefault(); // Previene la recarga de la página

        // Verifica que los datos estén correctos antes de proceder
        if (!verificarDatos() || !verificarAsuntoDescripcion()) return;

        setIsLoading(true);
        // Verifica que todas las imágenes se hayan cargado

        /*
        if (!selectedImage && !selectedPDF) {
            setTituloMensajes("¡Cuidado!");
            setTextoMensajes(
                "Por favor, debes cargar almenos una imagen antes de enviar la petición."
            );
            setShowModal(true);
            //return; // Detiene la ejecución de la función
        }
            */

        let numeroImagenes = 0; // Inicializa el contador de imágenes

        let URLTIPO = `${URL_BD_MR}151`;

        const formData = new FormData();
        formData.append("nombres", form.nombres);
        formData.append("apellidos", form.apellidos);
        formData.append("tipoidentificacion", form.tipoidentificacion);
        formData.append("identificacion", form.identificacion);
        formData.append("email", form.email);
        formData.append("telefono", form.telefono);
        formData.append("ciudad", form.ciudad);
        formData.append("direccion", form.direccion);
        formData.append("barrio", form.barrio);
        formData.append("motivo", form.motivo);
        formData.append("asunto", form.asunto);
        formData.append("descripcion", form.descripcion);
        formData.append("estado", form.estado);

        //Condicionales para reconocer la longitud de las imagenes
        if (selectedImage || selectedPDF) {
            if (tipoFile == 1) {
                formData.append("nombreimagen1", imageName);
                formData.append("imagen1", selectedImage);
                numeroImagenes++; // Incrementa el contador de imágenes
            } else if (tipoFile == 2) {
                formData.append("nombreimagen1", imageName);
                formData.append("imagen1", selectedPDF);
                numeroImagenes++; // Incrementa el contador de imágenes
            }
        }

        if (selectedImage2 || selectedPDF2) {
            if (tipoFile2 == 1) {
                formData.append("nombreimagen2", imageName2);
                formData.append("imagen2", selectedImage2);
                numeroImagenes++; // Incrementa el contador de imágenes
            } else if (tipoFile2 == 2) {
                formData.append("nombreimagen2", imageName2);
                formData.append("imagen2", selectedPDF2);
                numeroImagenes++; // Incrementa el contador de imágenes
            }
        }

        if (selectedImage || selectedPDF) {
            if (tipoFile3 == 1) {
                formData.append("nombreimagen3", imageName3);
                formData.append("imagen3", selectedImage3);
                numeroImagenes++; // Incrementa el contador de imágenes
            } else if (tipoFile3 == 2) {
                formData.append("nombreimagen3", imageName3);
                formData.append("imagen3", selectedPDF3);
                numeroImagenes++; // Incrementa el contador de imágenes
            }
        }


        formData.append("numeroimagenes", numeroImagenes); // contador de imágenes
        formData.append("tipoarchivo1", tipoFile); // Si el archivo es PDF o IMG
        formData.append("tipoarchivo2", tipoFile2); // Si el archivo es PDF o IMG
        formData.append("tipoarchivo3", tipoFile3); // Si el archivo es PDF o IMG

        try {

            const res = await axios({
                method: "post",
                url: `${URLTIPO}`,
                data: formData,
            });
            console.log("Datos Enviados:", formData);
            console.log("Datos Respuesta:", res.data);

            // Obténgo el número total de PQRs existentes después de enviar la nueva petición
            const resPQRs = await axios.post(`${URL_BD_MR}152`);
            setNumeroPeticion(resPQRs.data.listarpqr[0].id); // Actualiza numeroPeticion para mostrar al usuario el numero de su PQR
            setIsLoading(false);

            // Crear registro en table de notificaciones usuarios

            const leerUltimaPQRUsuario = async () => {
                let params = {
                    identificacion: form.identificacion
                }

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "299", params
                    });

                    console.log("Respuesta XXXX : ", res.data)

                    if (res.data.type == 1) {
                        console.log("Notificación comprador creada")
                        crearNotificaPrd(res.data.listarpqr[0].id);
                        //return;
                        //router.push("/");
                    }
                } catch (error) {
                    console.error("Error creando Notificación", error);
                }
            }

            leerUltimaPQRUsuario();

            const crearNotificaPrd = async (idpqr) => {
                const idnotificacion = Math.floor(Math.random() * 10000000);
                let comentario = "Registro PQR";

                let params = {
                    estado: 128,
                    uidusuario: datauser?.uid,
                    idnotificacion: idnotificacion,
                    idorigen: idpqr,
                    comentario: comentario,
                    estado: 90,
                    ctlrnotificaentrada: 0,
                    ctlrnotificasalida: 0,
                    tiponotificacion: 8,
                }

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "823", params
                    });

                    console.log("RESDATAXXX : ", res.data)

                    if (res.data.type == 1) {
                        console.log("Notificación comprador creada")
                        //return;
                        //router.push("/");
                    }
                } catch (error) {
                    console.error("Error creando Notificación", error);
                }
            };

            //abro dialog para mostrar al usuario el numero de peticion de su PQR
            handleOpenDialog();
        } catch (error) {
            console.error("Error al hacer la petición", error);
        }
    };

    //Función para obtener los tipos de identificación
    useEffect(() => {
        const obtenerTiposIdentificacion = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: `${URL_BD_MR}7`,
                });
                if (Array.isArray(res.data.tipoidentificacion)) {
                    setTipoIdentificacion(res.data.tipoidentificacion);
                } else {
                    console.error(
                        "Error: se esperaba un array, pero se recibió",
                        res.data.tipoidentificacion
                    );
                }
            } catch (error) {
                console.error(
                    "Error al obtener los tipos de identificación",
                    error
                );
            }
        };
        obtenerTiposIdentificacion();
    }, []);

    //Botón para drodpdowns
    const CustomDropdownButton = React.forwardRef(
        ({ children, onClick, href }, ref) => (
            <button
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
                href={href}
                className="DropDownTipoDocumentoPQR">
                {children}
            </button>
        )
    );

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [isOpen]);

    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div
                                className="ps-page__content ps-account"
                                style={{ marginBottom: "5rem" }}>
                                <div
                                    className="contMainOpiniones pqrFer"
                                    style={{


                                        display: "flex",
                                        flexDirection: "column",
                                    }}>
                                    <div className="TopBuscarPQR">
                                        <Breadcrumbs
                                            separator={
                                                <GrNext
                                                    style={{ color: "#D9D9D9" }}
                                                    size={17}
                                                />
                                            }
                                            aria-label="breadcrumb">
                                            <Link
                                                className="linkMisv"
                                                underline="none"
                                                href="./"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.push("./");
                                                }}>
                                                <p className="VerVentaLink">
                                                    Ayuda / PQRS
                                                </p>
                                            </Link>
                                            <p className="VerVentaLink">
                                                Crear solicitud
                                            </p>
                                        </Breadcrumbs>
                                        <p className="SubtitleBuscar">{text}</p>
                                    </div>

                                    {isOpen && (
                                        <div className="form-login" id="forminput">
                                            <Grid
                                                container
                                                columnSpacing={2}
                                                className="MainFormCrearPQR">


                                                <Grid item xs={12} sm={6} >
                                                    <p ref={nombreRef}>Nombres</p>
                                                    <input
                                                        type="text"
                                                        className="inputdatapqr"
                                                        name="nombres"
                                                        value={form.nombres}
                                                        id=""
                                                        onChange={
                                                            handleChange
                                                        }
                                                        onClick={() =>
                                                            setErrorNombres(
                                                                false
                                                            )
                                                        }
                                                        style={
                                                            errorNombres
                                                                ? {
                                                                    border: "1px solid red",
                                                                }
                                                                : {}
                                                        }
                                                        maxLength={50}
                                                        onInput={(
                                                            e
                                                        ) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value =
                                                                e.target.value.replace(
                                                                    /[^a-zA-Z ]/g,
                                                                    ""
                                                                );
                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value =
                                                                e.target.value.replace(
                                                                    /\b\w/g,
                                                                    (
                                                                        char
                                                                    ) =>
                                                                        char.toUpperCase()
                                                                );
                                                        }}
                                                    />
                                                    {errorNombres && (
                                                        <div className="errorInputPQR">
                                                            {" "}
                                                            <span>
                                                                Ingresa
                                                                un
                                                                nombre
                                                                valido!
                                                            </span>
                                                        </div>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={apellidosRef}>Apellidos</p>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className="inputdatapqr"
                                                            value={form.apellidos}
                                                            name="apellidos"
                                                            id=""
                                                            onClick={() =>
                                                                setErrorApellidos(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorApellidos
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            maxLength={
                                                                30
                                                            }
                                                            onInput={(
                                                                e
                                                            ) => {
                                                                // Permitir solo letras y espacios
                                                                e.target.value =
                                                                    e.target.value.replace(
                                                                        /[^a-zA-Z ]/g,
                                                                        ""
                                                                    );
                                                                // Capitalizar la primera letra de cada palabra
                                                                e.target.value =
                                                                    e.target.value.replace(
                                                                        /\b\w/g,
                                                                        (
                                                                            char
                                                                        ) =>
                                                                            char.toUpperCase()
                                                                    );
                                                            }}
                                                        />
                                                        {errorApellidos && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Ingresa
                                                                    un
                                                                    apellido
                                                                    valido!
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={tipoIdentificacionRef}>
                                                        Tipo de
                                                        documento
                                                    </p>

                                                    <Dropdown
                                                        style={
                                                            errorTipoIdentificacion
                                                                ? {
                                                                    border: "1px solid red",
                                                                    borderRadius:
                                                                        "10px",
                                                                    width: "100%",
                                                                }
                                                                : {
                                                                    borderRadius:
                                                                        "10px",
                                                                    width: "100%",
                                                                }
                                                        }
                                                        onClick={() =>
                                                            setErrorTipoIdentificacion(
                                                                false
                                                            )
                                                        }>
                                                        <Dropdown.Toggle
                                                            as={
                                                                CustomDropdownButton
                                                            }
                                                            id="dropdown-basic">
                                                            {
                                                                selectedTipoIdentificacion
                                                            }
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                            {tipoIdentificacion &&
                                                                tipoIdentificacion.map(
                                                                    (
                                                                        tipo
                                                                    ) => (
                                                                        <Dropdown.Item
                                                                            className="itemsdropdownTipoDoc"
                                                                            onClick={() =>
                                                                                handleSelectTipoIdentificacion(
                                                                                    tipo.id,
                                                                                    `${tipo.tipoidentificacion} - ${tipo.descripcion}`
                                                                                )
                                                                            }>
                                                                            {`${tipo.tipoidentificacion} - ${tipo.descripcion}`}
                                                                        </Dropdown.Item>
                                                                    )
                                                                )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    {errorTipoIdentificacion && (
                                                        <div className="errorInputPQRS">
                                                            {" "}
                                                            <span
                                                                style={{
                                                                    marginTop:
                                                                        "-1.8rem",
                                                                    marginBottom:
                                                                        "2rem",
                                                                }}>
                                                                Recuerda,
                                                                debes
                                                                elegir
                                                                un tipo
                                                                de
                                                                identificación
                                                            </span>
                                                        </div>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={numeroIdentificacionRef}>
                                                        Numero de
                                                        documento
                                                    </p>
                                                    <div>
                                                        <input
                                                            autoComplete="off"
                                                            name="identificacion"
                                                            className="inputdatapqr"
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onClick={() =>
                                                                setErrorIdentificacion(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorIdentificacion
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                            maxLength={
                                                                10
                                                            }
                                                            onKeyPress={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    !/[0-9]/.test(
                                                                        event.key
                                                                    )
                                                                ) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                        {errorIdentificacion && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Recuerda,
                                                                    El
                                                                    documento
                                                                    debe
                                                                    contener
                                                                    solo
                                                                    números,
                                                                    longitud
                                                                    minima
                                                                    de 6
                                                                    y
                                                                    maximo
                                                                    de
                                                                    10
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >

                                                    <p ref={emailRef}>
                                                        Correo
                                                        electrónico
                                                    </p>
                                                    <div>
                                                        <input
                                                            autoComplete={Math.random().toString()}
                                                            name="email"
                                                            className="inputdatapqr"
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onClick={() =>
                                                                setErrorEmail(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorEmail
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                        />
                                                        {errorEmail && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Ingresa
                                                                    un
                                                                    email
                                                                    valido!
                                                                    Ej:
                                                                    juan@gmail.com
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={telefonoRef}>
                                                        Numero de
                                                        contacto
                                                    </p>
                                                    <div>
                                                        <input
                                                            autoComplete="off"
                                                            type="text"
                                                            className="inputdatapqr"
                                                            name="telefono"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onClick={() =>
                                                                setErrorTelefono(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorTelefono
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                            maxLength={
                                                                10
                                                            }
                                                            onKeyPress={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    !/[0-9]/.test(
                                                                        event.key
                                                                    )
                                                                ) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                        {errorTelefono && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Recuerda,
                                                                    El
                                                                    teléfono
                                                                    de
                                                                    contacto
                                                                    debe
                                                                    contener
                                                                    10
                                                                    digitos
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={ciudadRef}>Ciudad</p>
                                                    <div>
                                                        <Dropdown
                                                            style={
                                                                errorCiudad
                                                                    ? {
                                                                        border: "1px solid red",
                                                                        borderRadius:
                                                                            "10px",
                                                                        width: "100%",
                                                                    }
                                                                    : {
                                                                        borderRadius:
                                                                            "10px",
                                                                        width: "100%",
                                                                    }
                                                            }
                                                            onClick={() =>
                                                                setErrorCiudad(
                                                                    false
                                                                )
                                                            }>
                                                            <Dropdown.Toggle
                                                                as={
                                                                    CustomDropdownButton
                                                                }
                                                                id="dropdown-basic">
                                                                {
                                                                    selectedCiudad
                                                                }
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu
                                                                className="tamañocajaoDropDownTipoDocumento"
                                                                style={{
                                                                    maxHeight:
                                                                        "281px",
                                                                    overflowY:
                                                                        "auto",
                                                                }}>
                                                                {ciudades &&
                                                                    ciudades.map(
                                                                        (
                                                                            ciudad
                                                                        ) => (
                                                                            <Dropdown.Item
                                                                                className="itemsdropdownTipoDoc"
                                                                                onClick={() =>
                                                                                    handleSelectCiudad(
                                                                                        ciudad.id_ciu,
                                                                                        `${ciudad.nombre_ciu}`
                                                                                    )
                                                                                }>
                                                                                {`${ciudad.nombre_ciu}`}
                                                                            </Dropdown.Item>
                                                                        )
                                                                    )}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        {errorCiudad && (
                                                            <div className="errorInputPQRS">
                                                                {" "}
                                                                <span>
                                                                    Recuerda,
                                                                    debes
                                                                    elegir
                                                                    una
                                                                    ciudad
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={direccionRef}>Dirección</p>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="direccion"
                                                            value={form.direccion}
                                                            className="inputdatapqr"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onClick={() =>
                                                                setErrorDireccion(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorDireccion
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                            autoComplete={Math.random().toString()}
                                                            maxLength={
                                                                60
                                                            }
                                                        />
                                                        {errorDireccion && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Ingresa
                                                                    una
                                                                    dirección
                                                                    valida!
                                                                    Ej:
                                                                    CLL
                                                                    40 #
                                                                    22...
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >

                                                    <p ref={barrioRef}>Barrio</p>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className="inputdatapqr"
                                                            value={form.barrio}
                                                            name="barrio"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onClick={() =>
                                                                setErrorBarrio(
                                                                    false
                                                                )
                                                            }
                                                            style={
                                                                errorBarrio
                                                                    ? {
                                                                        border: "1px solid red",
                                                                    }
                                                                    : {}
                                                            }
                                                            autoComplete={Math.random().toString()}
                                                            maxLength={
                                                                20
                                                            }
                                                        />
                                                        {errorBarrio && (
                                                            <div className="errorInputPQR">
                                                                {" "}
                                                                <span>
                                                                    Recuerda,
                                                                    debes
                                                                    elegir
                                                                    un
                                                                    barrio
                                                                    valido
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={6} >
                                                    <p ref={asuntoRef}>Motivo</p>
                                                    <div>
                                                        <Dropdown
                                                            style={
                                                                errorMotivo
                                                                    ? {
                                                                        border: "1px solid red",
                                                                        borderRadius:
                                                                            "10px",
                                                                        width: "100%",
                                                                    }
                                                                    : {
                                                                        borderRadius:
                                                                            "10px",
                                                                        width: "100%",
                                                                    }
                                                            }
                                                            onClick={() =>
                                                                setErrorMotivo(
                                                                    false
                                                                )
                                                            }>
                                                            <Dropdown.Toggle
                                                                as={
                                                                    CustomDropdownButton
                                                                }
                                                                id="dropdown-basic">
                                                                {
                                                                    selectedMotivo
                                                                }
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="tamañocajaoDropDownTipoDocumento">
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() =>
                                                                        handleSelectMotivo(
                                                                            "Petición",
                                                                            "Petición"
                                                                        )
                                                                    }>
                                                                    Petición
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() =>
                                                                        handleSelectMotivo(
                                                                            "Queja",
                                                                            "Queja"
                                                                        )
                                                                    }>
                                                                    Queja
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() =>
                                                                        handleSelectMotivo(
                                                                            "Reclamo",
                                                                            "Reclamo"
                                                                        )
                                                                    }>
                                                                    Reclamo
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    className="itemsdropdownTipoDoc"
                                                                    onClick={() =>
                                                                        handleSelectMotivo(
                                                                            "Felicitación",
                                                                            "Felicitación"
                                                                        )
                                                                    }>
                                                                    Felicitación
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        {errorMotivo && (
                                                            <div className="errorInputPQRS">
                                                                {" "}
                                                                <span>
                                                                    Recuerda,
                                                                    debes
                                                                    elegir
                                                                    el
                                                                    motivo
                                                                    de
                                                                    la
                                                                    petición
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Grid>


                                                <div className="ButtomFormCrearPQR">
                                                    <div className="acepptCond">
                                                        <div
                                                            style={{
                                                                backgroundColor:
                                                                    aceptaTerminos
                                                                        ? "#2D2E83"
                                                                        : "#f0f1f5", // Cambia el color de fondo a azul si el usuario ha aceptado los términos
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                cursor: "pointer",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                            onClick={() => {
                                                                setAceptaTerminos(
                                                                    !aceptaTerminos
                                                                );
                                                                setErrorAceptaTerminos(
                                                                    false
                                                                ); // Restablece errorAceptaTerminos a 'false' cuando el usuario hace clic en el div
                                                            }}>
                                                            {aceptaTerminos && (
                                                                <FaCheck color="white" />
                                                            )}{" "}
                                                            {/* Muestra el icono de verificación si el usuario ha aceptado los términos */}
                                                        </div>
                                                        <p
                                                            onClick={() => {
                                                                setAceptaTerminos(
                                                                    !aceptaTerminos
                                                                );
                                                                setErrorAceptaTerminos(
                                                                    false
                                                                ); // Restablece errorAceptaTerminos a 'false' cuando el usuario hace clic en el p
                                                            }}
                                                            style={
                                                                errorAceptaTerminos
                                                                    ? {
                                                                        textDecoration:
                                                                            "underline",
                                                                        textDecorationColor:
                                                                            "red",
                                                                    }
                                                                    : {}
                                                            }>
                                                            Acepto el
                                                            tratamiento de mis
                                                            datos personales
                                                        </p>
                                                    </div>
                                                    <div className="SigPQR">
                                                        <button
                                                            onClick={
                                                                irASiguiente
                                                            }>
                                                            Siguiente
                                                        </button>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </div>
                                    )}

                                    {!isOpen && (
                                        <Grid
                                            container
                                            className="MainFormCrearPQR">
                                            <div className="ContCrearSolMain" ref={irA2}>
                                                <div className="DescrAsunto">
                                                    <p>Asunto</p>
                                                    <textarea
                                                        autoComplete="off"
                                                        type="text"
                                                        value={form.asunto}
                                                        name="asunto"
                                                        onChange={handleChange}
                                                        onClick={() =>
                                                            setErrorAsunto(
                                                                false
                                                            )
                                                        }
                                                        style={
                                                            errorAsunto
                                                                ? {
                                                                    border: "1px solid red",
                                                                }
                                                                : {}
                                                        }
                                                        maxLength={90}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value;
                                                            //e.target.value.replace(/[^a-zA-Z ]/g,"");

                                                            // Capitalizar la primera letra de cada palabra
                                                            e.target.value =
                                                                e.target.value.replace(
                                                                    /\b\w/g,
                                                                    (char) =>
                                                                        char.toUpperCase()
                                                                );
                                                        }}
                                                    />
                                                    <div className="contPQR">
                                                        <p>
                                                            {contadorAsunto}/90
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="DescripSoli">
                                                    <p>Descripción</p>
                                                    <textarea
                                                        name="descripcion"
                                                        onChange={handleChange}
                                                        value={form.descripcion}
                                                        onClick={() =>
                                                            setErrorDescripcion(
                                                                false
                                                            )
                                                        }
                                                        style={
                                                            errorDescripcion
                                                                ? {
                                                                    border: "1px solid red",
                                                                }
                                                                : {}
                                                        }
                                                        maxLength={400}
                                                        onInput={(e) => {
                                                            // Permitir solo letras y espacios
                                                            e.target.value
                                                            // Capitalizar la primera letra de cada palabra
                                                            /*
                                                            e.target.value =
                                                                e.target.value.replace(
                                                                    /\b\w/g,
                                                                    (char) =>
                                                                        char.toUpperCase()
                                                                );
                                                            */
                                                        }}
                                                    />
                                                    <div className="contPQR">
                                                        <p>
                                                            {
                                                                contadorDescripcion
                                                            }
                                                            /400
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="AdjArchSoli">
                                                    <div className="AdjArchSoliTitle">
                                                        <p>Adjuntar archivos</p>
                                                    </div>

                                                    <div className="AdjArchSoliIcons">
                                                        <div className="SubAdjArchSoliIcons">
                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen}
                                                                        onClick={e => (e.target.value = null)} // Resetea el valor del input para poder seleccionar el mismo archivo
                                                                        style={{ display: "none" }}
                                                                        accept="image/*"
                                                                        capture={false}
                                                                        id="fileInput"
                                                                    />
                                                                    <label htmlFor="fileInput">
                                                                        {selectedImage ? (
                                                                            <img
                                                                                src={
                                                                                    selectedImage
                                                                                }
                                                                                alt="Previsualización"
                                                                                style={{
                                                                                    width: "100px",
                                                                                    height: "100px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPDF ? (
                                                                            <div className="mostrarnombrepdf">
                                                                                <a className="mt-5">
                                                                                    {
                                                                                        mostrarNombre
                                                                                    }
                                                                                </a>
                                                                            </div>
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {(selectedImage ||
                                                                        selectedPDF) && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    borrarimg(
                                                                                        1
                                                                                    );
                                                                                }}>
                                                                                <IoClose className="deleteImgPQR" />
                                                                            </button>
                                                                        )}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen2} // Usa la función handleImagen2 para la segunda imagen
                                                                        onClick={e => (e.target.value = null)} // Resetea el valor del input para poder seleccionar el mismo archivo
                                                                        style={{ display: "none" }}
                                                                        accept="image/*"
                                                                        capture={false}
                                                                        id="fileInput2" // Cambia el id para diferenciarlo del primer input
                                                                    />
                                                                    <label htmlFor="fileInput2">
                                                                        {" "}
                                                                        {/* Asegúrate de cambiar el htmlFor al nuevo id */}
                                                                        {selectedImage2 ? (
                                                                            <img
                                                                                src={
                                                                                    selectedImage2
                                                                                }
                                                                                alt="Previsualización"
                                                                                style={{
                                                                                    width: "100px",
                                                                                    height: "100px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPDF2 ? (
                                                                            <div className="mostrarnombrepdf">
                                                                                <a className="mt-5">
                                                                                    {
                                                                                        mostrarNombre2
                                                                                    }
                                                                                </a>
                                                                            </div>
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {(selectedImage2 ||
                                                                        selectedPDF2) && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    borrarimg(
                                                                                        2
                                                                                    );
                                                                                }}>
                                                                                <IoClose className="deleteImgPQR" />
                                                                            </button>
                                                                        )}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <div>
                                                                    <input
                                                                        type="file"
                                                                        onChange={handleImagen3}
                                                                        onClick={e => (e.target.value = null)}
                                                                        style={{ display: "none" }}
                                                                        accept="image/*"
                                                                        capture={false}
                                                                        id="fileInput3"
                                                                    />
                                                                    <label htmlFor="fileInput3">
                                                                        {" "}
                                                                        {/* Asegúrate de cambiar el htmlFor al nuevo id */}
                                                                        {selectedImage3 ? (
                                                                            <img
                                                                                src={
                                                                                    selectedImage3
                                                                                }
                                                                                alt="Previsualización"
                                                                                style={{
                                                                                    width: "100px",
                                                                                    height: "100px",
                                                                                }}
                                                                            />
                                                                        ) : selectedPDF3 ? (
                                                                            <div className="mostrarnombrepdf">
                                                                                <a className="mt-5">
                                                                                    {
                                                                                        mostrarNombre3
                                                                                    }
                                                                                </a>
                                                                            </div>
                                                                        ) : (
                                                                            <HiOutlineDocumentArrowUp className="InputIconPQR" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                <span>
                                                                    {(selectedImage3 ||
                                                                        selectedPDF3) && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    borrarimg(
                                                                                        3
                                                                                    );
                                                                                }}>
                                                                                {" "}
                                                                                {/* Usa setImagen3 para resetear la tercera imagen */}
                                                                                <IoClose className="deleteImgPQR" />
                                                                            </button>
                                                                        )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="recomendacionesArchivosPQR">
                                                    {showAll ? (
                                                        <>
                                                            <p>
                                                                - Debes agregar
                                                                como mínimo
                                                                un(1) archivo y
                                                                como máximo
                                                                tres(3)
                                                            </p>
                                                            <p>
                                                                - El tamaño
                                                                máximo de las
                                                                imágenes es 1024
                                                                x 1024
                                                            </p>
                                                            <p>
                                                                - La proporción
                                                                de las imágenes
                                                                debe ser de 4:3,{" "}
                                                                <br /> es decir
                                                                4 unidades de
                                                                alto por 3 de
                                                                ancho
                                                            </p>
                                                            <p>
                                                                - Cada imagen
                                                                debe pesar
                                                                máximo 800KB
                                                            </p>
                                                            <p>
                                                                - Cada pdf debe
                                                                pesar máximo
                                                                800KB
                                                            </p>
                                                            <p>
                                                                - Tus archivos
                                                                deben ser en
                                                                formato jpg,
                                                                jpeg, png o pdf
                                                            </p>
                                                            <p>
                                                                - La imagen debe
                                                                estar enfocada
                                                            </p>
                                                            <p>
                                                                - Las imágenes
                                                                deben ser
                                                                nítidas
                                                            </p>
                                                            <div className="buttonRecArchivos">
                                                                <button
                                                                    onClick={
                                                                        toggleShowAll
                                                                    }>
                                                                    Ver menos...
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                **Ten en cuenta
                                                                que:
                                                            </p>
                                                            <p>
                                                                - Debes agregar
                                                                como mínimo
                                                                un(1) archivo y
                                                                como máximo
                                                                tres(3)
                                                            </p>
                                                            <p>
                                                                - El tamaño
                                                                máximo de las
                                                                imágenes es 1024
                                                                x 1024
                                                            </p>
                                                            <p>
                                                                - La proporción
                                                                de las imágenes
                                                                debe ser de 4:3,{" "}
                                                                <br /> es decir
                                                                4 unidades de
                                                                alto por 3 de
                                                                ancho
                                                            </p>
                                                            <p>
                                                                - Cada imagen
                                                                debe pesar
                                                                máximo 800KB
                                                            </p>
                                                            <p>
                                                                - Tus archivos
                                                                deben ser en
                                                                formato jpg,
                                                                jpeg, png o pdf
                                                            </p>
                                                            <div className="buttonRecArchivos">
                                                                <button
                                                                    onClick={
                                                                        toggleShowAll
                                                                    }>
                                                                    Ver más...
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {isLoading ? (
                                                    <LoadingPQR />
                                                ) : null}

                                                <div className="EnviarPeticionPQR">
                                                    <button
                                                        onClick={hacerPeticion}>
                                                        Enviar
                                                    </button>
                                                </div>
                                            </div>
                                        </Grid>
                                    )}
                                </div>

                                <Dialog
                                    className="dialogDatsGuardados"
                                    open={dialogOpen}
                                    disableScrollLock={true}
                                    PaperProps={{
                                        style: {
                                            width: isMdDown ? "80%" : "35%",
                                            backgroundColor: "white",
                                            border: "1px solid gray",
                                            padding: "1.4rem",
                                            borderRadius: "10px",
                                        },
                                    }}>
                                    <DialogTitle className="dialogtitleDtsGUardados">
                                        <FaCheckCircle
                                            size={37}
                                            style={{
                                                color: "#10c045",
                                                marginLeft: "-17px",
                                                marginRight: "8px",
                                            }}
                                        />
                                        <p className="dialogtituloP">
                                            ¡Solicitud enviada con exito!
                                        </p>
                                    </DialogTitle>
                                    <DialogContent className="dialogContentDatsGuardados">
                                        <p className="PdialogContent">
                                            Tu solicitud fue enviada con exito.
                                            Esta será revisada y procesada por
                                            nosotros, en un máximo de 15 días
                                            habiles te estaremos dando repuesta.{" "}
                                            <br />
                                            <br /> Número de petición: #
                                            {numeroPeticion}
                                        </p>
                                    </DialogContent>
                                    <DialogActions className="DialogActionsDatsGuardados">
                                        <div className="div1buttonDialog">
                                            <button
                                                className="button1DialogDatsGuardados"
                                                onClick={() =>
                                                    router.push({
                                                        pathname: "/",
                                                    })
                                                }>
                                                Ir al inicio
                                            </button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                                <ModalMensajes
                                    shown={showModal}
                                    campoConError={campoConError}
                                    close={setShowModal}
                                    titulo={tituloMensajes}
                                    mensaje={textoMensajes}
                                    tipo="error"
                                />
                            </div>
                        </div>
                        <CtlrInputData
                            datainput={inputDataCtlr}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
}
