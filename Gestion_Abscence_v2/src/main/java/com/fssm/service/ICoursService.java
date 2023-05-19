package com.fssm.service;

import java.util.List;

import com.fssm.model.Cours;

public interface ICoursService {
	
	public void save(Cours cours);
	
	public List<Cours> findAll();
	
	public Cours findById(Long id);
	
	public void delete(Long id);
	
	public List<Cours> findByProfId(Long id);
	
	public List<Cours> findByNom(String nom);

	List<Cours> getAllCours();

	Cours getCoursById(Long id);

	Cours saveOrUpdateCours(Cours cours);

	void deleteCours(Long id);

}