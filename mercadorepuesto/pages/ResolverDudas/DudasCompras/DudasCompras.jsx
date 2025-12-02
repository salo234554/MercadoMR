import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "../../../components/layouts/Container";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import AyudaComprasUno from "./AyudaComprasUno";
import AyudaComprasDos from "./AyudaComprasDos";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import BreadCumbBusqueda from "~/components/elements/BreadCumbBusqueda";
import { GrNext } from "react-icons/gr";
import Link from "@mui/material/Link";
import BuscarComponente from "../BuscarComponente";

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

function DudasCompras(props) {
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md")); //Consts measured, 80% and in md 100%.
    let infoCompras = null;
    const [nivelAyuda, setNivelAyuda] = useState();

    if (typeof window !== "undefined") {
        if (router.query.dato) {
            let dato = JSON.parse(router.query.dato);
            console.log("DATOXX : ", dato);
            infoCompras = dato;
        } else {
        }
    }

    useEffect(() => {
        if (infoCompras?.idayuda == 1) {
            setNivelAyuda(1);
        } else if (infoCompras?.idayuda == 2) {
            setNivelAyuda(2);
        }
    }, [infoCompras]);

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner" id="myaccount">
                <div className="container">
                  
                    <div
                        className="ps-page__content ps-account"
                        style={{ marginBottom: "5rem" }}>
                        <Grid
                            className="contMainOpiniones"
                            container
                            style={{ width: isMdDown ? "100%" : "87%" }}
                            display={"flex"}
                            flexDirection={"column"}>
                                
                            <div className="TitleDinamicoDudas">
                                <div className="positionbreadcumbdudas">
                                    <BreadCumbBusqueda breacrumb={breadcrumb} />
                                </div>
                            </div>

                            <div className="contMainResolverDudas">
                                <div className="mb-20">
                                    <BuscarComponente />
                                </div>

                                {/*Container de mis compras */}
                                <div className="textoayudacomprar">
                                    ¿{infoCompras?.nombreniveldos}?
                                </div>
                                <div className="">
                                    {nivelAyuda == 1 ? (
                                        <AyudaComprasUno />
                                    ) : nivelAyuda == 2 ? (
                                        <AyudaComprasUno />
                                    ) : null}
                                </div>
                            </div>
                        </Grid>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DudasCompras;
