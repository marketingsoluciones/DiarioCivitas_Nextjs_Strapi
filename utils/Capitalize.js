export const Capitalize = (text) => {
    const lower = text?.toLowerCase()
    if (lower) {
        const arrLower = lower.split(" ")
        const arrText = arrLower.map(elem => elem.charAt(0)?.toUpperCase() + elem?.slice(1))
        let result = ""
        for (let i = 0; i < arrText.length; i++) {
            result = `${result}${arrText[i]} `
        }
        return result.slice(0, result.length - 1)
    }
}