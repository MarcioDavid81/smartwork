export const Subtitle = ({children}: {children: React.ReactNode}) => {
    return (
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
            {children}
        </h2>
    )
}