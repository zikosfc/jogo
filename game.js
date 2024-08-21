let playerHealth = 100;
let enemyHealth = 100;
const playerHealthDisplay = document.getElementById("player-health");
const enemyHealthDisplay = document.getElementById("enemy-health");
const playerHealthBar = document.getElementById("player-health-bar");
const enemyHealthBar = document.getElementById("enemy-health-bar");
const messageBox = document.getElementById("message-box");

const attackBtn = document.getElementById("attack-btn");
const specialBtn = document.getElementById("special-btn");
const defendBtn = document.getElementById("defend-btn");

let specialCooldown = false;

attackBtn.addEventListener("click", playerAttack);
specialBtn.addEventListener("click", specialAbility);
defendBtn.addEventListener("click", playerDefend);

function updateHealthBars() {
    playerHealthBar.style.width = playerHealth + "%";
    enemyHealthBar.style.width = enemyHealth + "%";
}

function playerAttack() {
    const playerDamage = Math.floor(Math.random() * 20) + 10;
    const enemyDamage = Math.floor(Math.random() * 15) + 5;

    enemyHealth -= playerDamage;
    if (enemyHealth < 0) enemyHealth = 0;
    updateHealthBars();

    messageBox.textContent = `Você atacou e causou ${playerDamage} de dano ao inimigo!`;

    setTimeout(() => {
        if (enemyHealth > 0) {
            playerHealth -= enemyDamage;
            if (playerHealth < 0) playerHealth = 0;
            updateHealthBars();

            messageBox.textContent += ` O inimigo contra-atacou e causou ${enemyDamage} de dano!`;

            checkGameOver();
        } else {
            messageBox.textContent = `Você venceu a batalha!`;
        }
    }, 1000);
}

function specialAbility() {
    if (!specialCooldown) {
        const playerDamage = Math.floor(Math.random() * 40) + 20;
        enemyHealth -= playerDamage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateHealthBars();

        messageBox.textContent = `Você usou uma Habilidade Especial e causou ${playerDamage} de dano ao inimigo!`;

        specialCooldown = true;
        specialBtn.disabled = true;

        setTimeout(() => {
            specialCooldown = false;
            specialBtn.disabled = false;
            specialBtn.textContent = "Habilidade Especial";
        }, 5000);  // Cooldown de 5 segundos
    }
}

function playerDefend() {
    const enemyDamage = Math.floor(Math.random() * 10) + 5;

    playerHealth -= enemyDamage;
    if (playerHealth < 0) playerHealth = 0;
    updateHealthBars();

    messageBox.textContent = `Você se defendeu e ainda recebeu ${enemyDamage} de dano do inimigo.`;

    checkGameOver();
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
