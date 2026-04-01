// js/dashboard.js

async function sincronizarDashboard() {
    try {
        // 👤 Pega usuário logado
        const user = await getUser();
        if (!user) return;

        // 📊 Busca respostas do usuário
        const { data, error } = await supabaseClient
            .from('respostas_usuario')
            .select('*')
            .eq('user_id', user.id);

        if (error) throw error;

        const respostas = data || [];

        // 📈 Calcula estatísticas
        const totalRespondidas = respostas.length;
        const totalAcertos = respostas.filter(r => r.acertou).length;
        const precisao = totalRespondidas > 0
            ? ((totalAcertos / totalRespondidas) * 100).toFixed(1)
            : 0;

        // 🧮 Total de questões no banco
        const { count } = await supabaseClient
            .from('questoes')
            .select('*', { count: 'exact', head: true });

        // 🖥️ Atualiza UI
        const totalBancoEl = document.getElementById("total-banco");
        const totalEl = document.getElementById("stat-total");
        const acertosEl = document.getElementById("stat-acertos");
        const precisaoEl = document.getElementById("stat-precisao");

        if (totalBancoEl) totalBancoEl.textContent = count || 0;
        if (totalEl) totalEl.textContent = totalRespondidas;
        if (acertosEl) acertosEl.textContent = totalAcertos;
        if (precisaoEl) precisaoEl.textContent = `${precisao}%`;

    } catch (e) {
        console.error("Erro no dashboard:", e.message);
    }
}
