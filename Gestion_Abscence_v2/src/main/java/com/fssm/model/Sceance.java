package com.fssm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Sceance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cours", referencedColumnName = "id")
    private Cours cours;

    private String dateSceance;

    private String dateDebut;

    private String dateFin;
    
    public Sceance(Long id, Cours cours, String dateDebut, String dateFin, String dateSceance) {
    	this.id=id;
    	this.cours=cours;
    	this.dateSceance=dateSceance;
    	this.dateDebut=dateDebut;
    	this.dateFin=dateFin;
    }
    public Sceance() {
    	
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cours getCours() {
		return cours;
	}

	public void setCours(Cours cours) {
		this.cours = cours;
	}

	public String getDateSceance() {
		return dateSceance;
	}

	public void setDateSceance(String dateSceance) {
		this.dateSceance = dateSceance;
	}

	public String getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}

	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}
    

    // constructeurs, getters et setters
}