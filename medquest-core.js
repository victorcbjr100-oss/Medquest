// --- SISTEMA DE COMENTÁRIOS (VERSÃO SUPORTE AVANÇADO) ---

async function carregarComentarios(questaoId) {
    const container = document.getElementById('container-comentarios');
    if (!container) return;

    try {
        const idBusca = String(questaoId);
        const { data, error } = await _supabase
            .from('comentarios')
            .select('*')
            .eq('questao_id', idBusca)
            .order('created_at', { ascending: true });

        if (error) throw error;

        container.innerHTML = data && data.length ? data.map(c => `
            <div class="bg-white/50 p-4 rounded-xl border border-gray-100 mb-2 shadow-sm">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-black text-blue-600 uppercase tracking-tighter">${c.usuario}</span>
                    <span class="text-[9px] text-gray-400 font-medium">${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p class="text-xs text-gray-700 leading-relaxed">${c.texto}</p>
            </div>`).join('') : '<p class="text-[10px] text-gray-400 italic py-6 text-center">Nenhum comentário clínico registrado.</p>';
            
    } catch (e) {
        console.error("Erro na carga de comentários:", e.message);
    }
}

async function enviarComentarioMaster(questaoId) {
    const input = document.getElementById('input-comentario');
    
    // Tenta capturar o ID de todas as formas possíveis para não falhar
    const idFinal = questaoId || 
                   (typeof questaoAtual !== 'undefined' && questaoAtual ? questaoAtual.id : null) || 
                   window.questaoIdAtual; // Backup caso você use variável global simples
    
    console.log("Tentativa de envio - Questão ID:", idFinal); // LOG DE DIAGNÓSTICO

    if (!input || !input.value.trim()) {
        alert("Digite um comentário antes de enviar.");
        return;
    }

    if (!idFinal) {
        console.error("ERRO: O sistema não conseguiu identificar qual questão está aberta.");
        alert("Erro técnico: ID da questão ausente. Tente recarregar a questão.");
        return;
    }

    try {
        const { error } = await _supabase
            .from('comentarios')
            .insert([{ 
                questao_id: String(idFinal), 
                usuario: 'Dr. Victor', 
                texto: input.value.trim() 
            }]);

        if (error) throw error;

        input.value = ''; // Limpa o campo
        console.log("✅ Comentário salvo com sucesso!");
        carregarComentarios(idFinal); // Atualiza a lista na hora
        
    } catch (e) {
        alert("Erro clínico ao salvar: " + e.message);
        console.error("Falha no Insert:", e);
    }
}
