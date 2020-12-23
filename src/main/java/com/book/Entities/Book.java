package com.book.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String title;
	private String author;
	private String coverPhotoUrl;
	private Long isbnNumber;
	private Double price;
	private String language;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getCoverPhotoUrl() {
		return coverPhotoUrl;
	}
	public void setCoverPhotoUrl(String coverPhotoUrl) {
		this.coverPhotoUrl = coverPhotoUrl;
	}
	public Long getIsbnNumber() {
		return isbnNumber;
	}
	public void setIsbnNumber(Long isbnNumber) {
		this.isbnNumber = isbnNumber;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	@Override
	public String toString() {
		return "Book [id=" + id + ", title=" + title + ", author=" + author + ", coverPhotoUrl=" + coverPhotoUrl
				+ ", isbnNumber=" + isbnNumber + ", price=" + price + ", language=" + language + "]";
	}
	public Book(Long id, String title, String author, String coverPhotoUrl, Long isbnNumber, Double price,
			String language) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.coverPhotoUrl = coverPhotoUrl;
		this.isbnNumber = isbnNumber;
		this.price = price;
		this.language = language;
	}
	public Book() {
		super();
		
	}
	
	
}
