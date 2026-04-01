// js/supabase.js

// ⚠️ CONFIGURE AQUI
const S_URL = 'https://xkhwfudjcqmbhcdkpewr.supabase.co';
const S_KEY = 'SUA_ANON_KEY_AQUI'; // coloque sua anon key real

// 🔌 Cria cliente global do Supabase
const supabaseClient = supabase.createClient(S_URL, S_KEY);

// 🛡️ Função opcional para checar conexão
async function testarConexao() {
    try {
        const { data, error } = await supabaseClient.from('questoes').select('id').limit(1);

        if (error) throw error;

        console.log("✅ Supabase conectado com sucesso");
        return true;

    } catch (e) {
        console.error("❌ Erro ao conectar com Supabase:", e.message);
        return false;
    }
}

// 👤 Função auxiliar para pegar usuário (fallback caso auth.js falhe)
async function getUserSafe() {
    try {
        const { data } = await supabaseClient.auth.getUser();
        return data.user;
    } catch {
        return null;
    }
}
