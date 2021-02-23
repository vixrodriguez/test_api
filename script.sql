create database library;

\connect library;

create table books
(
	book_id bigserial not null
		constraint books_pk
			primary key,
	title text not null,
	isbn text,
	created_at timestamp,
	updated_at timestamp
);

create unique index books_isbn_uindex
	on books (isbn);

create table authors
(
	author_id bigserial not null
		constraint authors_pk
			primary key,
	name TEXT not null,
	birthday date,
	perish_date date,
	created_at timestamp,
	updated_at timestamp
);

create table authors_books
(
	author_book_id bigserial not null
		constraint authors_books_pk
			primary key,
	author_id bigint not null,
	book_id bigint not null,
	name text not null,
	created_at timestamp,
	updated_at timestamp
);

alter table authors_books
	add constraint authors_books_books_book_id_fk
		foreign key (book_id) references books;

alter table authors_books
	add constraint authors_books_authors_author_id_fk
		foreign key (author_id) references authors;


