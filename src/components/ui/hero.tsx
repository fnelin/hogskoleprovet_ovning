import Herostats from "@/components/ui/herostats"

export default function Mainhero() {
    return (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance text-neutral-100">
                        Förberedelser med syfte.
                    </h1>
                    <p className="mt-4 text-lg text-muted max-w-xl">
                        Riktade övningsfrågor för att förbereda dig inför ditt kommande prov.
                        Välj ett ämne för att öva/repetera.
                    </p>
                </div>
                <Herostats />
            </div>
        </section>
    )
}