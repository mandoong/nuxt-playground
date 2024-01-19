export const useCount = () => useState('count', () => reactive({
    count : 0,
    num : 0,
}))

export const useAddCount = () => {
    const data = useCount()
    data.value.count++
}

