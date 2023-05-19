package com.fssm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "abscence")
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private User etudiant;

    @ManyToOne
    @JoinColumn(name = "sceance_id")
    private Sceance sceance;
    
    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;

    @Column(name = "date_absence")
    private String dateAbsence;

    @Column(name = "justification")
    private String justification;
    
    @Column(name = "status")
    private String status;

    public Absence() {}

    public Absence(User etudiant, Sceance sceance, String dateAbsence, String justification, String status) {
        this.etudiant = etudiant;
        this.sceance = sceance;
        this.dateAbsence = dateAbsence;
        this.justification=justification;
        this.status=status;
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(User etudiant) {
        this.etudiant = etudiant;
    }

    public Sceance getSceance() {
        return sceance;
    }

    public void setSceance(Sceance sceance) {
        this.sceance = sceance;
    }

    public String getDateAbsence() {
        return dateAbsence;
    }

    public void setDateAbsence(String dateAbsence) {
        this.dateAbsence = dateAbsence;
    }
    public void setJustification(String justification) {
    	this.justification=justification;
    }
    public String getJustification() {
    	return justification;
    }
    public void setStatus(String status) {
    	this.status=status;
    }
    public String getStatus() {
    	return status;
    }
}
