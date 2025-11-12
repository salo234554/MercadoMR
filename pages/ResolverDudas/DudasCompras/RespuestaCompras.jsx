import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "../../../components/layouts/Container";
import {
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    InputBase,
} from "@mui/material";
import { useRouter } from "next/router";
import AyudaResptaComprUno from "./AyudaResptaComprUno";
import {
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
    URL_BD_MR,
} from "../../../helpers/Constants";
import axios from "axios";
import { AiOutlineRight } from "react-icons/ai";
import Link from "@mui/material/Link";
import { GrNext } from "react-icons/gr";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import BuscarComponente from "../BuscarComponente";
import BreadCumbBusqueda from "~/components/elements/BreadCumbBusqueda";

const breadcrumb = [
    {
        id: 1,
        text: "Resuelve tus dudas",
        url: "/ResolverDudas",
    },
    {
        id: 2,
        text: "Sobre comprar",
    },
];

function RespuestaCompras(props) {
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.

    let infoCompras = null;
    const [nivelAyuda, setNivelAyuda] = useState();
    const [indicesAleatorios, setIndicesAleatorios] = useState([]);
    const [datos, setDatos] = useState([]);

    const { dato } = router.query;
    const datoParsed = dato ? JSON.parse(dato) : null;

    if (typeof window !== "undefined") {
        if (router.query.dato) {
            let dato = JSON.parse(router.query.dato);
            console.log("DATOZZZ : ", dato);
            infoCompras = dato;
        } else {
        }
    }

    useEffect(() => {
        /*
        if (infoCompras?.idayuda == 1) {
            //setNivelAyuda(1);
        } else
            if (infoCompras?.idayuda == 2) {
                //setNivelAyuda(2);
            }
                */
    }, [infoCompras]);

    // Luego, en el efecto de React, pasa el valor de nombreniveluno a la función
    useEffect(() => {
        const obtenerYSeleccionarDatos = async () => {
            // Si la página se recarga, pasa null a obtenerDatos
            const datosObtenidos = await obtenerDatos(null);
            console.log("datosObtenidos : ", datosObtenidos);
            setDatos(datosObtenidos);

            let indices = [];
            if (datosObtenidos.length >= 3) {
                while (indices.length < 3) {
                    let indice = Math.floor(
                        Math.random() * datosObtenidos.length
                    );
                    if (!indices.includes(indice)) {
                        indices.push(indice);
                    }
                }
            }
            setIndicesAleatorios(indices);
        };

        obtenerYSeleccionarDatos();
    }, []);

    const obtenerDatos = async (nombreniveluno) => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "116",
            });
            // Si nombreniveluno es null, retorna todos los datos
            if (!nombreniveluno) {
                return res.data.resolverdudasdos;
            }
            // Si nombreniveluno no es null, filtra los datos
            return res.data.resolverdudasdos.filter(
                (dato) => dato.nombreniveluno === nombreniveluno
            );
        } catch (error) {
            console.error("Error al leer los datos", error);
            return [];
        }
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner" id="myaccount">
                <div className="container">
                    <div className="ps-page__header"> </div>
                    <div
                        className="ps-page__content ps-account"
                        style={{ marginBottom: "5rem" }}>
                        <Grid
                            className="contMainOpiniones"
                            container
                            style={{ width: isMdDown ? "100%" : "87%" }}
                            display={"flex"}
                            flexDirection={"column"}>
                            <div className="TitleResptaCompras">
                                <Breadcrumbs
                                    separator={
                                        <GrNext
                                            style={{ color: "#2D2E83" }}
                                            size={12}
                                        />
                                    }
                                    aria-label="breadcrumb">
                                    <Link
                                        className="linkMisv"
                                        underline="none"
                                        href="/ResolverDudas"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push("/ResolverDudas");
                                        }}>
                                        <p className="VerVentaLink">
                                            Resuelve tus dudas
                                        </p>
                                    </Link>
                                    <p className="VerVentaLink1">
                                        {datoParsed
                                            ? datoParsed?.nombreniveldos
                                            : "Cargando..."}
                                    </p>
                                </Breadcrumbs>
                            </div>

                            <div className="contMainResolverDudas">
                                <BuscarComponente />

                                <div className="textoayudacomprar">
                                    {infoCompras?.nombreniveluno}
                                </div>

                                <div className="modalayudacomprar">
                                    <div className="textoayudacomprar">
                                        {infoCompras?.descripcionniveluno}
                                    </div>
                                    <AyudaResptaComprUno />
                                </div>
                                {/*Otras dudas relacionadas contenedor */}
                                <div className="sobreComprarDudas sobreMiCuentaCont">
                                    <div className="contTitulo ">
                                        <p>Te podría interesar</p>
                                    </div>
                                    {indicesAleatorios.map((indice, i) => {
                                        // Verifica si el dato existe antes de intentar acceder a nombreniveldos
                                        const dato = datos[indice];
                                        if (!dato) {
                                            return null; // Retorna null o algún componente de relleno
                                        }

                                        let className = "contTitulosDudas";
                                        if (i === 0) {
                                            className += " startContDudas"; // Agrega la clase al primer elemento
                                        } else if (
                                            i ===
                                            indicesAleatorios.length - 1
                                        ) {
                                            className += " endContDudas"; // Agrega la clase al último elemento
                                        }
                                        return (
                                            <div
                                                key={indice}
                                                onClick={() => {
                                                    router.replace({
                                                        pathname: `./OpcionesCompras`,
                                                        query: {
                                                            dato: JSON.stringify(
                                                                dato
                                                            ),
                                                        },
                                                    });
                                                }}
                                                className={className}>
                                                <p>{dato.nombreniveldos}</p>
                                                <AiOutlineRight size={27} />
                                                {
                                                    //.then(() => window.location.reload());
                                                }
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Grid>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default RespuestaCompras;
