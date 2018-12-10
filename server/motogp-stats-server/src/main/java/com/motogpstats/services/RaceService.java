package com.motogpstats.services;

import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.RaceStanding;
import com.motogpstats.models.domain.Race;
import com.motogpstats.models.domain.Rider;
import com.motogpstats.repositories.RaceRepository;
import com.motogpstats.repositories.RiderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RaceService {

	@Autowired
	private RiderRepository riderRepository;

	@Autowired
	private RaceRepository raceRepository;

	public void saveRaceResults(RaceResultCrawl raceResultCrawl) {
		log.info("Saving race results: {}", raceResultCrawl);

		saveRace(raceResultCrawl);
		saveRacer(raceResultCrawl);
	}

	private void saveRace(RaceResultCrawl raceResultCrawl) {
		Race race = Race
				.builder()
				.location(raceResultCrawl.getName())
				.date(raceResultCrawl.getDate())
				.build();

		try {
			Race saved = raceRepository.save(race);
			log.debug("Saved Race: {}", saved);
		} catch (Exception e) {
			log.debug("{}", e);
		}
	}

	private void saveRacer(RaceResultCrawl raceResultCrawl) {
		for (RaceStanding raceStanding : raceResultCrawl.getResults()) {
			Rider rider = Rider
					.builder()
					.name(raceStanding.getRiderName())
					.nation(raceStanding.getNationality())
					.number(raceStanding.getRiderNumber())
					.team(raceStanding.getTeam())
					.bike(raceStanding.getBike())
					.build();

			Rider saved = riderRepository.save(rider);
			log.debug("Saved Rider: {}", saved);
		}
	}
}
