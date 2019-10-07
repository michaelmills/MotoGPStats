package com.motogpstats.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CircuitCrawl {
	private String shortname;
	private String title;
	private String circuit;
	private String sequence;
}
