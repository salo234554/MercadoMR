import { IoSettingsSharp } from "react-icons/io5";

const EstadoProducto = ({ estado }) => {
    // Aseguramos que el estado esté entre 0 y 5
    const nivel = Math.max(0, Math.min(estado, 5));

    return (
        <div className="divIconsSearchEstado">
            {Array.from({ length: 5 }, (_, index) => (
                <IoSettingsSharp
                    key={index}
                    className={`icono-estado ${index < nivel ? 'iconBlueActive' : 'iconBlueUnactive'}`}
                />
            ))}
        </div>
    );
};


export default EstadoProducto;