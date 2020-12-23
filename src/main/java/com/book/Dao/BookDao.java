package com.book.Dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.book.Entities.Book;

public interface BookDao extends JpaRepository<Book,Long> {

}
