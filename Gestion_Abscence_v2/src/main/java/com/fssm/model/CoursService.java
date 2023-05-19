package com.fssm.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fssm.repository.CoursRepository;
import com.fssm.service.ICoursService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CoursService implements ICoursService {
    
    @Autowired
    private CoursRepository coursRepository;

    @Override
    public List<Cours> getAllCours() {
        return coursRepository.findAll();
    }

    @Override
    public Cours getCoursById(Long id) {
        return coursRepository.findById(id).orElse(null);
    }

    @Override
    public Cours saveOrUpdateCours(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public void deleteCours(Long id) {
        coursRepository.deleteById(id);
    }

	@Override
	public void save(Cours cours) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Cours> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cours findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Cours> findByProfId(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Cours> findByNom(String nom) {
		// TODO Auto-generated method stub
		return null;
	}
	public List<Map<String, Object>> findAllCoursWithProfInfo() {
	    List<Map<String, Object>> coursList = new ArrayList<>();
	    List<Cours> cours = coursRepository.findAll();

	    for (Cours c : cours) {
	        Map<String, Object> coursMap = new HashMap<>();
	        coursMap.put("id", c.getId());
	        coursMap.put("nom", c.getNom());
	        coursMap.put("idProf", c.getProf().getId());
	        coursMap.put("nomProf", c.getProf().getNom() + " " + c.getProf().getPrenom());
	        coursList.add(coursMap);
	    }

	    return coursList;
	}
	







}

