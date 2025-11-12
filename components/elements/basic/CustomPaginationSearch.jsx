import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageSelect } from "../../../store/pageselect/action";

const CustomPaginationSearch = ({ numeroPaginas, setOrderPrice }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState("");
    const [paginaSel, setPaginaSel] = useState("");

    let numeropaginas = [];
    numeropaginas = useSelector(
        (state) => state.numberpages.numberpages
    );

    const paginaselect = useSelector(
        (state) => state.pageselect.pageselect
    );

    console.log("NUM PAG : ", numeroPaginas);

    const SeleccionaPagina = (pag) => {
        dispatch(getPageSelect(pag));
    };

    const nextPag = () => {
        let siguiente = paginaselect + 1;

        if (siguiente <= numeroPaginas)
            SeleccionaPagina(siguiente);
    }

    const prevPag = () => {
        let anterior = paginaselect - 1;
        if (anterior > 0)
            SeleccionaPagina(anterior);
    }

    const createPaginationArray = (currentPage, totalPages) => {
        const pages = [];

        // Mostrar todo si hay 6 o menos páginas
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        // Siempre mostrar la primera página
        pages.push(1);

        if (currentPage <= 3) {
            // Mostrar páginas 2, 3, 4
            pages.push(2);
            pages.push(3);
            pages.push(4);
            pages.push("...");
        } else if (currentPage >= totalPages - 2) {
            // Mostrar elipsis, luego las últimas 3 páginas
            pages.push("...");
            pages.push(totalPages - 3);
            pages.push(totalPages - 2);
            pages.push(totalPages - 1);
        } else {
            // Mostrar elipsis + currentPage -1, currentPage, currentPage +1 + elipsis
            pages.push("...");
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push("...");
        }

        // Siempre mostrar la última página
        pages.push(totalPages);

        return pages;
    };

    const pages = createPaginationArray(paginaselect, numeroPaginas);

    return (
        <div className="ps-pagination">
            <ul className="pagination">
                <li>
                    <a onClick={() => prevPag()}>
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>
                {pages.map((page, index) => (
                    page === "..." ? (
                        <li key={index} className="ellipsis">
                            <a href="#">{page}</a>
                        </li>
                    ) : (
                        <li key={index} className={page === paginaselect ? "active" : ""}>
                            <a onClick={() => SeleccionaPagina(page)}>
                                {page}
                            </a>
                        </li>
                    )
                ))}
                <li>
                    <a href="#" onClick={() => nextPag()}>
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};
export default CustomPaginationSearch;
