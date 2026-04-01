// js/auth.js

// 🔐 LOGIN
async function login() {
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    if (!emailInput || !senhaInput) {
        alert("Campos de login não encontrados.");
        return;
    }

    const email = emailInput.value;
    const senha = senhaInput.value;

    if (!email || !senha) {
        alert("Preencha email e senha.");
        return;
    }

    try {
        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) throw error;

        // Redireciona após login
        window.location.href = "dashboard.html";

    } catch (e) {
        console.error("Erro no login:", e.message);
        alert("Email ou senha inválidos.");
    }
}

// 📝 CADASTRO (opcional, mas já pronto)
async function cadastrar() {
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");

    if (!emailInput || !senhaInput) {
        alert("Campos de cadastro não encontrados.");
        return;
    }

    const email = emailInput.value;
    const senha = senhaInput.value;

    if (!email || !senha) {
        alert("Preencha email e senha.");
        return;
    }

    try {
        const { error } = await supabaseClient.auth.signUp({
            email: email,
            password: senha
        });

        if (error) throw error;

        alert("Cadastro realizado! Agora faça login.");

    } catch (e) {
        console.error("Erro no cadastro:", e.message);
        alert("Erro ao cadastrar.");
    }
}

// 👤 PEGAR USUÁRIO LOGADO
async function getUser() {
    try {
        const { data, error } = await supabaseClient.auth.getUser();

        if (error) throw error;

        return data.user;

    } catch (e) {
        console.error("Erro ao obter usuário:", e.message);
        return null;
    }
}

// 🚪 LOGOUT
async function logout() {
    try {
        await supabaseClient.auth.signOut();
        window.location.href = "login.html";
    } catch (e) {
        console.error("Erro ao sair:", e.message);
    }
}

// 🛡️ PROTEGER PÁGINA (usar em páginas privadas)
async function protegerRota() {
    const user = await getUser();

    if (!user) {
        window.location.href = "login.html";
    }
}
