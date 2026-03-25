export function formatText(text: string, className?: string) {
    return (
        <p className={className}>
            {text.split("\n").map((line, i) => (
                <span key={i} className="block">
                    {line}
                </span>
            ))}
        </p>
    )
}