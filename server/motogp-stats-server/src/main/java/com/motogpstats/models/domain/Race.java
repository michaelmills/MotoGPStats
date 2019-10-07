package com.motogpstats.models.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "race")
public class Race {

	@Getter(onMethod_ = {@Id, @GeneratedValue(strategy = IDENTITY),
			@Column(name = "id")})
	private int id;

	@Getter(onMethod_ = {@Column(name = "date")})
	private LocalDate date;

	@Getter(onMethod_ = {@ManyToOne, @JoinColumn(name = "circuit_key")})
	private Circuit circuit;

	@Getter(onMethod_ = {
			@OneToMany(mappedBy = "race", fetch = FetchType.EAGER),
			@OrderBy(value = "position ASC NULLS LAST, SUBSTRING_INDEX(time, ' ', 1) DESC")})
	private Set<RaceResult> results;
}
