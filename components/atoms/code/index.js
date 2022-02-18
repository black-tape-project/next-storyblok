import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi";

export default function AtomsCode({ content }) {
    return (
        <div className="mb-4 shadow-2xl">
            <div className="flex py-3 px-4 bg-gray-900 rounded-t-lg">
                <div className="flex justify-center items-center mr-2 min-w-[1rem] min-h-[1rem] bg-red-500 rounded-full">
                    <FiX className="text-xs" />
                </div>
                <div className="flex justify-center items-center mr-2 min-w-[1rem] min-h-[1rem] bg-yellow-500 rounded-full">
                    <FiMinus className="text-xs" />
                </div>
                <div className="flex justify-center items-center min-w-[1rem] min-h-[1rem] bg-green-500 rounded-full">
                    <FiMaximize2 className="text-xs" />
                </div>
            </div>
            <code className="block overflow-scroll p-4 max-h-80 text-base text-white bg-gray-800 rounded-b-lg">
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </code>
        </div>
    );
}
