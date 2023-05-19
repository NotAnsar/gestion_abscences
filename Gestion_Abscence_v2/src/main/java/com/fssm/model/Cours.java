package com.fssm.model;

import jakarta.persistence.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Cours {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    private String nom;

    @ManyToOne
    @JoinColumn(name = "id_prof", referencedColumnName = "id")
    private User prof;

	public Cours(Long id, String nom, User prof) {
		super();
		this.id = id;
		this.nom = nom;
		this.prof = prof;
	}
	public Cours() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return nom;
	}

	public void setName(String nom) {
		this.nom = nom;
	}

	public User getProf() {
		return prof;
	}

	public void setProf(User prof) {
		this.prof = prof;
	}



    // constructeurs, getters et setters
}
