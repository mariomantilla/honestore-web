export const localDate = (date: Date, day: boolean = false): string => {
    return date.toLocaleDateString('es-es', {day: day ? "numeric" : undefined, month:"long", year: "numeric"})
}