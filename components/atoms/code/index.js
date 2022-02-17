export default function AtomsCode({ content }) {
    return (
        <div className="mb-4 shadow-2xl">
            <div className="flex py-3 px-4 bg-gray-900 rounded-t-lg">
                <div className="mr-2 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="mr-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <code className="block overflow-scroll p-4 max-h-80 text-base text-white bg-gray-800 rounded-b-lg">
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </code>
        </div>
    );
}
