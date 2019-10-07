package com.motogpstats.models;

import lombok.Builder;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Builder
@ToString
public class SessionResult {
	// date
	private LocalDate date;

	// circuit
	private String shortname;
	private String title;
	private String circuit;

	// category
	private String category;

	// session
	private String session;

	// results
	private List<String> results;
}
