export const state = {
    data: JSON.parse(localStorage.getItem('defesaDigitalProgress')) || { 
        score: 0, 
        completedLevels: [],
        unlockedAvatars: ['default'],
        currentAvatar: 'default',
        hasStarted: false 
    },

    save() {
        localStorage.setItem('defesaDigitalProgress', JSON.stringify(this.data));
    },

    initTheme() {
        if(localStorage.getItem('defesaDigitalTema') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    },

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('defesaDigitalTema', isDark ? 'dark' : 'light');
    },

    reset() {
        if(confirm("Tem certeza que deseja apagar todo o seu progresso e recomeçar do zero?")) {
            localStorage.removeItem('defesaDigitalProgress');
            location.reload();
        }
    }
};

// Corrige saves antigos que não tinham as propriedades novas da loja
if (!state.data.unlockedAvatars) {
    state.data.unlockedAvatars = ['default'];
    state.data.currentAvatar = 'default';
    state.data.hasStarted = false;
    state.save();
}