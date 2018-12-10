package com.motogpstats.repositories;

import com.motogpstats.models.domain.Race;
import org.springframework.data.repository.CrudRepository;

public interface RaceRepository extends CrudRepository<Race, Integer> {
}
