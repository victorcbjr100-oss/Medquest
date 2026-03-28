// --- CONFIGURAÇÕES GLOBAIS ---
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

// --- FUNÇÃO QUE ESTAVA FALTANDO (DASHBOARD) ---
async function sincronizarDashboard() {
    try {
        const { data: statsData } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (statsData) {
            const total = statsData.length;
            const acertos = statsData.filter(i => i.acertou === true).length;
            const erros = total - acertos;
            const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

            if(document.getElementById('stat-total')) document.getElementById('stat-total').innerText = total;
            if(document.getElementById('stat-acertos')) document.getElementById('stat-acertos').innerText = acertos;
            if(document.getElementById('stat-erros')) document.getElementById('stat-erros').innerText = erros;
            if(document.getElementById('stat-precisao')) document.getElementById('stat-precisao').innerText = precisao + '%';
        }
    } catch (e) { console.error("Erro Dashboard:", e); }
}

// --- FUNÇÃO DE ESTATÍSTICAS DETALHADAS ---
async function carregarEstatisticasDetalhadas() {
    try {
        const { data: statsData, error } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (error || !statsData) return;

        const resumoTemas = {};
        const alertaSubtemas = {};

        statsData.forEach(item => {
            if (!resumoTemas[item.tema]) resumoTemas[item.tema] = { total: 0, acertos: 0 };
            resumoTemas[item.tema].total++;
            if (item.acertou) resumoTemas[item.tema].acertos++;

            const sub = item.subtema || "Geral";
            if (!alertaSubtemas[sub]) alertaSubtemas[sub] = { total: 0, erros: 0 };
            alertaSubtemas[sub].total++;
            if (!item.acertou) alertaSubtemas[sub].erros++;
        });

        // Preencher Temas
        const containerTemas = document.getElementById('lista-estatisticas-temas');
        if (containerTemas) {
            containerTemas.innerHTML = Object.keys(resumoTemas).map(tema => {
                const { total, acertos } = resumoTemas[tema];
                const perc = Math.round((acertos / total) * 100);
                return `
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-bold text-gray-700 uppercase text-[10px]">${tema}</h4>
                            <span class="text-[10px] font-black ${perc >= 70 ? 'text-emerald-500' : 'text-blue-500'}">${perc}%</span>
                        </div>
                        <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-full progress-bar" style="width: ${perc}%"></div>
                        </div>
                    </div>`;
            }).join('');
        }

        // Preencher Alertas (Erros > 25%)
        const containerAlertas = document.getElementById('grafico-melhoria');
        if (containerAlertas) {
            const criticos = Object.keys(alertaSubtemas).filter(sub => (alertaSubtemas[sub].erros / alertaSubtemas[sub].total) > 0.25);
            containerAlertas.innerHTML = criticos.length ? criticos.map(sub => {
                const taxaErro = Math.round((alertaSubtemas[sub].erros / alertaSubtemas[sub].total) * 100);
                return `
                    <div class="mb-3 text-[10px] font-bold">
                        <div class="flex justify-between mb-1 uppercase"><span class="text-gray-600">${sub}</span><span class="text-red-500">${taxaErro}% ERRO</span></div>
                        <div class="w-full bg-gray-100 h-1 rounded-full overflow-hidden"><div class="bg-red-500 h-full" style="width: ${taxaErro}%"></div></div>
                    </div>`;
            }).join('') : '<p class="text-[10px] text-emerald-500 font-bold uppercase">Tudo sob controle!</p>';
        }

    } catch (e) { console.error("Erro Detalhes:", e); }
}
