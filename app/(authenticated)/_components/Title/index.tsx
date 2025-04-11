

export const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {children}
        </h1>
    )
}