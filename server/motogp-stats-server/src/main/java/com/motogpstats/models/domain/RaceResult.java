package com.motogpstats.models.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.persistence.Table;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Builder
@ToString(exclude = "race")
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "race_result")
public class RaceResult {

	@Getter(onMethod_ = {@Id, @GeneratedValue(strategy = IDENTITY),
			@Column(name = "id")})
	private int id;

	@Getter(onMethod_ = {@Column(name = "position")})
	private Integer position;

	@Getter(onMethod_ = {@Column(name = "points")})
	private Integer points;

	@Getter(onMethod_ = {@Column(name = "time")})
	private String time;

	@Getter(onMethod_ = {@ManyToOne, @JoinColumn(name = "rider_key")})
	private Rider rider;

	@Getter(onMethod_ = {
			@ManyToOne(fetch = FetchType.LAZY),
			@JoinColumn(name = "race_key"),
			@JsonIgnore})
	private Race race;
}
