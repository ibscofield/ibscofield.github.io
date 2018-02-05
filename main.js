/************************
 * Exo 1 : Histogrammes
 *************************/

function exo1() {
    const valeursAleatoire = listeAleatoire(100, 0, 10);
    const effectifs = listeEffectifs(valeursAleatoire);
    const frequences = listeFrequences(effectifs);
    const densites = listeDensites(frequences, [1, 2, 4, 2, 1]);

    document.querySelector("#listeAleatoire").textContent = valeursAleatoire.join(" ");
    document.querySelector("#listeEffectifs").textContent = effectifs.join(" ");
    document.querySelector("#listeFrequences").textContent = frequences.join(" ");
    document.querySelector("#listeDensites").textContent = densites.join(" ");

    function listeAleatoire(taille, min = 0, max = 10) {
        const valeurs = [];

        // Génération de 100 nombre aléatoire
        function nombreAleatoire(min, max) {
            // On génère un nombre aléatoire
            const nombre = Math.random() * max;

            // on retourne un nombre avec deux chiffres maximums
            // derrière la virgule
            return nombre.toFixed(2);
        }

        for(let i = 0; i < taille; i++) {
            valeurs.push(nombreAleatoire(min, max));
        }

        return valeurs;
    }

    function listeEffectifs(valeurs) {
        const effectifs = [0, 0, 0, 0, 0];

        valeurs.forEach((valeur, index, tab) => {
            if (estDansIntervale(valeur, 0, 1)) {
                effectifs[0]++;
            } else if (estDansIntervale(valeur, 1, 3)) {
                effectifs[1]++;
            } else if (estDansIntervale(valeur, 3, 7)) {
                effectifs[2]++;
            } else if (estDansIntervale(valeur, 7, 9)) {
                effectifs[3]++;
            } else if (estDansIntervale(valeur, 9, 10)) {
                effectifs[4]++;
            }
        });

        function estDansIntervale(nombre, min, max) {
            return nombre >= min && nombre < max;
        }

        return effectifs;
    }

    function listeFrequences(effectifs) {
        const effectifTotal = effectifs.reduce((total, valeurCourant) => total + valeurCourant);
        return effectifs.map(x => (x / effectifTotal).toFixed(2));
    }

    function listeDensites(frequences, amplitudes) {
        return frequences.map((valeur, index) => (valeur/amplitudes[index]).toFixed(2));
    }
}

/************************
 * Exo 2 : Dénombrement
 *************************/
function exo2() {
    const mot = genererUnMot();

    //listeAnagramme(mot);

    document.querySelector("#mot").textContent = mot.join("");

    function genererUnMot(nombreDeLettre = 7, alphabet = ["E", "F" , "G", "H", "I", "J", "K",
                                                          "L", "M", "N", "O", "P", "Q", "R", 
                                                          "S", "R", "T", "U", "V", "W", "Y", 
                                                          "Z"]) {

        const mot = [];

        for(let i = 0; i < nombreDeLettre; i++) {
            mot.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        }
        return mot;
    }

    /*
    function listeAnagramme(mot) {
        for(let i = 0; i < mot.length; i++) {
            let copy = [...mot];
            copy.splice(i, 1);
            let r = listeMotsValide(mot[i], copy);
            console.log(r);
        }
    }

    function listeMotsValide(motValide, listeLettre) {
        if (motValide.length >= 7 ) return motValide;

        const listeValide = [];

        for(let i = 0; i < listeLettre.length; i++) {
            let copy = [...listeLettre];

            const mot = [...motValide, copy.splice(i, 1)];

            console.log(mot);

            if(estValide(mot)) {
                listeValide.push(mot);
            } 

            listeMotsValide(listeValide, copy);
        }

    }
    */


    // Verfie si un mot est valide
    function estValide(motAverifier) {
        const copy = [...mot]; 

        for(let i = 0; i < motAverifier.length; i++) {
            var index = copy.indexOf(motAverifier[i]);
            if (index != -1) {
                copy.splice(index, 1);
            } else {
                return false;
            }
        }

        return true;
    }   
}

/************************
 * AUTRE
 *************************/
const buttons = document.querySelectorAll("button");
buttons[0].addEventListener("click", (event) => {
    exo1();
});

buttons[1].addEventListener("click", (event) => {
    exo2();
});

document.addEventListener('DOMContentLoaded', function(){ 
    exo1();
    exo2();
}, false);
