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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rider")
public class Rider {
	@Getter(onMethod_ = {@Id, @GeneratedValue(strategy = IDENTITY),
			@Column(name = "id")})
	private int id;

	@Getter(onMethod_ = {@Column(name = "name")})
	private String name;

	@Getter(onMethod_ = {@Column(name = "nation")})
	private String nation;

	@Getter(onMethod_ = {@Column(name = "number")})
	private int number;

	@Getter(onMethod_ = {@Column(name = "team")})
	private String team;

	@Getter(onMethod_ = {@Column(name = "bike")})
	private String bike;
}
