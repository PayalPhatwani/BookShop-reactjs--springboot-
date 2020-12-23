package com.book.Service;

import com.book.Entities.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
	
	public Page<Book> findAll(Pageable page);
	
	public Book findById(Long id);
	
	public Book save(Book book);
	
	public Book update(Book book);
	
	public String deleteById(Long id);
	

}
