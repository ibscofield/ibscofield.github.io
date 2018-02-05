// Exercice n°2: Dénombrement

class GenererAnagramme{

	constructor(){
		this.motInitial = '';
		for(var i = 0; i<7; i++){
			this.motInitial += this.genererLettreAleatoire();
		}
	} 

	genererLettreAleatoire(){
		var n = Math.floor(Math.random() * 4);
		return String.fromCharCode(65 + n); // va convertir les nombres en lettres
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
		return Array.from(res);
	}


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

