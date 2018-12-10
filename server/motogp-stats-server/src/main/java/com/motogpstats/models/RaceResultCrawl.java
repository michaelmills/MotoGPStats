package com.motogpstats.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Builder
@ToString
public class RaceResultCrawl {
	@Getter
	private String name;

	@Getter
	private LocalDate date;

	@Getter
	@Singular
	private List<RaceStanding> results;
}
