package com.motogpstats.models;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class SeasonCrawl {
	private List<Map<String, String>> unconvertedSchedule = new ArrayList<>();
	private List<CircuitCrawl> races = new ArrayList<>();
	private Integer year;

	@JsonAnySetter
	public void setDynamicProperty(String name, Map<String, String> map) {
		unconvertedSchedule.add(map);
	}

	public void addRace(CircuitCrawl circuitCrawl) {
		races.add(circuitCrawl);
	}
}
