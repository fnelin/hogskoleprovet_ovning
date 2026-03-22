import Link from "next/link";

export default function Sidhuvud() {
    return (
        <header className="border-b border-border ">
            <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
                <Link href="/"><span className="text-lg font-semibold tracking-tight">Högskoleprepp</span></Link>
                <nav className="flex items-center gap-6">
                    <Link href="/progress" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Framsteg
                    </Link>
                    <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Inställningar
                    </Link>
                </nav>
            </div>
        </header>
    )
}