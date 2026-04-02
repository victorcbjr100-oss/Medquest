// js/dashboard.js

async function sincronizarDashboard() {
    try {
        // 👤 usuário logado
        if (typeof getUser !== "function") {
            console.warn("auth.js não carregado");
            return;
        }

        const user = await getUser();
        if (!user) return;

        // 📊 buscar respostas do usuário (seguro)
        let respostas = [];
        try {
            const { data, error } = await supabaseClient
                .from('respostas_usuario')
                .select('*')
                .eq('user_id', user.id);

            if (!error && data) {
                respostas = data;
            } else {
                console.warn("Erro ao buscar respostas:", error?.message);
            }
        } catch (e) {
            console.warn("Tabela respostas_usuario ainda não pronta");
        }

        // 📈 cálculos
        const totalRespondidas = respostas.length;
        const totalAcertos = respostas.filter(r => r.acertou).length;
        const precisao = totalRespondidas > 0
            ? ((totalAcertos / totalRespondidas) * 100).toFixed(1)
            : 0;

        // 🧮 total de questões
        let totalBanco = 0;
        try {
            const { count, error } = await supabaseClient
                .from('questoes')
                .select('*', { count: 'exact', head: true });

            if (!error) {
                totalBanco = count || 0;
            } else {
                console.warn("Erro ao contar questões:", error.message);
            }
        } catch (e) {
            console.warn("Tabela questoes não acessível");
        }

        // 🖥️ atualizar tela (seguro)
        const elTotalBanco = document.getElementById("total-banco");
        const elTotal = document.getElementById("stat-total");
        const elAcertos = document.getElementById("stat-acertos");
        const elPrecisao = document.getElementById("stat-precisao");

        if (elTotalBanco) elTotalBanco.textContent = totalBanco;
        if (elTotal) elTotal.textContent = totalRespondidas;
        if (elAcertos) elAcertos.textContent = totalAcertos;
        if (elPrecisao) elPrecisao.textContent = `${precisao}%`;

    } catch (e) {
        console.error("Erro geral no dashboard:", e.message);
    }
}
