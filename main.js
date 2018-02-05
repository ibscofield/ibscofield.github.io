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

class GenererAnagramme {

	constructor() {
		this.motInitial = this.genererUnMot().join("");
    }
    
    genererUnMot(nombreDeLettre = 7, alphabet = ["E", "F" , "G", "H", 
                                                 "I", "J", "K",  "L", 
                                                 "M", "N", "O", "P", 
                                                 "Q", "R", "S", "R", 
                                                 "T", "U", "V", "W", 
                                                 "Y",  "Z"]) {

        const mot = [];

        for(let i = 0; i < nombreDeLettre; i++) {
            mot.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        }
        return mot;
    }


	estValide(m1, m2){
		var cl1 = this.compterLettres(m1);
		var cl2 = this.compterLettres(m2);
		for(var a in cl2){
			if(! (a in cl1)) {
				return false;
			}else if(cl1[a] < cl2[a]){
				return false;
			}
		}
		return true;
	}

	rajouterLettreEstValide(mv, lett){
		var m = mv + lett;
		return this.estValide(this.motInitial, m) && m.length<=7;
	}

	rajouterListeLettreEstValide(mv, listelettre){
		var res = [];
		for(var i = 0; i<listelettre.length; i++){
			if(this.rajouterLettreEstValide(mv, listelettre[i])){
				res.push(mv + listelettre[i]);
			}
		}
		return res;
	}

	rajouterListeLettreListeMotsEstValide(listeMotValide, listelettre){
		var res = [];
		for(var i = 0; i<listeMotValide.length; i++){
			var motsValidesAugmentes = this.rajouterListeLettreEstValide(listeMotValide[i], listelettre);
			for(var j = 0; j<motsValidesAugmentes.length; j++){
				res.push(motsValidesAugmentes[j]);
			}
		}
		return res;
	}

	generer(){
		var res = new Set();
		res.add("");
		var lettres = this.motInitial.split("");
		while(true){
			var liste = new Set(this.rajouterListeLettreListeMotsEstValide(Array.from(res), lettres));
			res.delete("");
			liste.delete("");
			if(liste.size == res.size){
				res = liste;
				break;
			}
			res = liste;
		}

		return res;
	}

	compterLettres(s){
		var res = {};
		for(var i = 0; i<s.length; i++){
			var c = s.charAt(i); // charAt permet de recuperer le caractère à une position donnée
			if(c in res){
				res[c]++; 
			} else {
				res[c] =1;
			}
		}
		return res;
	}
}

function exo2() {
    const g = new GenererAnagramme();
    const mot = g.motInitial;

    document.querySelector("#mot").textContent = mot;
    document.querySelector("#listeAnagramme").textContent = Array.from(g.generer()).join(" ");   
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
