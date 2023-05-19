package com.fssm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Data
@Table(name = "Profs")
public class Prof extends User {
	
	@Column(name = "departement")
    private String departement;

    public Prof() {
        super();
    }

    public Prof(String password, String nom, String prenom, String email,long id,int age,String tel,String adresse,String description, String departement,String role) {
        super(password, nom, prenom, email, id, age, tel, adresse, description,role);
        this.departement = departement;
    }

    // getters and setters
    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }
}

