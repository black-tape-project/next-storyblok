import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi";

export default function AtomsCode({ content }) {
    return (
        <div data-testid="code" className="mb-4 shadow-2xl">
            <div className="flex rounded-t-lg border border-b border-gray-900 bg-gray-800 py-3 px-4">
                <div className="mr-2 flex min-h-[1rem] min-w-[1rem] items-center justify-center rounded-full bg-red-500">
                    <FiX className="text-xs" />
                </div>
                <div className="mr-2 flex min-h-[1rem] min-w-[1rem] items-center justify-center rounded-full bg-yellow-500">
                    <FiMinus className="text-xs" />
                </div>
                <div className="flex min-h-[1rem] min-w-[1rem] items-center justify-center rounded-full bg-green-500">
                    <FiMaximize2 className="text-xs" />
                </div>
            </div>
            <code className="block max-h-80 overflow-scroll rounded-b-lg bg-gray-700 p-4 text-base text-white shadow-inner">
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </code>
        </div>
    );
}
