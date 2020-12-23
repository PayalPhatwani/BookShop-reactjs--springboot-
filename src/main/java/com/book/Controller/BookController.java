package com.book.Controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.book.Entities.Book;
import com.book.Service.BookServiceImpl;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
	@Autowired
	BookServiceImpl bs;

	@GetMapping
	public ResponseEntity<Page<Book>> findAll(Pageable pageable) {
		return new ResponseEntity<>(bs.findAll(pageable), HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<Book> findById(@PathVariable Long id) {
		return new ResponseEntity<>(bs.findById(id), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Book> save(@RequestBody Book book) {
		return new ResponseEntity<>(bs.save(book), HttpStatus.CREATED);
	}

	@PutMapping()
	public ResponseEntity<Book> update(@RequestBody Book book) {
		return new ResponseEntity<>(bs.update(book), HttpStatus.OK);
	}

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id) {
		return new ResponseEntity<>(bs.deleteById(id), HttpStatus.OK);
	}
}
