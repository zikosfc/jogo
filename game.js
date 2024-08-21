let playerHealth = 100;
let enemyHealth = 100;
let specialCooldown = false;

const playerHealthDisplay = document.getElementById("player-health");
const enemyHealthDisplay = document.getElementById("enemy-health");
const playerHealthBar = document.getElementById("player-health-bar");
const enemyHealthBar = document.getElementById("enemy-health-bar");
const messageBox = document.getElementById("message-box");

const attackBtn = document.getElementById("attack-btn");
const specialBtn = document.getElementById("special-btn");
const defendBtn = document.getElementById("defend-btn");

attackBtn.addEventListener("click", playerAttack);
specialBtn.addEventListener("click", specialAbility);
defendBtn.addEventListener("click", playerDefend);

function updateHealthBars() {
    const playerHealthPercent = (playerHealth / 100) * 100;
    const enemyHealthPercent = (enemyHealth / 100) * 100;

    playerHealthBar.style.width = playerHealthPercent + "%";
    enemyHealthBar.style.width = enemyHealthPercent + "%";
}

function playerAttack() {
    if (enemyHealth > 0 && playerHealth > 0) {
        const playerDamage = Math.floor(Math.random() * 15) + 10;

        // Aplica o dano ao inimigo
        enemyHealth -= playerDamage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateHealthBars();
        messageBox.textContent = `Você usou "Ataque Rápido" e causou ${playerDamage} de dano ao inimigo!`;

        // Inimigo ataca após um breve atraso
        setTimeout(() => {
            if (enemyHealth > 0) {
                // O inimigo causa o mesmo dano que o jogador
                playerHealth -= playerDamage;
                if (playerHealth < 0) playerHealth = 0;
                updateHealthBars();

                messageBox.textContent += ` O inimigo usou "Ataque Rápido" e causou ${playerDamage} de dano em você!`;
                checkGameOver();
            } else {
                messageBox.textContent = `Você derrotou o inimigo com "Ataque Rápido"!`;
                disableButtons();
            }
        }, 1000);
    }
}

function specialAbility() {
    if (!specialCooldown && enemyHealth > 0) {
        const playerDamage = Math.floor(Math.random() * 30) + 20;

        // Aplica o dano ao inimigo
        enemyHealth -= playerDamage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateHealthBars();
        messageBox.textContent = `Você usou "Explosão de Energia" e causou ${playerDamage} de dano ao inimigo!`;

        // Inimigo ataca após um breve atraso
        setTimeout(() => {
            if (enemyHealth > 0) {
                // O inimigo causa o mesmo dano que o jogador
                playerHealth -= playerDamage;
                if (playerHealth < 0) playerHealth = 0;
                updateHealthBars();

                messageBox.textContent += ` O inimigo usou "Explosão de Energia" e causou ${playerDamage} de dano em você!`;
                checkGameOver();
            } else {
                messageBox.textContent = `Você derrotou o inimigo com "Explosão de Energia"!`;
                disableButtons();
            }
        }, 1000);

        specialCooldown = true;
        specialBtn.disabled = true;

        setTimeout(() => {
            specialCooldown = false;
            specialBtn.disabled = false;
            specialBtn.textContent = "Habilidade Especial";
        }, 10000);  // Cooldown de 10 segundos
    }
}

function playerDefend() {
    if (playerHealth > 0 && enemyHealth > 0) {
        const reducedDamage = Math.floor(Math.random() * 10) + 5;

        // Dano reduzido aplicado ao jogador
        playerHealth -= reducedDamage;
        if (playerHealth < 0) playerHealth = 0;
        updateHealthBars();

        messageBox.textContent = `Você usou "Defesa Aumentada" e recebeu apenas ${reducedDamage} de dano.`;

        checkGameOver();
    }
}

function checkGameOver() {
    if (playerHealth <= 0) {
        messageBox.textContent = "Você perdeu a batalha!";
        disableButtons();
    } else if (enemyHealth <= 0) {
        messageBox.textContent = "Você venceu a batalha!";
        disableButtons();
    }
}

function disableButtons() {
    attackBtn.disabled = true;
    specialBtn.disabled = true;
    defendBtn.disabled = true;
}
