package com.motogpstats.services;

import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.RaceStanding;
import com.motogpstats.models.domain.Circuit;
import com.motogpstats.models.domain.Race;
import com.motogpstats.models.domain.RaceResult;
import com.motogpstats.models.domain.Rider;
import com.motogpstats.repositories.RaceRepository;
import com.motogpstats.repositories.RaceResultRepository;
import com.motogpstats.repositories.RiderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class RaceService {

	@Autowired
	private RiderRepository riderRepository;

	@Autowired
	private RaceRepository raceRepository;

	@Autowired
	private RaceResultRepository raceResultRepository;

	public void saveRaceResults(RaceResultCrawl raceResultCrawl) {
		log.info("Saving race results: {}", raceResultCrawl);

		//		saveRace(raceResultCrawl);
		//		saveRacer(raceResultCrawl);
	}

	public Mono<Race> saveRace(RaceResultCrawl raceResultCrawl, Circuit circuit) {
		return Mono
				.justOrEmpty(
						raceRepository.findByDateAndCircuit(raceResultCrawl.getDate(),
								circuit))
				.doOnNext(race -> log.debug("Found race: {}", race))
				.switchIfEmpty(Mono
						.just(Race
								.builder()
								.date(raceResultCrawl.getDate())
								.circuit(circuit)
								.build())
						.map(race -> raceRepository.save(race))
						.doOnNext(race -> log.debug("Created Race: {}", race)));

		//		Race race = Race.builder().circuit(circuit)
		//		                //				.location(raceResultCrawl.getName())
		//		                .date(raceResultCrawl.getDate()).build();
		//
		//		log.debug("Created Race: {}", race);
		//
		//		try {
		//			return raceRepository.save(race);
		//		} catch (Exception e) {
		//			log.debug("{}", e);
		//		}
		//		return race;
	}

	public Mono<Void> saveRacer(RaceResultCrawl raceResultCrawl, Race race) {
		return Flux
				.fromIterable(raceResultCrawl.getResults())
				.flatMap(raceStanding -> saveRider(raceStanding).flatMap(
						rider -> saveRaceResult(raceStanding, rider, race)))
				.then();

		//		for (RaceStanding raceStanding : raceResultCrawl.getResults()) {
		//			Rider rider = Rider
		//					.builder()
		//					.name(raceStanding.getRiderName())
		//					.nation(raceStanding.getNationality())
		//					.number(raceStanding.getRiderNumber())
		//					.team(raceStanding.getTeam())
		//					.bike(raceStanding.getBike())
		//					.build();
		//
		//			Rider saved = riderRepository.save(rider);
		//			log.debug("Saved Rider: {}", saved);
		//
		//			RaceResult raceResult = RaceResult
		//					.builder()
		//					.position(raceStanding.getPosition() == 0 ? null
		//							: raceStanding.getPosition())
		//					.points(raceStanding.getPoints())
		//					.time(raceStanding.getTime())
		//					.rider(saved)
		//					.race(race)
		//					.build();
		//
		//			RaceResult savedRaceResult = raceResultRepository.save(raceResult);
		//			log.debug("Saved Race Result: {}", savedRaceResult);
		//		}
		//
		//		return raceResultCrawl;
	}

	public Mono<List<Circuit>> getCircuits(Integer chosenYear) {
		return getYearDateRange(chosenYear)
				.flatMapIterable(
						range -> raceRepository.findByDateBetween(range.getT1(),
								range.getT2()))
				.map(Race::getCircuit)
				.collectList();
	}

	public Mono<Set<RaceResult>> getRaceResults(Integer circuitKey,
			Integer chosenYear) {

		log.debug("Retrieve race results for circuitKey={}, year={}", circuitKey, chosenYear);

		return Mono
				.just(circuitKey)
				.zipWith(getYearDateRange(chosenYear))
				.flatMap(filter -> Mono.justOrEmpty(
						raceRepository.findByCircuitIdAndDateBetween(filter.getT1(),
								filter.getT2().getT1(), filter.getT2().getT2())))
				.map(Race::getResults)
				.doOnNext(results -> log.debug(
						"Found race results for circuitKey={}, year={}: {}", circuitKey,
						chosenYear, results));
	}

	private Mono<Tuple2<LocalDate, LocalDate>> getYearDateRange(Integer year) {
		LocalDate currentDate = LocalDate.now();

		Mono<LocalDate> beginDate = Mono
				.just(year)
				.map(yr -> currentDate
						.withYear(yr)
						.with(TemporalAdjusters.firstDayOfYear()));

		Mono<LocalDate> endDate = Mono
				.just(year)
				.map(yr -> currentDate
						.withYear(yr)
						.with(TemporalAdjusters.lastDayOfYear()));

		return Mono.zip(beginDate, endDate);
	}

	private Mono<Rider> saveRider(RaceStanding raceStanding) {
		return Mono
				.justOrEmpty(
						riderRepository.findByNameAndNumberAndTeamAndBike(raceStanding.getRiderName(),
								raceStanding.getRiderNumber(), raceStanding.getTeam(), raceStanding.getBike()))
				.switchIfEmpty(Mono
						.just(Rider
								.builder()
								.name(raceStanding.getRiderName())
								.nation(raceStanding.getNationality())
								.number(raceStanding.getRiderNumber())
								.team(raceStanding.getTeam())
								.bike(raceStanding.getBike())
								.build())
						.map(rider -> riderRepository.save(rider))
						.doOnNext(rider -> log.debug("Saved Rider: {}", rider)));
	}

	private Mono<RaceResult> saveRaceResult(RaceStanding raceStanding,
			Rider rider,
			Race race) {
		return Mono
				.justOrEmpty(raceResultRepository.findByPositionAndRiderAndRace(
						raceStanding.getPosition() == 0 ? null : raceStanding.getPosition(),
						rider, race))
				.doOnNext(raceResult -> log.debug("Found race result: {}", raceResult))
				.switchIfEmpty(Mono
						.just(RaceResult
								.builder()
								.position(raceStanding.getPosition() == 0 ? null
										: raceStanding.getPosition())
								.points(raceStanding.getPoints())
								.time(raceStanding.getTime())
								.rider(rider)
								.race(race)
								.build())
						.map(raceResult -> raceResultRepository.save(raceResult))
						.doOnNext(
								raceResult -> log.debug("Saved Race Result: {}", raceResult)));
	}
}
