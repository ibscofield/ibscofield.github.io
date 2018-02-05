// Exercice n°2: Dénombrement

class GenererAnagramme{

	/* Creer le mot initial avec 7 lettres en utilisants A, B, C, D au hasard */
	constructor(){
		this.motInitial = '';
		for(var i = 0; i<7; i++){
			this.motInitial += this.genererLettreAleatoire();
		}
	} 

	/* Genere des lettres aleatoires entre A et D */
	genererLettreAleatoire(){
		var n = Math.floor(Math.random() * 4);
		return String.fromCharCode(65 + n); // va convertir les nombres en lettres
	}

	/* Verifier si le mot m2 peut etre deduis du mot m1 */
	estValide(m1, m2){
		var cl1 = this.compterLettres(m1);
		var cl2 = this.compterLettres(m2);
		for(var a in cl2){
			// m2 contient une lettre qui n est pas dans m1
			if(! (a in cl1)) {
				return false;
			// m2 contient une lettre qui est plus present dans m2 que dans m1
			}else if(cl1[a] < cl2[a]){
				return false;
			}
		}
		return true;
	}

	/* Verifier si m2 restera valide apres le rajout de lettre a la fin*/
	rajouterLettreEstValide(mv, lett){
		var m = mv + lett;
		return this.estValide(this.motInitial, m) && m.length<=7;
	}

	/* Renvoi une liste des mots valide contruis par le rajout des lettre qui sont dans liste lettre a la fin de m2 */
	rajouterListeLettreEstValide(mv, listelettre){
		var res = [];
		for(var i = 0; i<listelettre.length; i++){
			if(this.rajouterLettreEstValide(mv, listelettre[i])){
				res.push(mv + listelettre[i]);
			}
		}
		return res;
	}

	/* Creer des mots valide apartir de listeMotValide et listelettre*/
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

	/* Renvoi tout les anagrammes de motInitial */
	generer(){
		var res = new Set();
		res.add("");
		var lettres = this.motInitial.split("");
		while(true){
			var liste = new Set(this.rajouterListeLettreListeMotsEstValide(Array.from(res), lettres));
			res.delete("");
			liste.delete("");
			/* Si on ne peut plus trouver des nouveaux mot valide */
			if(liste.size == res.size){
				res = liste;
				break;
			}
			res = liste;
		}
		return Array.from(res);
	}

	/**
		Prend un mot en parametre, et renvoie un objet avec le nb d'occurence de chaque lettre
		Eg : compterLettres('google') donne {g:2, o: 2, l: 1, e: 1}
	*/
	compterLettres(s){
		var res = {};
		for(var i = 0; i<s.length; i++){
			var c = s.charAt(i); // charAt permet de recuperer le caractère à une position donnée
			if(c in res){
				res[c]++; 
			}else{
				res[c] =1;
			}
		}
		return res;
	}


	
}

