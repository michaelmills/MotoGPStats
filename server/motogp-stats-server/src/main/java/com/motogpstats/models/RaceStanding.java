package com.motogpstats.models;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@ToString
public class RaceStanding {
	@Getter
	private int position;

	@Getter
	private int points;

	@Getter
	private int riderNumber;

	@Getter
	private String riderName;

	@Getter
	private String nationality;

	@Getter
	private String team;

	@Getter
	private String bike;

	@Getter
	private String time;
}
