// CONFIGURAÇÕES GLOBAIS - MEDQUEST PRO
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

// --- 1. LÓGICA DO DASHBOARD (Resumo Geral) ---
async function sincronizarDashboard() {
    try {
        const { count: totalBanco } = await _supabase.from('questoes').select('*', { count: 'exact', head: true });
        if(document.getElementById('total-banco')) document.getElementById('total-banco').innerText = totalBanco || 0;

        const { data: statsData } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (statsData) {
            const total = statsData.length;
            const acertos = statsData.filter(i => i.acertou === true).length;
            const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;

            if(document.getElementById('stat-total')) document.getElementById('stat-total').innerText = total;
            if(document.getElementById('stat-acertos')) document.getElementById('stat-acertos').innerText = acertos;
            if(document.getElementById('stat-precisao')) document.getElementById('stat-precisao').innerText = precisao + '%';
        }
    } catch (e) { console.error("Erro Dashboard:", e); }
}

// --- 2. LÓGICA DA PÁGINA DE ESTATÍSTICAS (Detalhamento por Tema) ---
async function carregarEstatisticasDetalhadas() {
    try {
        const { data: statsData, error } = await _supabase.from('estatisticas').select('*').eq('usuario', 'Dr. Victor');
        if (error || !statsData) return;

        const resumoPorTema = {};
        statsData.forEach(item => {
            if (!resumoPorTema[item.tema]) resumoPorTema[item.tema] = { total: 0, acertos: 0 };
            resumoPorTema[item.tema].total++;
            if (item.acertou) resumoPorTema[item.tema].acertos++;
        });

        const container = document.getElementById('lista-estatisticas-temas');
        if (!container) return;
        container.innerHTML = '';

        Object.keys(resumoPorTema).forEach(tema => {
            const { total, acertos } = resumoPorTema[tema];
            const perc = Math.round((acertos / total) * 100);
            
            container.innerHTML += `
                <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-bold text-gray-700 uppercase text-xs">${tema}</h4>
                        <span class="text-xs font-black ${perc >= 70 ? 'text-emerald-500' : 'text-blue-500'}">${perc}%</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div class="bg-blue-600 h-full transition-all duration-1000" style="width: ${perc}%"></div>
                    </div>
                    <p class="text-[10px] text-gray-400 mt-2 font-bold uppercase">${acertos} ACERTOS DE ${total} QUESTÕES</p>
                </div>`;
        });
    } catch (e) { console.error("Erro ao carregar detalhes:", e); }
}

// --- 3. LÓGICA DE COMENTÁRIOS ESTILO YOUTUBE ---
let comentPaiId = null;

async function carregarComentarios(questaoId) {
    const lista = document.getElementById('lista-comentarios');
    if(!lista) return;

    const { data: todos, error } = await _supabase.from('comentarios').select('*').eq('questao_id', questaoId).order('created_at', { ascending: true });
    if (error) return;

    lista.innerHTML = '';
    if(!todos || todos.length === 0) {
        lista.innerHTML = '<p class="text-[10px] text-gray-400 italic text-center py-4">Nenhum comentário clínico ainda.</p>';
        return;
    }

    const principais = todos.filter(c => !c.pai_id);
    const respostas = todos.filter(c => c.pai_id);

    principais.forEach(coment => {
        lista.innerHTML += renderComentario(coment, false);
        respostas.filter(r => r.pai_id === coment.id).forEach(reply => {
            lista.innerHTML += renderComentario(reply, true);
        });
    });
}

function renderComentario(c, isReply) {
    const margin = isReply ? 'ml-10 border-l-2 border-blue-100 pl-4 bg-gray-50/50' : 'mb-3 bg-gray-50';
    const bResposta = !isReply ? `<button onclick="prepararResposta('${c.id}', '${c.usuario}')" class="text-[9px] font-bold text-blue-500 mt-2 hover:underline uppercase tracking-tighter">Responder</button>` : '';
    
    return `
        <div class="${margin} p-3 rounded-xl transition-all border border-transparent hover:border-blue-50">
            <div class="flex items-start gap-2">
                <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">${c.usuario.charAt(0)}</div>
                <div class="flex-1">
                    <p class="text-[10px] font-bold text-gray-800">${c.usuario} <span class="text-gray-400 font-normal ml-1">${new Date(c.created_at).toLocaleDateString()}</span></p>
                    <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">${c.texto}</p>
                    ${bResposta}
                </div>
            </div>
        </div>`;
}

function prepararResposta(id, user) {
    comentPaiId = id;
    const input = document.getElementById('input-comentario');
    if(input) {
        input.placeholder = `Respondendo a ${user}...`;
        input.focus();
    }
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input || !input.value) return;

    const { error } = await _supabase.from('comentarios').insert([{
        questao_id: questaoId,
        usuario: 'Dr. Victor',
        texto: input.value,
        pai_id: comentPaiId
    }]);

    if (!error) {
        input.value = '';
        input.placeholder = "Escreva um comentário clínico...";
        comentPaiId = null;
        carregarComentarios(questaoId);
    }
}
