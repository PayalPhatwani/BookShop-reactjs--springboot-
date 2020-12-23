package com.book;

import com.book.Dao.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookRestApiApplication {
@Autowired
	BookDao bd1;
	public static void main(String[] args) {
		
		SpringApplication.run(BookRestApiApplication.class, args);
	}

	
}
