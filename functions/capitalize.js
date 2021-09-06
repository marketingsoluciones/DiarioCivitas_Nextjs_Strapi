export const Capitalize = (texto) => {
    const minuscula = texto?.toLowerCase();
    return texto?.charAt(0)?.toUpperCase() + minuscula?.slice(1)
}