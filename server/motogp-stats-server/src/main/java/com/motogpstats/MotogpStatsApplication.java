package com.motogpstats;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = { "com.motogpstats.models.domain"})
@EnableJpaRepositories(basePackages = "com.motogpstats.repositories")
public class MotogpStatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MotogpStatsApplication.class, args);
	}
}
