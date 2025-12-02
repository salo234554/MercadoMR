import React, { useState } from "react";
import { Drawer } from "@mui/material";
import { RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";


const DrawerLeftMobile = () => {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openSection, setOpenSection] = useState(null);
    const router = useRouter();

    const handleOpenDrawer = () => setOpenDrawer(true);

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setOpenSection(null); // Resetea los acordeones
    };

    const toggleSection = (section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    const handleIrVerificado = (path) => {
        if (!datosusuarios || !datosusuarios.uid) {
            // Si el usuario NO está logueado, lo manda al login
            router.push('/loginaccount');
        } else {
            // Si está logueado, va a la ruta que le mandes
            router.push(path);
        } 
        close();// Cierra el drawer después de la navegación
    };

    return (
        <div className="hideAbove900px"> 
            <p>Mis Compras</p>

            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleCloseDrawer}
                PaperProps={{
                    sx: {
                        top: 133, // Ahora lo bajas 133px
                        height: "calc(100% - 133px)", // Le restás esos 150px al alto
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#D4D6E5",
                    },
                }}
            >
                <div className="drawerHeaderLeft">
                    <div className="topDrawerLeft">
                        <div>
                            <FaUserCircle />
                            <p>
                                {datosusuarios
                                    ? datosusuarios?.tipoidentificacion === 6
                                        ? datosusuarios?.razonsocial
                                        : datosusuarios?.name
                                    : "Usuario"}
                            </p>
                        </div>
                        <IoClose onClick={handleCloseDrawer} />
                    </div>

                    <div
                        className="normalItemDrawerLeftUser"
                        onClick={() => { handleIrVerificado('/publication'); }}
                    >
                        Publicaciones
                    </div>

                    <div
                        className="specialItemDrawerLeftUser"
                        onClick={() => toggleSection('cuenta')}
                    >
                        <span>Cuenta</span>
                        <FiChevronRight
                            className={`iconArrow ${openSection === 'cuenta' ? 'rotate' : ''}`}
                        />
                    </div>
                    <div
                        className={`desplegableItemsDrawerLeft ${openSection === 'cuenta' ? 'open' : ''
                            }`}
                    >
                        <div
                            className="normalItemDrawerLeftUser"
                            onClick={() => { handleIrVerificado('/EditUsers/MisDatos'); }}
                        >
                            Mis Datos
                        </div>
                        <div
                            onClick={() => { handleIrVerificado('/Seguridad/seguridadData'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Seguridad
                        </div>
                    </div>

                    <div
                        className="specialItemDrawerLeftUser"
                        onClick={() => toggleSection('compras')}
                    >
                        <span>Compras</span>
                        <FiChevronRight
                            className={`iconArrow ${openSection === 'compras' ? 'rotate' : ''}`}
                        />
                    </div>
                    <div
                        className={`desplegableItemsDrawerLeft ${openSection === 'compras' ? 'open' : ''
                            }`}
                    >
                        <div
                            onClick={() => { handleIrVerificado('/MisCompras/misCompras'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Mis Compras
                        </div>
                        <div
                            onClick={() => { handleIrVerificado('/PreguntasYrespuestas/preguntasRealizadasPorUsuario'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Preguntas Realizadas
                        </div>
                    </div>

                    <div
                        className="specialItemDrawerLeftUser"
                        onClick={() => toggleSection('ventas')}
                    >
                        <span>Ventas</span>
                        <FiChevronRight
                            className={`iconArrow ${openSection === 'ventas' ? 'rotate' : ''}`}
                        />
                    </div>
                    <div
                        className={`desplegableItemsDrawerLeft ${openSection === 'ventas' ? 'open' : ''
                            }`}
                    >
                        <div
                            onClick={() => { handleIrVerificado('/MisVentas/misVentas'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Mis Ventas
                        </div>
                        <div
                            onClick={() => { handleIrVerificado('/Facturas/facturacion'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Facturación
                        </div>
                        <div
                            onClick={() => { handleIrVerificado('/PreguntasYrespuestas/preguntasSobreMisProductos'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Preguntas Sobre Mis Productos
                        </div>
                        <div
                            onClick={() => { handleIrVerificado('/OpinionesVendedor/opinionesVendedor'); }}
                            className="normalItemDrawerLeftUser"
                        >
                            Opiniones Como Vendedor
                        </div>
                    </div>

                    <div
                        onClick={() => { handleIrVerificado('/MiBilletera'); }}
                        className="normalItemDrawerLeftUser"
                    >
                        Billetera
                    </div>

                </div>
            </Drawer>
        </div>
    );
};

export default DrawerLeftMobile;
