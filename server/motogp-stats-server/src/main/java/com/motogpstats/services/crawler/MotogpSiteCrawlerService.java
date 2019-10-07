package com.motogpstats.services.crawler;

import com.motogpstats.models.CircuitCrawl;
import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.SeasonCrawl;
import com.motogpstats.models.domain.Circuit;
import com.motogpstats.services.CircuitService;
import com.motogpstats.services.RaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;

import java.time.Year;
import java.util.stream.IntStream;

@Slf4j
@Service
public class MotogpSiteCrawlerService {
	@Value("${motogp.motogp-category.start-season}")
	private int startSeason;

	@Autowired
	private SeasonCrawlerService seasonCrawlerService;

	@Autowired
	private RaceCrawlerService raceCrawlerService;

	@Autowired
	private CircuitService circuitService;

	@Autowired
	private RaceService raceService;

	@Autowired
	public CategoryCrawlerService categoryCrawlerService;

	@Autowired
	public SessionCrawlerService sessionCrawlerService;

	public Mono<Void> crawl(Integer startYear, Integer endYear) {
		log.info("Crawl MotoGP Season from {} to {}", startYear, endYear);

		return Mono
				.just(Tuples.of(startYear, endYear))
				.filter(tuple -> tuple.getT1() >= startSeason)
				.switchIfEmpty(Mono.error(new IllegalArgumentException(
						"startYear must be greater than or equal to " + startSeason)))
				.filter(tuple -> tuple.getT2() <= Year.now().getValue())
				.switchIfEmpty(Mono.error(new IllegalArgumentException(
						"endYear must be less than or equal to " + Year.now().getValue())))
				.filter(tuple -> tuple.getT1() <= tuple.getT2())
				.switchIfEmpty(Mono.error(new IllegalArgumentException(
						"startYear must be less than or equal to endYear")))
				.flatMap(tuple -> Flux
						.fromStream(IntStream.rangeClosed(startYear, endYear).boxed())
						.doOnNext(year -> log.debug("Requesting season year: {}", year))
						.flatMap(year -> seasonCrawlerService.crawlSeason(year))
						.flatMap(seasonCrawl -> saveCircuit(seasonCrawl)
								.flatMap(circuit -> raceCrawlerService
										.crawlRace(seasonCrawl.getYear(), circuit.getCode(),
												"Motogp")
										.flatMap(raceResultCrawl -> Mono.just(
												Tuples.of(raceResultCrawl, circuit))))
								.flatMap(this::saveRace))
						.then())
				.then();
	}

	//	private void saveSeason(Integer year) {
	//		seasonCrawlerService
	//				.crawlSeason(year)
	//				.flatMap(seasonCrawl -> saveCircuit(seasonCrawl))
	//				.flatMap(circuit -> {
	//					RaceResultCrawl raceResultCrawl =
	//							raceCrawlerService.crawlRace(year,
	//									circuit.getCode())
	//
	//					if (raceResultCrawl.getDate() == null) {
	//						log.debug("No race to save");
	//						return Mono.empty();
	//					} else {
	//						return Mono.just(Tuples.of(raceResultCrawl, circuit));
	//					}
	//				}).flatMap(this::saveRace))
	//	}

	private Flux<Circuit> saveCircuit(SeasonCrawl seasonCrawl) {
		return Flux
				.fromIterable(seasonCrawl.getRaces())
				.map(race -> Circuit
						.builder()
						.code(race.getShortname())
						.title(race.getTitle())
						.name(race.getCircuit())
						.build())
				.flatMap(circuit -> circuitService.save(circuit));
	}

	private Mono<Void> saveRace(Tuple2<RaceResultCrawl, Circuit> tuple) {
		return raceService
				.saveRace(tuple.getT1(), tuple.getT2())
				.map(race -> Tuples.of(tuple.getT1(), race))
				.flatMap(raceInfo -> raceService.saveRacer(raceInfo.getT1(),
						raceInfo.getT2()));
	}
}
