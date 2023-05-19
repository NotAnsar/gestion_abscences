package com.fssm.controller;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.fssm.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class UserController {


	@Autowired
	private CoursRepository coursRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/user")
	public ResponseEntity<User> getUser(Authentication authentication) {
	    String email = authentication.name();
	    User user = userRepository.findByEmail(email);
	    return ResponseEntity.ok().body(user);
	}
	
	
	
	//@GetMapping("/login")
	//public ResponseEntity<?> getUserByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
//
	    //User user = userRepository.findByEmailAndPassword(email, password);

	//    if (user == null) {
	  //      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    //}



	    //return ResponseEntity.ok(userInfo);
	//}
	@PostMapping("/login")
	public ResponseEntity<?> getUserByEmailAndPassword(@RequestBody User user) {
		User userr = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (userr == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResourceNotFoundException("Utilisateur introuvable "));
			
		}
		return ResponseEntity.ok(userr);
	}
	
	// create get all users api
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	// create user
	@PostMapping("/users")
	public User addUser(@RequestBody User user) {
	    return userRepository.save(user);
	}
	
	// get user by id
	@GetMapping("/users/{id}")
	public Optional<User> getUserById(@PathVariable(value = "id") Long userId){
		//User user =  userRepository.findById(userId)
			//	.orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable pour cet id :: "+userId));
		//return ResponseEntity.ok().body(user);
		return userRepository.findById(userId);
	}
	
	// update user
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable(value = "id") long userId
			, @RequestBody User userDetails) throws ResourceNotFoundException {
		User user =  userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable pour cet id :: "+userId));
		user.setNom(userDetails.getNom());
		user.setPrenom(userDetails.getPrenom());
		user.setEmail(userDetails.getEmail());
		user.setAdresse(userDetails.getAdresse());
		user.setAge(userDetails.getAge());
		user.setTel(userDetails.getTel());
		user.setDescription(userDetails.getDescription());
		user.setPassword(userDetails.getPassword());
		user.setRole(userDetails.getRole());
		userRepository.save(user);
		return ResponseEntity.ok().body(user);
	}
	
	// delete user by id
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") long userId) throws ResourceNotFoundException {
		User user =  userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable pour cet id :: "+userId));
		userRepository.deleteById(userId);
		return ResponseEntity.ok().body(user);		
	}
	



	
}
