package com.motogpstats.models.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "circuit")
public class Circuit {

	@Getter(onMethod_ = {@Id, @GeneratedValue(strategy = IDENTITY),
			@Column(name = "id")})
	private int id;

	@Getter(onMethod_ = {@Column(name = "code")})
	private String code;

	@Getter(onMethod_ = {@Column(name = "name")})
	private String name;

	@Getter(onMethod_ = {@Column(name = "title")})
	private String title;
}
