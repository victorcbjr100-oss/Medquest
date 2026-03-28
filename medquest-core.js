// CONFIGURAÇÕES GLOBAIS - MEDQUEST PRO
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraHdmdWRqY3FtYmhjZGtwZXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTAwMzQsImV4cCI6MjA4OTk2NjAzNH0.tOHjrpUCfqzt43b3MnC2sbCFXGJzFH95-p85lKGrwQI';
const _supabase = supabase.createClient(S_URL, S_KEY);

// --- LÓGICA DO DASHBOARD ---
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

// --- LÓGICA DE COMENTÁRIOS ESTILO YOUTUBE ---
let comentPaiId = null;

async function carregarComentarios(questaoId) {
    const lista = document.getElementById('lista-comentarios');
    if(!lista) return;

    const { data: todos, error } = await _supabase.from('comentarios').select('*').eq('questao_id', questaoId).order('created_at', { ascending: true });
    if (error) return;

    lista.innerHTML = '';
    if(!todos || todos.length === 0) {
        lista.innerHTML = '<p class="text-[10px] text-gray-400 italic">Seja o primeiro a comentar esta questão.</p>';
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
    const bResposta = !isReply ? `<button onclick="prepararResposta('${c.id}', '${c.usuario}')" class="text-[9px] font-bold text-blue-500 mt-2 hover:underline uppercase">Responder</button>` : '';
    
    return `
        <div class="${margin} p-3 rounded-xl transition-all border border-transparent hover:border-blue-100">
            <div class="flex items-start gap-2">
                <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">${c.usuario.charAt(0)}</div>
                <div class="flex-1">
                    <p class="text-[10px] font-bold text-gray-800">${c.usuario} <span class="text-gray-400 font-normal ml-1">${new Date(c.created_at).toLocaleDateString()}</span></p>
                    <p class="text-xs text-gray-600 mt-0.5">${c.texto}</p>
                    ${bResposta}
                </div>
            </div>
        </div>`;
}

function prepararResposta(id, user) {
    comentPaiId = id;
    const input = document.getElementById('input-comentario');
    input.placeholder = `Respondendo a ${user}...`;
    input.focus();
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    if (!input.value) return;

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
