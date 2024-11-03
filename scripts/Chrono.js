let chronoTexte;
let monTimer;
let chrono = 0;

export function Chrono(scene) {

    chronoTexte = scene.add.text(50, 100, "Chrono: 0", {
        fontSize: "24px",
        fill: "#FFFFFF"
    });
    monTimer = scene.time.addEvent({
        delay: 1000,
        callback: compteUneSeconde(chrono, chronoTexte),
        callbackScope: scene,
        loop: true
    });
    chronoTexte.setScrollFactor(0);
    chronoTexte.setDepth(1);
}

function compteUneSeconde() {
    chrono = chrono + 1;
    chronoTexte.setText("Chrono: "+ chrono); 
}  