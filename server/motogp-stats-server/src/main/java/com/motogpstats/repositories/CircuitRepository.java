package com.motogpstats.repositories;

import com.motogpstats.models.domain.Circuit;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CircuitRepository extends CrudRepository<Circuit, Integer> {
	Optional<Circuit> findByCodeAndNameAndTitle(String code, String name, String title);
}
