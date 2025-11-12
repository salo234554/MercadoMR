import { useEffect, useState } from "react"; 
import NavigationInteractive from "~/components/shared/navigations/NavigationInteractive"; 
import Header from '../../elements/header/Header';

function HeaderInteractive(props) {
    const [showNav, setShowNav] = useState(true);
    const [classes, setClasses] = useState(true);
    const [categorias, setCategorias] = useState(false);

    useEffect(() => {
        //console.log("CATEGORIA HEADER : ", categorias);
        //alert("CAMBIO categorias")
    }, [categorias]);

    function handleShownav(e) {
        e.preventDefault();
        if (showNav) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }

    function handleStickyHeader() {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        const header = document.getElementById("header-sticky");
        if (header !== null) {
            if (number >= 300) {
                header.classList.add("header--sticky");
                setShowNav(false);
            } else {
                header.classList.remove("header--sticky");
                setShowNav(true);
            }
        }
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", handleStickyHeader);
        }
    }, []);

    return (
        <header
            className={`header--desktop header--one ${classes}`}
            id="header-sticky">
            <div className="header__top">
                <Header />
            </div> 
            {categorias ? (
                <div
                    className={`header__bottom ${showNav ? "active" : ""
                        }`}>
                    <NavigationInteractive
                        categorias={categorias}
                        setCategorias={setCategorias}
                    />
                </div> 
            ) : (
                <div
                    className={`header__bottom ${showNav ? "active" : ""
                        }`}>
                    <NavigationInteractive
                        categorias={categorias}
                        setCategorias={setCategorias}
                    />
                </div>
            )} 
        </header>
    );
}

export default HeaderInteractive;