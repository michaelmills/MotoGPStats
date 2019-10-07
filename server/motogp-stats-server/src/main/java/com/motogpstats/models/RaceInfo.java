package com.motogpstats.models;

import com.motogpstats.models.domain.Circuit;
import com.motogpstats.models.domain.Race;
import com.motogpstats.models.domain.RaceResult;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RaceInfo {
	private Circuit circuit;
	private Race race;
	private RaceResult raceResult;
}
