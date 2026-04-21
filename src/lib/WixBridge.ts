// L-CODE DYNAMICS: Goliáš Wix-Headless Bridge v1.1
// Propojení 300% Next.js frontendu s Wix backendem

const WIX_API_URL = "https://www.beliansky.eu/_functions/myData";

export const WixBridge = {
    async fetchMyData() {
        try {
            const response = await fetch(WIX_API_URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                next: { revalidate: 3600 } // Optimalizace výkonu — revalidace každou hodinu
            });

            // L-CODE GUARDIAN: Kontrola HTTP stavu (ostřejší verze try/catch)
            if (!response.ok) {
                console.error(`L-CODE BRIDGE CRITICAL: Wix vrací status ${response.status}. *smrk*`);
                return null;
            }

            const data = await response.json();
            
            // Defenzivní kontrola datové struktury
            if (!data || !data.payload) {
                console.warn("L-CODE BRIDGE WARNING: Wix vrátil prázdný payload.");
                return null;
            }

            return data.payload;
        } catch (error) {
            console.error("L-CODE BRIDGE ERROR: Totální selhání komunikace s Wixem.", error);
            return null;
        }
    }
};
