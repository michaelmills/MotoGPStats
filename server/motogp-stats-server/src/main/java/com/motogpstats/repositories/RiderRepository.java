package com.motogpstats.repositories;

import com.motogpstats.models.domain.Rider;
import org.springframework.data.repository.CrudRepository;

public interface RiderRepository extends CrudRepository<Rider, Integer> {
}
