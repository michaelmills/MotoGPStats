package com.motogpstats.repositories;

import com.motogpstats.models.domain.Circuit;
import com.motogpstats.models.domain.Race;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RaceRepository extends CrudRepository<Race, Integer> {
	Optional<Race> findByDateAndCircuit(LocalDate date, Circuit circuit);

	List<Race> findByDateBetween(LocalDate begin, LocalDate end);

	Optional<Race> findByCircuitIdAndDateBetween(Integer circuitId, LocalDate begin, LocalDate end);
}
