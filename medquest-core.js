// --- ATUALIZAÇÃO DA LÓGICA DE ESTATÍSTICAS ---
async function carregarEstatisticasDetalhadas() {
    try {
        const { data: statsData, error } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (error || !statsData) return;

        const total = statsData.length;
        const acertos = statsData.filter(i => i.acertou === true).length;
        const erros = total - acertos;
        const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

        // Atualiza os Cards de Cima
        if(document.getElementById('stat-total')) document.getElementById('stat-total').innerText = total;
        if(document.getElementById('stat-acertos')) document.getElementById('stat-acertos').innerText = acertos;
        if(document.getElementById('stat-erros')) document.getElementById('stat-erros').innerText = erros;
        if(document.getElementById('stat-precisao')) document.getElementById('stat-precisao').innerText = precisao + '%';

        // Processamento por Temas e Subtemas
        const resumoTemas = {};
        const alertaSubtemas = {};

        statsData.forEach(item => {
            // Lógica por Tema
            if (!resumoTemas[item.tema]) resumoTemas[item.tema] = { total: 0, acertos: 0 };
            resumoTemas[item.tema].total++;
            if (item.acertou) resumoTemas[item.tema].acertos++;

            // Lógica por Subtema (Para o gráfico de melhoria)
            const sub = item.subtema || "Geral";
            if (!alertaSubtemas[sub]) alertaSubtemas[sub] = { total: 0, erros: 0 };
            alertaSubtemas[sub].total++;
            if (!item.acertou) alertaSubtemas[sub].erros++;
        });

        // 1. Renderizar Temas
        renderizarTemas(resumoTemas);

        // 2. Renderizar Alertas (Mais de 25% de erros)
        renderizarAlertas(alertaSubtemas);

    } catch (e) { console.error("Erro ao carregar detalhes:", e); }
}

function renderizarTemas(dados) {
    const container = document.getElementById('lista-estatisticas-temas');
    if (!container) return;
    container.innerHTML = '';
    Object.keys(dados).forEach(tema => {
        const { total, acertos } = dados[tema];
        const perc = Math.round((acertos / total) * 100);
        container.innerHTML += `
            <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-bold text-gray-700 uppercase text-[10px]">${tema}</h4>
                    <span class="text-[10px] font-black ${perc >= 70 ? 'text-emerald-500' : 'text-blue-500'}">${perc}%</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-blue-600 h-full progress-bar" style="width: ${perc}%"></div>
                </div>
            </div>`;
    });
}

function renderizarAlertas(dados) {
    const container = document.getElementById('grafico-melhoria');
    if (!container) return;
    container.innerHTML = '';
    
    const criticos = Object.keys(dados).filter(sub => (dados[sub].erros / dados[sub].total) > 0.25);

    if (criticos.length === 0) {
        container.innerHTML = '<p class="text-[10px] text-emerald-500 font-bold uppercase">Nenhum alerta crítico no momento! Continue assim.</p>';
        return;
    }

    criticos.forEach(sub => {
        const taxaErro = Math.round((dados[sub].erros / dados[sub].total) * 100);
        container.innerHTML += `
            <div class="flex items-center gap-4 mb-3">
                <div class="flex-1">
                    <div class="flex justify-between mb-1">
                        <span class="text-[10px] font-bold text-gray-600 uppercase">${sub}</span>
                        <span class="text-[10px] font-bold text-red-500">${taxaErro}% de Erro</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-red-500 h-full" style="width: ${taxaErro}%"></div>
                    </div>
                </div>
            </div>`;
    });
}
