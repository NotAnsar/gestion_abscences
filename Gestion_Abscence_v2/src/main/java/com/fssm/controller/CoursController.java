package com.fssm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fssm.exception.ResourceNotFoundException;
import com.fssm.model.Cours;
import com.fssm.model.User;
import com.fssm.repository.CoursRepository;
import com.fssm.repository.ProfRepository;
import com.fssm.repository.UserRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class CoursController {

    @Autowired
    private CoursRepository coursRepository;
    @Autowired
    private ProfRepository profRepository;
    @Autowired
	private UserRepository userRepository;
    
    @Autowired
    //private CoursService coursService;
    
    //@GetMapping("/cours")
    //public String getAllCours(Model model) {
      //  model.addAttribute("coursList", coursService.findAllCoursWithProfInfo());
        //return "cours";
    //}

    // Get All Modules
    @GetMapping("/cours")
    public List<Map<String, Object>> getAllAbscences() {
        return coursRepository.findAllCoursesWithDetails();
	}
    @GetMapping("/coursprofs")
    public List<Cours> getAllCoursProfs() {
        return coursRepository.findAll();
    }

    // Create a new Module
    @PostMapping("/cours")
    public Cours createCours(@Valid @RequestBody Cours cours) {
    	Cours cours2=new Cours();
    	
    	cours2.setProf(userRepository.findById(cours.getId()).get());
    	cours2.setNom(cours.getNom());
    	cours2.setName(cours.getNom());
    	
        return coursRepository.save(cours2);
    }

    // Get a Single Module
    @GetMapping("/cours/{id}")
    public Cours getCoursById(@PathVariable(value = "id") long coursId) {
        return coursRepository.findById(coursId);
    }

    // Update a Module
    @PutMapping("/cours/{id}")
	public ResponseEntity<Cours> updateCours(@PathVariable(value = "id") long coursId
			, @RequestBody Cours coursDetails) {
		Cours cours =  coursRepository.findById(coursId);
		System.out.println(coursDetails);
		cours.setId(coursId);
		cours.setNom(coursDetails.getNom());
		cours.setProf(userRepository.findById(coursDetails.getId()).get());
		coursRepository.save(cours);
		return ResponseEntity.ok().body(cours);
	}

    // Delete a Module
    @DeleteMapping("/cours/{id}")
    public ResponseEntity<?> deleteCours(@PathVariable(value = "id") long coursId) {
        coursRepository.deleteById(coursId);
        return ResponseEntity.ok().build();
    }

}

