package com.book.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.Dao.BookDao;
import com.book.Entities.Book;

@Service
public class BookServiceImpl implements BookService {
	@Autowired
	BookDao bd;

	@Override
	public Page<Book> findAll(Pageable pageable) {
		return bd.findAll(pageable);
	}

	@Override
	public Book findById(Long id) {
		return bd.findById(id).get();
	}

	@Override
	public Book save(Book book) {
		bd.save(book);
		return book;
	}

	@Override
	public Book update(Book book) {
		bd.save(book);
		return book;
	}

	@Override
	public String deleteById(Long id) {
		bd.deleteById(id);
		return "deleted";
	}

}
