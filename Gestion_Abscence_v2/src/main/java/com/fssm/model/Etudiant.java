package com.fssm.model;

import jakarta.persistence.Entity;


@Entity
public class Etudiant extends User {
    private String filiere;

	public String getFiliere() {
		return filiere;
	}

	public void setFiliere(String filiere) {
		this.filiere = filiere;
	}

    public Etudiant(String filiere) {
    	super();
    	this.filiere=filiere;
    }
    public Etudiant() {
    }
}
