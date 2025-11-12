import { IoClose, IoHeartOutline, IoLocationSharp, IoWalletOutline } from 'react-icons/io5';
import { LiaHomeSolid } from "react-icons/lia";
import { BiSolidChevronRight } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { IoIosInformationCircleOutline, IoIosNotificationsOutline, IoIosSearch } from 'react-icons/io';
import { MdOutlineAccountCircle, MdOutlineSell, MdOutlineShoppingCart } from 'react-icons/md';
import { GoClock } from "react-icons/go";
import { PiHeadset } from "react-icons/pi";
import { RiHandCoinLine, RiShoppingBagLine } from "react-icons/ri";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { BsDoorOpen } from "react-icons/bs";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { HiChevronLeft } from "react-icons/hi";
import { URL_BD_MR, URL_IMAGES_RESULTSSMS } from '~/helpers/Constants';
import axios from 'axios';
import { getResetInput } from "@/store/resetinput/action";
import { Dialog } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserMenuPrimary } from "@/store/usermenuprimary/action";
import firebase from "@/utilities/firebase";
import { getEditData } from "../../../../store/editdata/action";
import { getDuplicarPrd } from "../../../../store/duplicarprd/action";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

const LeftBarMobile = ({ close, activeView, setActiveView }) => {
    const [categorias, setCategorias] = useState(null);
    const [subcategorias, setSubcategorias] = useState(null);
    const [imagenesSubcategorias, setImagenesSubcategorias] = useState([]);
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const resetinput = useSelector((state) => state.resetinput.resetinput);
    const userlogged = useSelector((state) => state.userlogged.userlogged);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false); // Estado para abrir/cerrar el diálogo
    const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null); // Estado para guardar los datos de la categoría seleccionada


    // Estado para abrir/cerrar el Dialog
    const [openDialog, setOpenDialog] = useState(false);

    const datoscrearproductos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales
    );

    // Estado para guardar los datos de la subcategoría seleccionada
    const [subcategoriaInfo, setSubcategoriaInfo] = useState(null);
    // Estados principales 
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Guarda la categoría elegida

    // Manejador para volver a la vista principal (menú principal)
    const handleBack = () => {
        if (activeView === 'subcategorias') {
            // Si estás en subcategorías, volvés a categorías
            setActiveView('categorias');
            setCategoriaSeleccionada(null); // Resetea la categoría seleccionada
        } else {
            // Si no, volvés al menú principal
            setActiveView('main');
            setCategoriaSeleccionada(null);
        }
    };

    // Función para cambiar de vista, con validación de login
    const handleChangeView = (view) => {
        const viewsQueRequierenLogin = ['ventas', 'miCuenta', 'compras'];

        // Valida si requiere login
        if (viewsQueRequierenLogin.includes(view)) {
            if (!datosusuarios || !datosusuarios?.uid) {
                // Si NO está logueado, redirige al login
                handleIr('/loginaccount');
                return;
            }
        }

        // Si está todo bien, cambia la vista
        setActiveView(view);
    };

    // Al hacer clic en una categoría (para mostrar sus subcategorías)
    const handleCategoriaClick = (categoria) => {
        setCategoriaSeleccionada(categoria); // Guardás la categoría elegida
        setActiveView('subcategorias'); // Cambias la vista para mostrar subcategorías
    };

    // Subcategorías filtradas según la categoría seleccionada
    const subcategoriasFiltradas = subcategorias?.filter(
        (sub) => sub.id_categorias === categoriaSeleccionada?.id
    );


    const handleOpenInfoDialog = (category) => {
        setSelectedCategoryDetails(category); // Guarda la categoría seleccionada
        setIsInfoDialogOpen(true); // Abre el diálogo
    };

    const handleCloseInfoDialog = () => {
        setIsInfoDialogOpen(false); // Cierra el diálogo
        setSelectedCategoryDetails(null); // Limpia los datos
    };

    const handleIr = (path) => {
        localStorage.removeItem('inputdata');
        localStorage.removeItem('placeholdersearch');
        router.push(path);
        close(); // Cierra el drawer después de la navegación
    };

    const handleIrVerificado = (path) => {
        if (!datosusuarios || !datosusuarios?.uid) {
            // Si el usuario NO está logueado, lo manda al login
            router.push('/loginaccount');
        } else {
            // Si está logueado, va a la ruta que le mandes
            router.push(path);
        }
        close();// Cierra el drawer después de la navegación
    };

    useEffect(() => {
        const leerCategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "135",
                });

                //  console.log("Categorías por console:", res.data.listcategorias);
                setCategorias(res.data.listcategorias);
            } catch (error) {
                console.error("Error al leer las categorías", error);
            }
        };

        const leerSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "138",
                });

                setSubcategorias(res.data.listsubcategorias);
            } catch (error) {
                console.error("Error al leer las subcategorías", error);
            }
        };

        leerCategorias();
        leerSubcategorias();
    }, []);

    const selSubCategoria = (nombresub, codigoposicion) => {
        let texto = nombresub.split(" ");
        let datfind = "";
        let longdatfind = 0;
        let longmenosuno = 0;
        let cadenaExtraida = "";

        texto &&
            texto.map((palabra) => {
                longdatfind = palabra.length;
                longmenosuno = longdatfind - 1;
                cadenaExtraida = palabra.substring(longmenosuno, longdatfind);

                if (cadenaExtraida == "s" || cadenaExtraida == "S") {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else if (
                    cadenaExtraida == "a" ||
                    cadenaExtraida == "A" ||
                    cadenaExtraida == "o" ||
                    cadenaExtraida == "O"
                ) {
                    let cadenaExtraidaDos = palabra.substring(0, longmenosuno);
                    datfind = datfind + " " + cadenaExtraidaDos;
                } else datfind = datfind + " " + palabra;
            });

        let incremento = resetinput + 1;
        dispatch(getResetInput(incremento));
        localStorage.setItem("ctrlposicionprd", JSON.stringify(codigoposicion));
        localStorage.setItem("posicionprd", JSON.stringify(codigoposicion));
        localStorage.setItem("eraseplaceholder", JSON.stringify(1));
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        let string = `${datfind}`;
        router.push(`/search?keyword=${string}`);
        close();
    };

    useEffect(() => {
        const leerImagenesSubcategorias = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: URL_BD_MR + "141",
                });
                //      console.log("Imágenes de las subcategorías:", res.data.listimgsubcategorias);
                setImagenesSubcategorias(res.data.listimgsubcategorias);
            } catch (error) {
                console.error(
                    "Error al leer las imágenes de las subcategorías",
                    error
                );
            }
        };
        leerImagenesSubcategorias();
    }, []);

    const handleOpenDialog = (sub) => {
        setSubcategoriaInfo(sub); // Guarda la subcategoría que clickeaste
        setOpenDialog(true); // Abre el Dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Cierra el Dialog
        setSubcategoriaInfo(null); // Limpia los datos
    };

    const handleOpenDialogSubcategoria = (subcategoria) => {
        setSubcategoriaInfo(subcategoria);

        // Filtra todas las imágenes asociadas a la subcategoría
        const imagenesFiltradas = imagenesSubcategorias?.filter(
            (imagen) => imagen?.id_subcategoria === subcategoria?.id
        );

        console.log("imagenesFiltradas", imagenesFiltradas);
        // Guardamos el array completo
        setImagenesSeleccionadas(imagenesFiltradas);

        setOpenDialog(true);
    };

    const Salir = () => {
        const auth = getAuth(firebase);
        localStorage.setItem("datauser", JSON.stringify(null));
        localStorage.setItem("idvehgarage", JSON.stringify(-1));
        dispatch(getUserMenuPrimary(false));
        localStorage.setItem("selectvehgarage", JSON.stringify(null));
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push("/");
                console.log("Sesión Cerrada");
            })
            .catch((error) => {
                // An error happened.
                console.log("Error Cerrando Sesión");
            });
    };

    const IrAhistorial = () => {
        dispatch(getUserMenuPrimary(false));
        router.push("/Historial/historialProducts");
    };

    const IrADudas = () => {
        dispatch(getUserMenuPrimary(false));
        router.push("/ResolverDudas");
    };

    const enviadatoslocalstorage = () => {
        localStorage.setItem(
            "datostiposvehiculos",
            JSON.stringify(datoscrearproductos.vgl_tiposvehiculos)
        );
        localStorage.setItem(
            "datosmarcasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_marcasvehiculos)
        );
        localStorage.setItem(
            "datoscarroceriasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos)
        );
        localStorage.setItem(
            "datosannosvehiculos",
            JSON.stringify(datoscrearproductos.vgl_annosvehiculos)
        );
        crearProductos();
    };

    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    };

    const vender = () => {
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        dispatch(getUserMenuPrimary(false));
        if (userlogged.idinterno === 0 && userlogged.activo === "S") {
            swal(
                "Mercado Repuesto",
                "Primero debes ingresar datos del vendedor!",
                "warning",
                { button: "Aceptar" }
            );
            router.push("/my-additionaldata");
            close();
        } else {
            if (userlogged.logged) {
                enviadatoslocalstorage();
            } else {
                localStorage.setItem("ira", JSON.stringify(10));
                localStorage.setItem("rutaira", JSON.stringify("/CreateProduct/createproduct"));
                Swal.fire({
                    width: '450px',
                    borderRadius: '16px',
                    showCancelButton: false,
                    showConfirmButton: false,
                    html:
                        `               
                <div style="border-radius: 16px; padding: 2rem;">
                    <button id="closeButton" style="position: absolute; right: 2rem; top: 2rem; font-size: 25px; color: #2D2E83;">X</button>
                    <img src="/static/img/favicon_2.png" alt="Mercado Repuesto" style="width: 50%; height: auto; margin: 0 auto;"/>
           
                    <br />
                    <h4>Vive una experiencia diferente en la <br/> compra o venta de tu repuesto</h4>
          
                    <h4>Por favor ingresa a tu cuenta</h4>
           
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 1rem; width: 100%;">
                        <a href="/my-account" style="width: 100%; height: auto; margin: 0 auto; margin-top: .5rem; margin-bottom: 1.5rem;">
                            <button style="border-radius: 10px; color: #2D2E83; background-color: white; border: 3px solid #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Soy nuevo</button>
                        </a>
                        
                        <a href="/loginaccount" style="width: 100%; height: auto; margin: 0 auto;"> 
                            <button style="border-radius: 10px; color: white; background-color: #2D2E83; height: 41px; width: 185px; font-size: 16px; margin-top: 1rem;">Ya tengo una cuenta</button> 
                        </a>
                    </div>
                </div>
                        <style>
            @media (max-width: 470px) {
                h4 {
                    line-height: 1.2; /* Ajusta el valor según el espaciado que prefieras */
                }
            }
        </style>
                `,
                    didOpen: () => {
                        document.getElementById('closeButton').addEventListener('click', () => {
                            Swal.close();
                        });
                    }
                });
            }
        }

        let editdata = {
            editar: false
        }
        dispatch(getEditData(editdata));
        let datprd = [];
        localStorage.setItem("duplicarprd", JSON.stringify(datprd));
        localStorage.setItem("vehvehicles", JSON.stringify(datprd));
        dispatch(getDuplicarPrd(0));

        if (router.pathname != "/CreateProduct/createproduct") {
            router.replace("/CreateProduct/createproduct");
            router.push("/CreateProduct/createproduct");
        } else {
            location.reload();
        }
    };

    return (
        <div className="leftBarMobile">
            <div className='topLeftBarMobile'>
                <img onClick={() => handleIr('/')} src="/static/img/logomr.png" alt="logo mercado repuesto" />
                <IoClose onClick={close} />
            </div>

            {activeView === 'main' && (
                <div className='ItemsLeftBar'>
                    <div className='normalItemLeftBar' onClick={() => handleIr('/')}>
                        <LiaHomeSolid />
                        <p>Inicio</p>
                    </div>

                    <div
                        className={datosusuarios && datosusuarios?.uid ? 'specialItemLeftBar' : 'specialItemLeftBarNone'}
                        onClick={() => handleChangeView('Cuenta')}
                    >
                        <div>
                            <MdOutlineAccountCircle />
                            <p>Mi Cuenta</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                    <div className='specialItemLeftBar' onClick={() => handleChangeView('categorias')}>
                        <div>
                            <CiBoxList />
                            <p>Categorías</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                    <div className='normalItemLeftBar' onClick={() => handleIr('/searchinteractive/searchinteractive')}>
                        <IoIosSearch />
                        <p>Buscador Interactivo</p>
                    </div>

                    <div className='normalItemLeftBar' onClick={() => vender()}>
                        <MdOutlineSell />
                        <p>Vender</p>
                    </div>

                    <div className='normalItemLeftBar' onClick={() => IrAhistorial()}>
                        <GoClock />
                        <p>Historial</p>
                    </div>

                    <div className='normalItemLeftBar' onClick={() => IrADudas()}>
                        <PiHeadset />
                        <p>Ayuda / PQR</p>
                    </div>

                    <div
                        className={datosusuarios && datosusuarios?.uid ? 'normalItemLeftBar' : 'normalItemLeftBarNonee'}
                        onClick={() => Salir(20)}
                    >
                        <BsDoorOpen />
                        <p>Salir</p>
                    </div>

                    {/*
                    <div className='normalItemLeftBar' onClick={() => handleIrVerificado('/Notification')}>
                        <IoIosNotificationsOutline />
                        <p>Notificaciones</p>
                    </div>

                    <div className='normalItemLeftBar' onClick={() => handleIrVerificado('/shop/wishlist')}>
                        <IoHeartOutline />
                        <p>Lista de Deseos</p>
                    </div>
 */}





                </div>
            )}

            {/* Vista Categorías */}
            {activeView === 'categorias' && (
                <div className="subItemsLeftBar" >


                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>

                    <span>
                        <h3>Categorías</h3>
                    </span>

                    {!categorias
                        ? <p>Cargando categorías...</p>
                        : categorias.length === 0
                            ? <p>No hay categorías</p>
                            : categorias
                                .sort((a, b) => a.id - b.id)
                                .map((categoria) => (
                                    <div key={categoria.id} className="subcategoria-item" >
                                        <p onClick={() => handleCategoriaClick(categoria)}>{categoria.nombre}</p>
                                        <IoIosInformationCircleOutline
                                            onClick={() => handleOpenInfoDialog(categoria)}
                                        />
                                    </div>
                                ))
                    }
                </div>
            )}




            {activeView === 'subcategorias' && (
                <div className="subItemsLeftBar">

                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>

                    <span>
                        <h3>{categoriaSeleccionada?.nombre}</h3>
                    </span>

                    {!subcategoriasFiltradas || subcategoriasFiltradas.length === 0
                        ? <p>No hay subcategorías</p>
                        : subcategoriasFiltradas.slice(0, 10).map((sub) => (
                            <div key={sub.id} className="subcategoria-item">
                                <p onClick={() =>
                                    selSubCategoria(
                                        sub.nombre,
                                        sub.codigoposicion
                                    )
                                }>{sub.nombre}</p>
                                <IoIosInformationCircleOutline
                                    onClick={() => handleOpenDialogSubcategoria(sub)}
                                />
                            </div>
                        ))
                    }


                    {subcategoriasFiltradas?.length > 10 && (
                        <div className="subCatRighMobile">
                            {subcategoriasFiltradas.slice(10).map((sub) => (
                                <div key={sub.id} className="subcategoria-item">
                                    <p onClick={() =>
                                        selSubCategoria(
                                            sub.nombre,
                                            sub.codigoposicion
                                        )
                                    }>{sub.nombre}</p>
                                    <IoIosInformationCircleOutline
                                        onClick={() => handleOpenDialogSubcategoria(sub)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}


                </div>
            )}

            {/* Vista Compras */}
            {activeView === 'compras' && (
                <div className="subItemsLeftBar">
                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>
                    <span>
                        <h3>Compras</h3>
                    </span>
                    <div onClick={() => handleIr('/MisCompras/misCompras')}>
                        <p>Mis Compras</p>
                    </div>
                    <div onClick={() => handleIr('/PreguntasYrespuestas/preguntasRealizadasPorUsuario')}>
                        <p>Preguntas Realizadas</p>
                    </div>
                </div>
            )}

            {/* Vista Mi Cuenta */}
            {activeView === 'miCuenta' && (
                <div className="subItemsLeftBar">
                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>
                    <span>
                        <h3>Mi Cuenta</h3>
                    </span>
                    <div onClick={() => handleIr('/EditUsers/MisDatos')}>
                        <p>Mis Datos</p>
                    </div>
                    <div onClick={() => handleIr('/Seguridad/seguridadData')}>
                        <p>Seguridad</p>
                    </div>
                </div>
            )}

            {/* Vista Cuenta */}
            {activeView === 'Cuenta' && (
                <div className="subItemsLeftBar">
                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>
                    <span>
                        <h3>Mi Cuenta</h3>
                    </span>
                    <div className='specialItemLeftBarMobileDos' onClick={() => handleChangeView('miCuenta')}>
                        <div>
                            <MdOutlineAccountCircle />
                            <p>Cuenta</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>


                    <div className='specialItemLeftBarMobileDos' onClick={() => handleChangeView('compras')}>
                        <div>
                            <RiShoppingBagLine />
                            <p>Compras</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                    <div className='specialItemLeftBarMobileDos' onClick={() => handleIrVerificado('/publication')}>
                        <div>
                            <LuGalleryVerticalEnd />
                            <p>Publicaciones</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                    <div className='specialItemLeftBarMobileDos' onClick={() => handleChangeView('ventas')}>
                        <div>
                            <RiHandCoinLine />
                            <p>Ventas</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                    <div className='specialItemLeftBarMobileDos' onClick={() => handleIrVerificado('/MiBilletera')}>
                        <div>
                            <IoWalletOutline />
                            <p>Mi Billetera</p>
                        </div>
                        <span>
                            <BiSolidChevronRight />
                        </span>
                    </div>

                </div>
            )}

            {/* Vista Ventas */}
            {activeView === 'ventas' && (
                <div className="subItemsLeftBar">
                    <button className='btn-back' onClick={handleBack}>
                        <HiChevronLeft />
                        Regresar
                    </button>
                    <span >
                        <h3>Ventas</h3>
                    </span>
                    <div onClick={() => handleIr('/MisVentas/misVentas')}>
                        <p>Mis Ventas</p>
                    </div>
                    <div onClick={() => handleIr('/Facturas/facturacion')}>
                        <p>Facturación</p>
                    </div>
                    <div onClick={() => handleIr('/PreguntasYrespuestas/preguntasSobreMisProductos')}>
                        <p>Preguntas Sobre Mis Productos</p>
                    </div>
                    <div onClick={() => handleIr('/OpinionesVendedor/opinionesVendedor')}>
                        <p>Opioniones Como Vendedor</p>
                    </div>
                </div>
            )}



            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                PaperProps={{ sx: { width: "100%", maxWidth: "550px!important", padding: { xs: "15px", sm: "25px" }, borderRadius: '11px' } }}
            >
                <div className='infoSubcategoriaNav'>
                    <div className='topInfoSubcategoriaNav'>
                        <IoIosInformationCircleOutline />
                        <p>
                            {subcategoriaInfo?.nombre}
                        </p>
                        <IoClose onClick={handleCloseDialog} />
                    </div>

                    <div className='contentInfoSubcategoriaNav'>
                        <p>{subcategoriaInfo?.descripcion || "Sin descripción."}</p>

                        {/* Render condicional: Solo muestra la imagen si existe */}
                        {imagenesSeleccionadas.length > 0 && (
                            <div className="contenedor-imagenes-subcategorias">
                                {imagenesSeleccionadas.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${URL_IMAGES_RESULTSSMS}${img.nombreimagen}`}
                                        alt={img.nombreimagen}
                                        className="imagen-subcategoria-dialog"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={isInfoDialogOpen}
                onClose={handleCloseInfoDialog}
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        width: "100%",
                        maxWidth: "550px!important",
                        padding: { xs: "15px", sm: "25px" },
                        borderRadius: "11px",
                    },
                }}
            >
                <div className="infoSubcategoriaNav">
                    <div className="topInfoSubcategoriaNav">
                        <IoIosInformationCircleOutline />
                        <p>{selectedCategoryDetails?.nombre}</p>
                        <IoClose onClick={handleCloseInfoDialog} />
                    </div>

                    <div className="contentInfoSubcategoriaNav">
                        <p>{selectedCategoryDetails?.descripcion || "Sin descripción."}</p>
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default LeftBarMobile;
