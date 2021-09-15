export const Capitalize = (text) => {
    const lower = text.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
}