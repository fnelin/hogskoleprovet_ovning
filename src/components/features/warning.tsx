export default function Warning() {

    return (
        <div className="w-full bg-yellow-100 border-b border-yellow-300 text-center">
            <p className="mx-auto max-w-4xl px-6 py-2 font-medium text-2xl text-red-800">
                Still work in progress, not for productive use
            </p>
            <p className="mx-auto max-w-4xl px-6 py-2 font-medium text-sm text-red-800">
                AI generated content such as questions and answers has not been verified.
            </p>
        </div>
    )
}