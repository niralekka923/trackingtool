// Initialize Supabase (Replace with your actual Supabase project details)
const SUPABASE_URL = "https://xlydlkwkqduwxzhmsfht.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseWRsa3drcWR1d3h6aG1zZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MjExNDcsImV4cCI6MjA5ODM5NzE0N30.6GTCCfzmHI9knQlBdKAkTM0H-v94E7TnvG6IhxtUXYw";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function trackVisitor() {
    try {
        // 1. Fetch Location and IP details from public API
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();

        // 2. Gather Browser and OS Information
        const visitorData = {
            ip_address: ipData.ip || "Unknown",
            city: ipData.city || "Unknown",
            region: ipData.region || "Unknown",
            country: ipData.country_name || "Unknown",
            browser: navigator.userAgent,
            visited_at: new Date().toISOString()
        };

        // 3. Insert data into Supabase 'visitors' table
        const { data, error } = await supabase
            .from('visitors')
            .insert([visitorData]);

        if (error) throw error;

        // Update UI Status
        document.getElementById('status-text').innerText = "Visit logged successfully for analysis!";
        document.getElementById('status-text').style.color = "#2ecc71";

    } catch (error) {
        console.error("Error tracking visitor:", error);
        document.getElementById('status-text').innerText = "Failed to log visit.";
        document.getElementById('status-text').style.color = "#e74c3c";
    }
}

// Execute tracking when the page loads
window.onload = trackVisitor;
