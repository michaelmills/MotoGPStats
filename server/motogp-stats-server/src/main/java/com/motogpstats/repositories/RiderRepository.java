package com.motogpstats.repositories;

import com.motogpstats.models.domain.Rider;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RiderRepository extends CrudRepository<Rider, Integer> {
	Optional<Rider> findByNameAndNumberAndTeamAndBike(String name, Integer number, String team, String bike);
}
