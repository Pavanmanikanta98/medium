
export const WarningCard = ({ message }: { message: string }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-red-700 text-white rounded-lg p-4">
                <p>{message}</p>
            </div>
        </div>
    );
}
