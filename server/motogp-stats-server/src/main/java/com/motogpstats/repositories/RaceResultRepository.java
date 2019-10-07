package com.motogpstats.repositories;

import com.motogpstats.models.domain.Race;
import com.motogpstats.models.domain.RaceResult;
import com.motogpstats.models.domain.Rider;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RaceResultRepository
		extends CrudRepository<RaceResult, Integer> {

	Optional<RaceResult> findByPositionAndRiderAndRace(Integer position,
			Rider rider, Race race);
}
