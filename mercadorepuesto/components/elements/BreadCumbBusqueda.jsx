import React from "react";
import Link from "next/link";

const BreadCumbBusqueda = ({ breacrumb }) => {
    return (
        <ul className="breadcrumb box-breadcrumb-busqueda">
            {breacrumb.map((item) => {
                if (!item.url) {
                    return (
                        <li className="textlink5" key={item.id}>
                            {item.text}
                        </li>
                    );
                } else {
                    return (
                        <li key={item.text}>
                            <Link href={item.url}>
                                <a className="textlink4">{item.text}</a>
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default BreadCumbBusqueda;
