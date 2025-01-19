export const isEmpty = (value) => {
    return value.trim().length === 0
}

export const minLength = (value) => {
    return value.trim().length < 5
}

export const isNotBetween = (value) => {
    return value.trim().length < 10 || value.trim().length > 300
}