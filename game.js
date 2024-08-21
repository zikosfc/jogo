let playerHealth = 100;
let enemyHealth = 100;
const playerHealthDisplay = document.getElementById("player-health");
const enemyHealthDisplay = document.getElementById("enemy-health");
const messageBox = document.getElementById("message-box");

document.getElementById("attack-btn").addEventListener("click", function() {
    playerAttack();
});

document.getElementById("defend-btn").addEventListener("click", function() {
    playerDefend();
});

function playerAttack() {
    const playerDamage = Math.floor(Math.random() * 20) + 5;
    const enemyDamage = Math.floor(Math.random() * 20) + 5;

    enemyHealth -= playerDamage;
    if (enemyHealth < 0) enemyHealth = 0;
    enemyHealthDisplay.textContent = enemyHealth;

    messageBox.textContent = `Você atacou e causou ${playerDamage} de dano ao inimigo!`;

    setTimeout(() => {
        if (enemyHealth > 0) {
            playerHealth -= enemyDamage;
            if (playerHealth < 0) playerHealth = 0;
            playerHealthDisplay.textContent = playerHealth;

            messageBox.textContent += ` O inimigo contra-atacou e causou ${enemyDamage} de dano!`;

            checkGameOver();
        } else {
            messageBox.textContent = `Você venceu a batalha!`;
        }
    }, 1000);
}

function playerDefend() {
    const enemyDamage = Math.floor(Math.random() * 10) + 5;

    playerHealth -= enemyDamage;
    if (playerHealth < 0) playerHealth = 0;
    playerHealthDisplay.textContent = playerHealth;

    messageBox.textContent = `Você se defendeu, mas ainda recebeu ${enemyDamage} de dano do inimigo.`;

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
    document.getElementById("attack-btn").disabled = true;
    document.getElementById("defend-btn").disabled = true;
}
